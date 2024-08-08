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

const EditOfficeForm = ({ show, handleClose, editData, handleEditInputChange }) => {
  const [formData, setFormData] = useState({
    nama: '',
    cabang: '',
    area: '',
    alamat: '',
    kota: '',
    provinsi: '',
    kodepos: '',
    telepon: '',
    kategori: '',
    status: ''
  });
  
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const formData = new FormData();
      formData.append('nama', editData.nama);
      formData.append('cabang', editData.cabang);
      formData.append('area', editData.area);
      formData.append('alamat', editData.alamat);
      formData.append('kota', editData.kota);
      formData.append('provinsi', editData.provinsi);
      formData.append('kodepos', editData.kodepos);
      formData.append('telepon', editData.telepon);
      formData.append('kategori', editData.kategori);
      formData.append('status', editData.status === 'false' ? false : true);

      const response = await axios.put(`${dataServer.href}/api/v1/office/${editData.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setSuccess('Data berhasil diubah!');
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      console.log(formData);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }
    setLoading(false);
  };

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/wilayah/province`)
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
  
    axios.get(`${dataServer.href}/api/v1/wilayah/district?provinsi_id=${selectedProvinsi.id}`)
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
      nama: editData.nama,
      cabang: editData.cabang,
      area: editData.area,
      alamat: editData.alamat,
      kota: editData.kota,
      provinsi: editData.provinsi,
      kodepos: editData.kodepos,
      telepon: editData.telepon,
      kategori: editData.kategori,
      status: editData.status ? 'true' : 'false',
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Kantor Cabang</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <FormLabel htmlFor="nama">Nama</FormLabel>
          <FormInput id="nama" type="text" name="nama" value={formData.nama} onChange={handleEditInputChange} />
          <FormLabel htmlFor="cabang">Cabang</FormLabel>
          <FormInput id="cabang" type="text" name="cabang" value={formData.cabang} onChange={handleEditInputChange} />
          <FormLabel htmlFor="area">Area</FormLabel>
          <FormInput id="area" type="text" name="area" value={formData.area} onChange={handleEditInputChange} />
          <FormLabel htmlFor="alamat">Alamat</FormLabel>
          <FormText id="alamat" name="alamat" value={formData.alamat} onChange={handleEditInputChange} />
          <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
          <FormSelect id="provinsi" name="provinsi" onChange={handleProvinsiChange} value={formData.provinsi}>
            <FormOption value="">Pilih Provinsi</FormOption>
            {provinces.map(province => (
              <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
            ))}
          </FormSelect>
          <FormLabel htmlFor="kota">Kota</FormLabel>
          <FormSelect id="kota" name="kota" onChange={handleKotaChange} value={formData.kota}>
            <FormOption value="">Pilih Kabupaten/Kota</FormOption>
            {cities.map(city => (
              <FormOption key={city.id} value={`${city.type} ${city.name}`}>{`${city.type} ${city.name}`}</FormOption>
            ))}
          </FormSelect>
          <FormLabel htmlFor="kodepos">Kode Pos</FormLabel>
          <FormInput id="kodepos" type="text" name="kodepos" value={formData.kodepos} onChange={handleEditInputChange} />
          <FormLabel htmlFor="telepon">Telepon</FormLabel>
          <FormInput id="telepon" type="text" name="telepon" value={formData.telepon} onChange={handleEditInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleEditInputChange} value={formData.kategori}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="CABANG UTAMA">Cabang Utama</FormOption>
            <FormOption value="CAPEM">Cabang Pembantu</FormOption>
            <FormOption value="KANTOR KAS">Kantor Kas</FormOption>
          </FormSelect>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect id="status" name="status" onChange={handleEditInputChange}>
            <FormOption value="">Pilih Status</FormOption>
            <FormOption value="true">Aktif</FormOption>
            <FormOption value="false">Nonaktif</FormOption>
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
        <FormButton type="button" onClick={handleEditSubmit} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</FormButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOfficeForm;
