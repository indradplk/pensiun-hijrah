const express = require('express');
const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const route = Router();

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

route.get('/v1/master/investasi', (req, res) => {
    res.json(investasiData);
});

route.get('/v1/master/investasi/:id', (req, res) => {
    const id = req.params.id;
    const investasi = investasiData.find(item => item.id == id);
    if (investasi) {
        res.json(investasi);
    } else {
        res.status(404).send('Paket investasi tidak ditemukan');
    }
});

route.get('/v1/master/agama', (req, res) => {
    res.json(agamaData);
});

route.get('/v1/master/agama/:id', (req, res) => {
    const id = req.params.id;
    const agama = agamaData.find(item => item.id == id);
    if (agama) {
        res.json(agama);
    } else {
        res.status(404).send('Agama tidak ditemukan');
    }
});

route.get('/v1/master/pendidikan', (req, res) => {
    res.json(pendidikanData);
});

route.get('/v1/master/pendidikan/:id', (req, res) => {
    const id = req.params.id;
    const pendidikan = pendidikanData.find(item => item.id == id);
    if (pendidikan) {
        res.json(pendidikan);
    } else {
        res.status(404).send('Pendidikan tidak ditemukan');
    }
});

route.get('/v1/master/pekerjaan', (req, res) => {
    res.json(pekerjaanData);
});

route.get('/v1/master/pekerjaan/:id', (req, res) => {
    const id = req.params.id;
    const pekerjaan = pekerjaanData.find(item => item.id == id);
    if (pekerjaan) {
        res.json(pekerjaan);
    } else {
        res.status(404).send('Pekerjaan tidak ditemukan');
    }
});

route.get('/v1/master/kepemilikan', (req, res) => {
    res.json(pemilikanData);
});

route.get('/v1/master/kepemilikan/:id', (req, res) => {
    const id = req.params.id;
    const pemilikan = pemilikanData.find(item => item.id == id);
    if (pemilikan) {
        res.json(pemilikan);
    } else {
        res.status(404).send('Kepemilikan tidak ditemukan');
    }
});

route.get('/v1/master/usaha', (req, res) => {
    res.json(usahaData);
});

route.get('/v1/master/usaha/:id', (req, res) => {
    const id = req.params.id;
    const usaha = usahaData.find(item => item.id == id);
    if (usaha) {
        res.json(usaha);
    } else {
        res.status(404).send('Jenis Usaha tidak ditemukan');
    }
});

route.get('/v1/master/penghasilan', (req, res) => {
    res.json(penghasilanData);
});

route.get('/v1/master/penghasilan/:id', (req, res) => {
    const id = req.params.id;
    const penghasilan = penghasilanData.find(item => item.id == id);
    if (penghasilan) {
        res.json(penghasilan);
    } else {
        res.status(404).send('Penghasilan tidak ditemukan');
    }
});

route.get('/v1/master/sampingan', (req, res) => {
    res.json(sampinganData);
});

route.get('/v1/master/sampingan/:id', (req, res) => {
    const id = req.params.id;
    const sampingan = sampinganData.find(item => item.id == id);
    if (sampingan) {
        res.json(sampingan);
    } else {
        res.status(404).send('Penghasilan Tambahan tidak ditemukan');
    }
});

route.get('/v1/master/dana', (req, res) => {
    res.json(danaData);
});

route.get('/v1/master/dana/:id', (req, res) => {
    const id = req.params.id;
    const dana = danaData.find(item => item.id == id);
    if (dana) {
        res.json(dana);
    } else {
        res.status(404).send('Sumber Dana tidak ditemukan');
    }
});

module.exports = route;