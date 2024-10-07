import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {
  Form,
  FormH1,
  FormInput,
  FormLabel,
  FormButton,
  FormButtonCancel,
  FormSelect,
  FormOption,
  FormText
} from '../FormElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../../../MessageElements';
import { dataServer } from '../../../../../DataServer';

const AddOfficeForm = ({ show, handleClose, addData, handleAddInputChange }) => {
  const [formData, setFormData] = useState({
    nama: '',
    cabang: '',
    area: '',
    alamat: '',
    kota: '',
    provinsi: '',
    kodepos: '',
    telepon: '',
    kategori: ''
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {

      const formData = new FormData();
      formData.append('nama', addData.nama);
      formData.append('cabang', addData.cabang);
      formData.append('area', addData.area);
      formData.append('alamat', addData.alamat);
      formData.append('kota', addData.kota);
      formData.append('provinsi', addData.provinsi);
      formData.append('kodepos', addData.kodepos);
      formData.append('telepon', addData.telepon);
      formData.append('kategori', addData.kategori);

      const response = await axios.post(`${dataServer.href}:4000/api/v1/office`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setSuccess('Data berhasil ditambahkan!');
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      console.log(formData);
      setError(error.response.data.message || 'Gagal menambahkan data. Silakan coba lagi.');
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }
    setLoading(false);
  };

  useEffect(() => {
    axios.get(`${dataServer.href}:4000/api/v1/wilayah/province`)
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  const handleProvinsiChange = (event) => {
    const selectedProvinsi = provinces.find(provinsi => provinsi.name === event.target.value);
    setFormData(prevState => ({
      ...prevState,
      provinsi: selectedProvinsi.name,
    }));
  
    axios.get(`${dataServer.href}:4000/api/v1/wilayah/district?provinsi_id=${selectedProvinsi.id}`)
      .then(response => {
        setCities(response.data);
      })
      .catch(error => console.error('Error fetching cities:', error));
  };
  

  const handleKotaChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      kota: event.target.value,
    }));
  };

  useEffect(() => {
    setFormData({
      nama: addData.nama,
      cabang: addData.cabang,
      area: addData.area,
      alamat: addData.alamat,
      kota: addData.kota,
      provinsi: addData.provinsi,
      kodepos: addData.kodepos,
      telepon: addData.telepon,
      kategori: addData.kategori,
    });
  }, [addData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Kantor Cabang</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="nama">Nama</FormLabel>
          <FormInput id="nama" type="text" name="nama" value={formData.nama} onChange={handleAddInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleAddInputChange} value={formData.kategori}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="CABANG UTAMA">Cabang Utama</FormOption>
            <FormOption value="CAPEM">Cabang Pembantu</FormOption>
            <FormOption value="KANTOR KAS">Kantor Kas</FormOption>
          </FormSelect>
          <FormLabel htmlFor="cabang">Cabang</FormLabel>
          <FormInput id="cabang" type="text" name="cabang" value={formData.cabang} onChange={handleAddInputChange} />
          <FormLabel htmlFor="area">Area</FormLabel>
          <FormInput id="area" type="text" name="area" value={formData.area} onChange={handleAddInputChange} />
          <FormLabel htmlFor="alamat">Alamat</FormLabel>
          <FormText id="alamat" name="alamat" value={formData.alamat} onChange={handleAddInputChange} />
          <FormLabel htmlFor="telepon">Telepon</FormLabel>
          <FormInput id="telepon" type="text" name="telepon" value={formData.telepon} onChange={handleAddInputChange} />
          <FormLabel htmlFor="kodepos">Kode Pos</FormLabel>
          <FormInput id="kodepos" type="text" name="kodepos" value={formData.kodepos} onChange={handleAddInputChange} />
          <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
          <FormSelect id="provinsi" name="provinsi" onChange={handleProvinsiChange} value={formData.provinsi}>
            {provinces.map(province => (
              <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
            ))}
          </FormSelect>
          <FormLabel htmlFor="kota">Kabupaten/Kota</FormLabel>
          <FormSelect id="kota" name="kota" onChange={handleKotaChange} value={formData.kota}>
            {cities.map(city => (
              <FormOption key={city.id} value={`${city.type} ${city.name}`}>{`${city.type} ${city.name}`}</FormOption>
            ))}
          </FormSelect>
          {error && (
            <ErrorCard>
              <MessageH1><b>Gagal!</b></MessageH1>
              <MessageH2>{error}</MessageH2>
            </ErrorCard>
          )}
          {success && (
            <SuccessCard>
              <MessageH1><b>Berhasil!</b></MessageH1>
              <MessageH2>{success}</MessageH2>
            </SuccessCard>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <FormButtonCancel type="button" onClick={handleClose}>Tutup</FormButtonCancel>
        <FormButton type="button" onClick={handleAddSubmit} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</FormButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOfficeForm;
