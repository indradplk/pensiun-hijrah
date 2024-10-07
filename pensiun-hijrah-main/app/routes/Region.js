const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { response } = require('../helpers/bcrypt');

// Membaca file JSON untuk provinsi, kabupaten, kecamatan, dan kelurahan
const provincesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'wilayah', 'provinsi.json')));
const districtsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'wilayah', 'kabupaten.json')));
const subdistrictsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'wilayah', 'kecamatan.json')));
const villagesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'json', 'wilayah', 'kelurahan.json')));

const router = Router();

router.get('/province', (req, res) => {
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved province data!',
        content: provincesData,
    });
});

router.get('/province/:id', (req, res) => {
    const id = req.params.id;
    const province = provincesData.find(item => item.id == id);
    if (province) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved province data!',
            content: province,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Provinsi tidak ditemukan!",
        });
    }
});

router.get('/district', (req, res) => {
    const { provinsi_id } = req.query;
    
    const filteredDistricts = provinsi_id
        ? districtsData.filter(item => item.provinsi_id == provinsi_id)
        : districtsData;
    
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved district data!',
        content: filteredDistricts,
    });
});

router.get('/district/:id', (req, res) => {
    const id = req.params.id;
    const district = districtsData.find(item => item.id == id);
    if (district) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved province data!',
            content: district,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Kabupaten/Kota tidak ditemukan!",
        });
    }
});

router.get('/subdistrict', (req, res) => {
    const { kabupaten_id } = req.query;
    
    const filteredSubdistricts = kabupaten_id
        ? subdistrictsData.filter(item => item.kabupaten_id == kabupaten_id)
        : subdistrictsData;

    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved subdistrict data!',
        content: filteredSubdistricts,
    });
});

router.get('/subdistrict/:id', (req, res) => {
    const id = req.params.id;
    const subdistrict = subdistrictsData.find(item => item.id == id);
    if (subdistrict) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved subdistrict data!',
            content: subdistrict,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Kecamatan tidak ditemukan!",
        });
    }
});

router.get('/village', (req, res) => {
    const { kecamatan_id } = req.query;
    
    const filteredVillages = kecamatan_id
        ? villagesData.filter(item => item.kecamatan_id == kecamatan_id)
        : villagesData;
    
    return response(res, {
        code: 200,
        success: true,
        message: 'Successfully retrieved villages data!',
        content: filteredVillages,
    });
});

router.get('/village/:id', (req, res) => {
    const id = req.params.id;
    const village = villagesData.find(item => item.id == id);
    if (village) {
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved village data!',
            content: village,
        });
    } else {
        return response(res, {
            code: 404,
            success: false,
            message: "Kelurahan/Desa tidak ditemukan!",
        });
    }
});

module.exports = router;
