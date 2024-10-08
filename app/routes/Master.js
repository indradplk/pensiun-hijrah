const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { response } = require('../helpers/bcrypt');

// Membaca file JSON
const investasiData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'investasi.json')));
const agamaData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'agama.json')));
const pendidikanData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'pendidikan.json')));
const pekerjaanData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'pekerjaan.json')));
const pemilikanData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'kepemilikan.json')));
const usahaData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'usaha.json')));
const penghasilanData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'penghasilan.json')));
const sampinganData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'sampingan.json')));
const danaData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'master', 'dana.json')));

const router = Router();

router.get('/investasi', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved investment package data!',
        content: investasiData,
    });
});

router.get('/investasi/:id', (req, res) => {
    const id = req.params.id;
    const investasi = investasiData.find(item => item.id == id);
    if (investasi) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved investment package data!',
            content: investasi,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Paket investasi tidak ditemukan!",
        });
    }
});

router.get('/agama', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved religion data!',
        content: agamaData,
    });
});

router.get('/agama/:id', (req, res) => {
    const id = req.params.id;
    const agama = agamaData.find(item => item.id == id);
    if (agama) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved religion data!',
            content: agama,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Agama tidak ditemukan!",
        });
    }
});

router.get('/pendidikan', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved education data!',
        content: pendidikanData,
    });
});

router.get('/pendidikan/:id', (req, res) => {
    const id = req.params.id;
    const pendidikan = pendidikanData.find(item => item.id == id);
    if (pendidikan) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved education data!',
            content: pendidikan,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Pendidikan tidak ditemukan!",
        });
    }
});

router.get('/pekerjaan', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved job data!',
        content: pekerjaanData,
    });
});

router.get('/pekerjaan/:id', (req, res) => {
    const id = req.params.id;
    const pekerjaan = pekerjaanData.find(item => item.id == id);
    if (pekerjaan) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved job data!',
            content: pekerjaan,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Pekerjaan tidak ditemukan!",
        });
    }
});

router.get('/kepemilikan', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved ownership data!',
        content: pemilikanData,
    });
});

router.get('/kepemilikan/:id', (req, res) => {
    const id = req.params.id;
    const pemilikan = pemilikanData.find(item => item.id == id);
    if (pemilikan) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved ownership data!',
            content: pemilikan,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Kepemilikan tidak ditemukan!",
        });
    }
});

router.get('/usaha', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved business data!',
        content: usahaData,
    });
});

router.get('/usaha/:id', (req, res) => {
    const id = req.params.id;
    const usaha = usahaData.find(item => item.id == id);
    if (usaha) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved business data!',
            content: usaha,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Jenis usaha tidak ditemukan!",
        });
    }
});

router.get('/penghasilan', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved income data!',
        content: penghasilanData,
    });
});

router.get('/penghasilan/:id', (req, res) => {
    const id = req.params.id;
    const penghasilan = penghasilanData.find(item => item.id == id);
    if (penghasilan) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved income data!',
            content: penghasilan,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Penghasilan tidak ditemukan!",
        });
    }
});

router.get('/sampingan', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved additional income data!',
        content: sampinganData,
    });
});

router.get('/sampingan/:id', (req, res) => {
    const id = req.params.id;
    const sampingan = sampinganData.find(item => item.id == id);
    if (sampingan) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved additional income data!',
            content: sampingan,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Penghasilan tambahan tidak ditemukan!",
        });
    }
});

router.get('/dana', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved funds data!',
        content: danaData,
    });
});

router.get('/dana/:id', (req, res) => {
    const id = req.params.id;
    const dana = danaData.find(item => item.id == id);
    if (dana) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved fund data!',
            content: dana,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Sumber dana tambahan tidak ditemukan!",
        });
    }
});

module.exports = router;