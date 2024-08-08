const express = require('express');
const fs = require('fs');
const { Router } = require('express');
const route = Router();

// Membaca file JSON untuk provinsi, kabupaten, kecamatan, dan kelurahan
const provincesData = JSON.parse(fs.readFileSync('./json/wilayah/provinsi.json'));
const districtsData = JSON.parse(fs.readFileSync('./json/wilayah/kabupaten.json'));
const subdistrictsData = JSON.parse(fs.readFileSync('./json/wilayah/kecamatan.json'));
const villagesData = JSON.parse(fs.readFileSync('./json/wilayah/kelurahan.json'));

route.get('/v1/wilayah/province', (req, res) => {
    res.json(provincesData);
});

route.get('/v1/wilayah/province/:id', (req, res) => {
    const id = req.params.id;
    const province = provincesData.find(item => item.id == id);
    if (province) {
        res.json(province);
    } else {
        res.status(404).send('Provinsi tidak ditemukan');
    }
});

route.get('/v1/wilayah/district', (req, res) => {
    const { provinsi_id } = req.query;
    
    const filteredDistricts = provinsi_id
        ? districtsData.filter(item => item.provinsi_id == provinsi_id)
        : districtsData;

    res.json(filteredDistricts);
});

route.get('/v1/wilayah/district/:id', (req, res) => {
    const id = req.params.id;
    const district = districtsData.find(item => item.id == id);
    if (district) {
        res.json(district);
    } else {
        res.status(404).send('Kabupaten/Kota tidak ditemukan');
    }
});

route.get('/v1/wilayah/subdistrict', (req, res) => {
    const { kabupaten_id } = req.query;
    
    const filteredSubdistricts = kabupaten_id
        ? subdistrictsData.filter(item => item.kabupaten_id == kabupaten_id)
        : subdistrictsData;

    res.json(filteredSubdistricts);
});

route.get('/v1/wilayah/subdistrict/:id', (req, res) => {
    const id = req.params.id;
    const subdistrict = subdistrictsData.find(item => item.id == id);
    if (subdistrict) {
        res.json(subdistrict);
    } else {
        res.status(404).send('Kecamatan tidak ditemukan');
    }
});

route.get('/v1/wilayah/village', (req, res) => {
    const { kecamatan_id } = req.query;
    
    const filteredVillages = kecamatan_id
        ? villagesData.filter(item => item.kecamatan_id == kecamatan_id)
        : villagesData;

    res.json(filteredVillages);
});

route.get('/v1/wilayah/village/:id', (req, res) => {
    const id = req.params.id;
    const village = villagesData.find(item => item.id == id);
    if (village) {
        res.json(village);
    } else {
        res.status(404).send('Kelurahan/Desa tidak ditemukan');
    }
});

module.exports = route;