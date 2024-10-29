const { Router } = require('express');
const { body, validationResult } = require('express-validator')
const router = Router();
const nodemailer = require('nodemailer');
const TanyaDPLK = require('../models/TanyaDPLK');
const User = require('../models/User');
const RegistrasiPerusahaan = require('../models/RegistrasiPerusahaan');
const ActivityAdmin = require('../models/ActivityAdmin');
const { sanitizeInput } = require('../helpers/sanitizeInput');
const { response, hashPassword } = require('../helpers/bcrypt');
const { encode } = require('html-entities');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "m014.dapurhosting.com",
    port: 465,
    auth: {
      user: 'no-reply@dplksyariahmuamalat.co.id',
      pass: 'Bismillah123!'
    }
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: '862c1d7cad62f3', // Ganti dengan email
    //   pass: 'aa4118e1122a50' // Ganti dengan kata sandi
    // }
});

router.post(
    '/tanya-dplk',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('subject').notEmpty().withMessage('Topic is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('text').notEmpty().withMessage('Description is required'),
        body('no_telp').notEmpty().withMessage('Phone number is required'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        const { name, subject, email, no_telp, text } = req.body;

        const validSubject = ['Tanya DPLK - Pertanyaan Umum', 'Tanya DPLK - Informasi Produk', 'Tanya DPLK - Kendala Teknis di Website', 'Tanya DPLK - Transaksi', 'Tanya DPLK - MDIN'];

        if (!validSubject.includes(subject)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid subject!',
            });
        }

        if (sanitizeInput(name) || sanitizeInput(subject) || sanitizeInput(email) || sanitizeInput(no_telp) || sanitizeInput(text)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedName = encode(name);
        const sanitizedSubject = encode(subject);
        const sanitizedEmail = encode(email);
        const sanitizedNoTelp = encode(no_telp);
        const sanitizedText = encode(text);

        const mailData = {
            from: 'no-reply@dplksyariahmuamalat.co.id',
            to: 'indra.rizky@bankmuamalat.co.id',
            subject: sanitizedSubject,
            html: `
                <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                <p>Dear, DPLK Syariah Muamalat</p>
                <p>Berikut adalah pesan yang masuk melalui fitur Tanya DPLK di website:</p>
                <p style="margin : 0; padding-top:0;">Nama: ${sanitizedName}</p>
                <p style="margin : 0; padding-top:0;">Email: ${sanitizedEmail}</p>
                <p style="margin : 0; padding-top:0;">Nomor Telepon/HP: ${sanitizedNoTelp}</p>
                <p style="margin : 0; padding-top:0;">Pesan: ${sanitizedText}</p>
                <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh</i></p>
            `,
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return response(res, {
                    code: 500,
                    success: false,
                    message: error.message || 'Something went wrong!',
                    content: error.toString(),
                });
            }
            
            const tanyaDPLK = new TanyaDPLK({
                name: sanitizedName, subject: sanitizedSubject, email: sanitizedEmail, no_telp: sanitizedNoTelp, text: sanitizedText
            });

            tanyaDPLK.save()
                .then(() => {
                    return response(res, {
                        code: 200,
                        success: true,
                        message: 'Message send successfully!',
                    });
                })
                .catch((error) => {
                    return response(res, {
                        code: 500,
                        success: false,
                        message: error.message || 'Something went wrong!',
                        content: error,
                    });
                });
        });
    }
);

router.post(
    '/forgot-password/peserta',
    [
        body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        const { no_peserta, email } = req.body;

        if (sanitizeInput(no_peserta) || sanitizeInput(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedNoPeserta = encode(no_peserta);
        const sanitizedEmail = encode(email);

        try {
            const peserta = await User.findOne({ where: { username: sanitizedNoPeserta, pesertaEmail: sanitizedEmail } });

            if (!peserta) {
                return response(res, {
                    code: 400,
                    success: false,
                    message: 'Your username or email is incorrect!',
                });
            }
  
            const newPassword = no_peserta;
            const hash = await hashPassword(newPassword);

            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id',
                to: sanitizedEmail,
                subject: `Reset Password Akun DPLK Syariah Muamalat a.n ${sanitizedNoPeserta}`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, Peserta</p>
                    <p>Kata sandi Anda telah disetel ulang dengan rincian sebagai berikut:</p>
                    <p>Nomor peserta: ${sanitizedNoPeserta}</p>
                    <p>Password: ${sanitizedNoPeserta}</p>
                    <p>Silakan login dengan kata sandi ini dan segera ubah kata sandi Anda.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };

            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                    return response(res, {
                        code: 500,
                        success: false,
                        message: error.message || 'Something went wrong!',
                        content: error.toString(),
                    });
                }

                await User.update(
                    { password: hash },
                    { where: { username: sanitizedNoPeserta, pesertaEmail: sanitizedEmail } }
                );

                return response(res, {
                    code: 200,
                    success: true,
                    message: 'Reset password berhasil! Periksa email Anda untuk kata sandi baru!',
                });
            });
        } catch (error) {
            return response(res, {
              code: 500,
              success: false,
              message: error.message || 'Something went wrong!',
              content: error,
            });
        }
    }
);

router.post(
    '/forgot-password/perusahaan',
    [
        body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        const { no_peserta, email } = req.body;

        if (sanitizeInput(no_peserta) || sanitizeInput(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedNoPeserta = encode(no_peserta);
        const sanitizedEmail = encode(email);

        try {
            const peserta = await User.findOne({ where: { username: sanitizedNoPeserta, perusahaanEmail: sanitizedEmail } });

            if (!peserta) {
                return response(res, {
                    code: 400,
                    success: false,
                    message: 'Your username or email is incorrect!',
                });
            }
  
            const newPassword = no_peserta;
            const hash = await hashPassword(newPassword);

            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id',
                to: sanitizedEmail,
                subject: `Reset Password Akun DPLK Syariah Muamalat a.n ${sanitizedNoPeserta}`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, Peserta</p>
                    <p>Kata sandi Anda telah disetel ulang dengan rincian sebagai berikut:</p>
                    <p>Nomor peserta: ${sanitizedNoPeserta}</p>
                    <p>Password: ${sanitizedNoPeserta}</p>
                    <p>Silakan login dengan kata sandi ini dan segera ubah kata sandi Anda.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };

            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                    return response(res, {
                        code: 500,
                        success: false,
                        message: error.message || 'Something went wrong!',
                        content: error.toString(),
                    });
                }

                await User.update(
                    { password: hash },
                    { where: { username: sanitizedNoPeserta, perusahaanEmail: sanitizedEmail } }
                );

                return response(res, {
                    code: 200,
                    success: true,
                    message: 'Reset password berhasil! Periksa email Anda untuk kata sandi baru!',
                });
            });
        } catch (error) {
            return response(res, {
              code: 500,
              success: false,
              message: error.message || 'Something went wrong!',
              content: error,
            });
        }
    }
);

router.post(
    '/registrasi-peserta/:id', authenticateToken, verifyRole('admin'),
    [
        body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const { no_peserta, email } = req.body;
        const id = req.params.id;
        const userUpdate = req.user.username; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        // Validate form
        if (!email || !no_peserta) {
            return response(res, {
                code: 400,
                success: false,
                message: 'All fields must be filled in!',
            });
        }

        if (sanitizeInput(no_peserta) || sanitizeInput(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedNoPeserta = encode(no_peserta);
        const sanitizedEmail = encode(email);

        try {
            const getRegistrasi = await RegistrasiPeserta.findOne({ where: { id: id } });

            if (!getRegistrasi) {
                return response(res, {
                    code: 400,
                    success: false,
                    message: 'Registration data not found!',
                });
            }
  
            // Update participants's number and status to true
            await RegistrasiPeserta.update({ status: true, no_peserta: sanitizedNoPeserta, userUpdate }, { where: { id: id } });

            await ActivityAdmin.create({
                nik: userUpdate,
                log: `${userUpdate} melakukan otorisasi untuk peserta baru ${sanitizedNoPeserta}`
            });

            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id',
                to: sanitizedEmail,
                subject: `Registrasi Peserta Baru DPLK Syariah Muamalat`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, ${getRegistrasi.nama}</p>
                    <p>Terima kasih, saat ini Anda telah terdaftar di DPLK Syariah Muamalat dengan nomor peserta ${no_peserta}.</p>
                    <p>Pembayaran atau Top Up iuran dapat dilakukan melalui Mobile Banking (Muamalat DIN) pada menu <i><b>Pensiun Hijrah DPLK</b></i> atau transfer antar Bank ke Bank Muamalat dengan nomor virtual account 12091${no_peserta}</p>
                    <p>Referensikan dan hijrahkan keluarga/relasi anda untuk berinvestasi di DPLK Syariah Muamalat, satu-satunya DPLK syariah di Indonesia.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };

            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                    return response(res, {
                        code: 500,
                        success: false,
                        message: error.message || 'Something went wrong!',
                        content: error.toString(),
                    });
                }

                return response(res, {
                    code: 200,
                    success: true,
                    message: 'Registrasi Peserta berhasil disetujui!',
                });
            });
        } catch (error) {
            return response(res, {
              code: 500,
              success: false,
              message: error.message || 'Something went wrong!',
              content: error,
            });
        }
    }
);

router.post(
    '/registrasi-perusahaan',
    [
        body('nama').notEmpty().withMessage('Name is required'),
        body('pic').notEmpty().withMessage('Coordinator is required'),
        body('jabatan').notEmpty().withMessage('Occupation is required'),
        body('no_telepon').notEmpty().withMessage('Phone number is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        const { nama, pic, jabatan, no_telepon, email } = req.body;

        // Validate form
        if (!email || !nama || !pic || !jabatan || !no_telepon) {
            return response(res, {
                code: 400,
                success: false,
                message: 'All fields must be filled in!',
            });
        }

        if (sanitizeInput(nama) || sanitizeInput(email) || sanitizeInput(pic) || sanitizeInput(jabatan) || sanitizeInput(no_telepon)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const newRegistrasiPerusahaan = new RegistrasiPerusahaan({
            nama, pic, jabatan, email, no_telepon
        });

        try {
            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id',
                to: 'indra.rizky@bankmuamalat.co.id',
                subject: 'Pendaftaran Peserta Korporat DPLK Syariah Muamalat',
                html: `
                  <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                  <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                  <p>Dear, DPLK Syariah Muamalat</p>
                  <p>Berikut adalah pesan yang masuk melalui fitur Pendaftaran Perusahaan di website:</p>
                  <p style="margin : 0; padding-top:0;">Nama Perusahaan: ${nama}</p>
                  <p style="margin : 0; padding-top:0;">Koordinator Perusahaan: ${pic}</p>
                  <p style="margin : 0; padding-top:0;">Jabatan di Perusahaan: ${jabatan}</p>
                  <p style="margin : 0; padding-top:0;">Email: ${email}</p>
                  <p style="margin : 0; padding-top:0;">No Telepon: ${no_telepon}</p>
                  <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                  <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh</i></p>
                `,
            };

            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                  // Return early if email fails
                  return response(res, {
                    code: 500,
                    success: false,
                    message: error.message || 'Something went wrong!',
                    content: error.toString(),
                  });
                }
        
                try {
                  // Save registration data to the database
                  await newRegistrasiPerusahaan.save();
        
                  // Send success response
                  return response(res, {
                    code: 200,
                    success: true,
                    message: 'Pesan berhasil terkirim! Mohon tunggu jawaban dari kami melalui email/nomor telepon Anda.',
                  });
                } catch (error) {
                  // Handle save error
                  return response(res, {
                    code: 500,
                    success: false,
                    message: error.message || 'Something went wrong!',
                    content: error,
                  });
                }
            });
        } catch (error) {
            return response(res, {
              code: 500,
              success: false,
              message: error.message || 'Something went wrong!',
              content: error,
            });
        }
    }
);

router.post(
    '/reject/registrasi-peserta/:id', authenticateToken, verifyRole('admin'),
    [
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('text').notEmpty().withMessage('Description is required'),
    ],
    async (req, res) => {
        const { email, text } = req.body;
        const id = req.params.id;
        const userUpdate = req.user.username; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, {
                code: 400,
                success: false,
                message: errors.array(),
            });
        }

        // Validate form
        if (!email || !text) {
            return response(res, {
                code: 400,
                success: false,
                message: 'All fields must be filled in!',
            });
        }

        if (sanitizeInput(text) || sanitizeInput(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedText = encode(text);
        const sanitizedEmail = encode(email);

        try {
            const getRegistrasi = await RegistrasiPeserta.findOne({ where: { id: id } });

            if (!getRegistrasi) {
                return response(res, {
                    code: 400,
                    success: false,
                    message: 'Registration data not found!',
                });
            }
  
            // Update status to false
            await RegistrasiPeserta.update({ status: false, userUpdate }, { where: { id: id } });

            await ActivityAdmin.create({
                nik: userUpdate,
                log: `${userUpdate} menolak registrasi peserta baru dari ${sanitizedEmail}`
            });

            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id',
                to: sanitizedEmail,
                subject: `Permohonan Kelengkapan Registrasi Peserta Baru DPLK Syariah Muamalat`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, ${getRegistrasi.nama}</p>
                    <p>Pendaftaran kepesertaan Anda di DPLK Syariah Muamalat kami tolak. Mohon lengkapi kelengkapan registrasi peserta dengan catatan sebagai berikut:</p>
                    <p>${sanitizedText}</p>
                    <p>Kelengkapan registrasi dapat dikirimkan melalui email ke dplk@bankmuamalat.co.id atau dengan mengisi ulang formulir registrasi pada website.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };

            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                    return response(res, {
                        code: 500,
                        success: false,
                        message: error.message || 'Something went wrong!',
                        content: error.toString(),
                    });
                }

                return response(res, {
                    code: 200,
                    success: true,
                    message: 'Registrasi Peserta berhasil disetujui!',
                });
            });
        } catch (error) {
            return response(res, {
              code: 500,
              success: false,
              message: error.message || 'Something went wrong!',
              content: error,
            });
        }
    }
);

module.exports = router;