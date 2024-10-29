const { connectToDatabaseHRIS } = require('../../config/db_hris');
const { response } = require('../../helpers/bcrypt');
const { NotFoundError } = require('../../errors');
const { sanitizeInput } = require('../../helpers/sanitizeInput');
const moment = require('moment');

exports.show = async (req, res) => {
    try {
        const { nik } = req.params;
        const today = moment().startOf('day').format('YYYY-MM-DD'); // Mengambil tanggal hari ini dalam format YYYY-MM-DD

        const absenSql = `
            SELECT
                id,  
                nik,
                nama,
                tanggal_absen,
                jam_masuk,
                jam_keluar,
                stabsen
            FROM absen
            WHERE nik = ?
            AND tanggal_absen = ?
        `;

        const pool = await connectToDatabaseHRIS();
        const [absenQry] = await pool.execute(absenSql, [nik, today]);
        const absenData = absenQry[0];

        if (!absenData) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Data absensi tidak ditemukan untuk hari ini.',
            });
        }

        let hasClockedIn = !!absenData.jam_masuk;
        let hasClockedOut = !!absenData.jam_keluar;

        // Set hasClockedIn and hasClockedOut to false if cuti setengah hari
        if (absenData.stabsen === 'S' && !hasClockedIn) {
            hasClockedIn = false;
            hasClockedOut = false;
        }

        return response(res, {
            code: 200,
            success: true,
            content: { absenData, hasClockedIn, hasClockedOut },
            message: 'Data absen berhasil diperbarui.',
        });
    } catch (error) {
        console.error(error); // Tambahkan log error untuk debugging
        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
        });
    }
};

exports.clockInWithLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const { username, nama, lokasi } = req.user;

        // Validasi input
        if (!latitude || !longitude) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Data lokasi tidak tersedia.',
            });
        }

        // Mendapatkan tanggal dan jam saat ini
        const now = new Date();
        const tanggal_absen = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const jam_masuk = now.toTimeString().split(' ')[0]; // HH:MM:SS

        // Cek apakah ada cuti setengah hari untuk hari ini
        const leaveSql = `
            SELECT
                id,  
                nik,
                tanggal_cuti1,
                cuti_ijin,
                sesi_cuti
            FROM employees_applies_cutis
            WHERE nik = ?
            AND cuti_ijin = 'S'
            AND approved = 'T'
            AND tanggal_cuti1 = ?
        `;

        const pool = await connectToDatabaseHRIS();
        const [leaveQry] = await pool.execute(leaveSql, [username, tanggal_absen]);
        const leaveData = leaveQry[0];

        let batasJamMasuk = '08:00:59'; // Default batas jam masuk

        if (leaveQry.length !== 0) {
            // Cek sesi cuti (pagi atau siang)
            if (leaveData.sesi_cuti === 'P') {
                batasJamMasuk = '08:00:59';
            } else if (leaveData.sesi_cuti === 'S') {
                batasJamMasuk = '13:00:59';
            }
        }

        // Menentukan keterangan berdasarkan jam masuk
        const stabsen = jam_masuk > batasJamMasuk ? 'T' : 'H';
        const keterangan = jam_masuk > batasJamMasuk ? 'Terlambat' : 'Hadir';

        // Ambil informasi region dari database
        const regionSql = `
            SELECT
                id,  
                nama,
                latitude_min,
                latitude_max,
                longitude_min,
                longitude_max
            FROM lokasi_kantor
            WHERE nama = ?
        `;

        const [regionQry] = await pool.execute(regionSql, [lokasi]);
        const regionData = regionQry[0];

        // Validasi lokasi (latitude, longitude)
        if (regionQry.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Lokasi tidak ditemukan.',
            });
        }

        let posisi = lokasi; // Set posisi default ke nama lokasi
        if (
            latitude >= regionData.latitude_min && latitude <= regionData.latitude_max &&
            longitude >= regionData.longitude_min && longitude <= regionData.longitude_max
        ) {
            posisi = `${latitude}, ${longitude}`; // Jika lokasi valid, simpan lat/long
        } else {
            return response(res, {
                code: 400,
                success: false,
                message: 'Lokasi Anda berada di luar area yang diizinkan.',
            });
        }

        // Cek apakah sudah absen pada hari ini
        const absenSql = `
            SELECT
                id,  
                nik,
                nama,
                tanggal_absen,
                jam_masuk,
                jam_keluar
            FROM absen
            WHERE nik = ?
            AND tanggal_absen = ?
        `;

        const [absenQry] = await pool.execute(absenSql, [username, tanggal_absen]);

        if (absenQry.length !== 0) {
            // Update absen jika sudah ada record
            const updateAbsenSql = `
                UPDATE absen SET jam_masuk = ?, lastuser = ?, posisi = ?, stabsen = ?, keterangan = ?, lastupdate = NOW()
                WHERE nik = ?
                AND tanggal_absen = ?
            `;
            await pool.execute(updateAbsenSql, [jam_masuk, username, posisi, stabsen, keterangan, username, tanggal_absen]);
        } else {
            // Insert absen baru jika belum ada
            const createAbsenSql = `
                INSERT INTO absen (
                    nik, nama, tanggal_absen, jam_kerja, jam_masuk, stabsen, posisi, keterangan, approved, lastupdate, lastuser
                ) VALUES (?, ?, ?, '1', ?, ?, ?, ?, 'T', NOW(), ?)
            `;
            await pool.execute(createAbsenSql, [username, nama, tanggal_absen, jam_masuk, stabsen, posisi, keterangan, username]);
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Data absen berhasil diperbarui.',
            content: {
                jam_masuk, stabsen
            },
        });
    } catch (error) {
        console.error(error); // Tambahkan log error untuk debugging
        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
        });
    }
};

exports.clockOutWithLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const { username, lokasi } = req.user;

        // Validasi input
        if (!latitude || !longitude) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Data lokasi tidak tersedia.',
            });
        }

        // Mendapatkan tanggal dan jam saat ini
        const now = new Date();
        const tanggal_absen = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const jam_keluar = now.toTimeString().split(' ')[0]; // HH:MM:SS

        // Ambil informasi region dari database
        const regionSql = `
            SELECT
                id,  
                nama,
                latitude_min,
                latitude_max,
                longitude_min,
                longitude_max
            FROM lokasi_kantor
            WHERE nama = ?
        `;

        const pool = await connectToDatabaseHRIS();
        const [regionQry] = await pool.execute(regionSql, [lokasi]);
        const regionData = regionQry[0];

        // Validasi lokasi (latitude, longitude)
        if (!regionData) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Lokasi tidak ditemukan.',
            });
        }

        if (
            !(latitude >= regionData.latitude_min && latitude <= regionData.latitude_max &&
            longitude >= regionData.longitude_min && longitude <= regionData.longitude_max)
        ) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Lokasi Anda berada di luar area yang diizinkan.',
            });
        }

        // Cek apakah sudah absen pada hari ini
        const absenSql = `
            SELECT
                id,  
                nik,
                nama,
                tanggal_absen,
                jam_masuk,
                jam_keluar
            FROM absen
            WHERE nik = ?
            AND tanggal_absen = ?
            AND (jam_keluar IS NULL OR jam_keluar = '')
        `;

        const [absenQry] = await pool.execute(absenSql, [username, tanggal_absen]);
        const absenData = absenQry[0];

        if (!absenData) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Anda belum clock-in untuk hari ini.',
            });
        }

        // Convert tanggal_absen to a date string in 'YYYY-MM-DD' format using moment
        const formattedTanggalAbsen = moment(absenData.tanggal_absen).format('YYYY-MM-DD');


        // Hitung jam_kerja berdasarkan jam_keluar - jam_masuk
        const jamMasuk = moment(`${formattedTanggalAbsen} ${absenData.jam_masuk}`, 'YYYY-MM-DD HH:mm:ss');
        const jamKeluar = moment(); // Current time as jam_keluar
        const duration = moment.duration(jamKeluar.diff(jamMasuk));

        // Format jam kerja ke dalam HH:mm:ss
        const jamKerja = `${String(Math.floor(duration.asHours())).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`;

        const updateAbsenSql = `
            UPDATE absen SET jam_keluar = ?, total_jam_kerja = ?, lastuser = ?, lastupdate = NOW()
            WHERE nik = ?
            AND tanggal_absen = ?
        `;
        await pool.execute(updateAbsenSql, [jam_keluar, jamKerja, username, username, tanggal_absen]);
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Data absen berhasil diperbarui.',
            content: { jam_keluar, jamKerja }
        });
    } catch (error) {
        console.error(error); // Tambahkan log error untuk debugging
        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
        });
    }
};

exports.clockInVisit = async (req, res) => {
    try {
        const { latitude, longitude, keterangan } = req.body;
        const { username, nama, lokasi } = req.user;

        // Validasi input
        if (!latitude || !longitude) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Data lokasi tidak tersedia.',
            });
        }

        if (!keterangan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Keterangan visit wajib diisi.',
            });
        }

        // Mendapatkan tanggal dan jam saat ini
        const now = new Date();
        const tanggal_absen = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const jam_masuk = now.toTimeString().split(' ')[0]; // HH:MM:SS

        // Cek apakah ada cuti setengah hari untuk hari ini
        const leaveSql = `
            SELECT
                id,  
                nik,
                tanggal_cuti1,
                cuti_ijin,
                sesi_cuti
            FROM employees_applies_cutis
            WHERE nik = ?
            AND cuti_ijin = 'S'
            AND approved = 'T'
            AND tanggal_cuti1 = ?
        `;

        const pool = await connectToDatabaseHRIS();
        const [leaveQry] = await pool.execute(leaveSql, [username, tanggal_absen]);
        const leaveData = leaveQry[0];

        let batasJamMasuk = '08:00:59'; // Default batas jam masuk

        if (leaveQry.length !== 0) {
            // Cek sesi cuti (pagi atau siang)
            if (leaveData.sesi_cuti === 'P') {
                batasJamMasuk = '08:00:59';
            } else if (leaveData.sesi_cuti === 'S') {
                batasJamMasuk = '13:00:59';
            }
        }

        // Menentukan keterangan berdasarkan jam masuk
        const stabsen = jam_masuk > batasJamMasuk ? 'T' : 'H';
        let posisi = `${latitude}, ${longitude}`;

        // Cek apakah sudah absen pada hari ini
        const absenSql = `
            SELECT
                id,  
                nik,
                nama,
                tanggal_absen,
                jam_masuk,
                jam_keluar
            FROM absen
            WHERE nik = ?
            AND tanggal_absen = ?
        `;

        const [absenQry] = await pool.execute(absenSql, [username, tanggal_absen]);

        if (absenQry.length !== 0) {
            // Update absen jika sudah ada record
            const updateAbsenSql = `
                UPDATE absen SET jam_masuk = ?, lastuser = ?, posisi = ?, stabsen = ?, keterangan = ?, lastupdate = NOW(), approved = 'F'
                WHERE nik = ?
                AND tanggal_absen = ?
            `;
            await pool.execute(updateAbsenSql, [jam_masuk, username, posisi, stabsen, keterangan, username, tanggal_absen]);
        } else {
            // Insert absen baru jika belum ada
            const createAbsenSql = `
                INSERT INTO absen (
                    nik, nama, tanggal_absen, jam_kerja, jam_masuk, stabsen, posisi, keterangan, approved, lastupdate, lastuser
                ) VALUES (?, ?, ?, '1', ?, ?, ?, ?, 'F', NOW(), ?)
            `;
            await pool.execute(createAbsenSql, [username, nama, tanggal_absen, jam_masuk, stabsen, posisi, keterangan, username]);
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Data absen berhasil diperbarui.',
            content: {
                jam_masuk, stabsen
            },
        });
    } catch (error) {
        console.error(error); // Tambahkan log error untuk debugging
        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
        });
    }
};