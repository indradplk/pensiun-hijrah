import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {
  Form,
  FormH1,
  FormInput,
  FormLabel,
  FormSelect,
  FormOption,
  FormButton,
  FormButtonCancel
} from '../FormElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../../../MessageElements';
import { dataServer } from '../../../../../DataServer';

const AddBantuanForm = ({ show, handleClose, addData, handleAddInputChange, userData }) => {
  const [formData, setFormData] = useState({
    title: '',
    path_bantuan: '',
    kategori: '',
  });

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
      formData.append('title', addData.title);
      formData.append('kategori', addData.kategori);
      formData.append('path_bantuan', addData.path_bantuan);
      formData.append('nama', userData.nama);
      formData.append('userUpdate', userData.nik);
      
      const response = await axios.post(`${dataServer.href}/api/v1/bantuan`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    setFormData({
      title: addData.title,
      path_bantuan: addData.path_bantuan,
      kategori: addData.kategori,
    });
  }, [addData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Dokumen Bantuan</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleAddInputChange} />
          <FormLabel htmlFor="path_bantuan">Dokumen</FormLabel>
          <FormInput id="path_bantuan" type="file" name="path_bantuan" onChange={handleAddInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleAddInputChange} value={formData.kategori}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="peserta">Peserta</FormOption>
            <FormOption value="iuran">Iuran</FormOption>
            <FormOption value="klaim">Klaim</FormOption>
            <FormOption value="pengalihan">Pengalihan</FormOption>
            <FormOption value="formulir">Formulir</FormOption>
            <FormOption value="brosur">Brosur</FormOption>
            <FormOption value="slide">Slide</FormOption>
            <FormOption value="pojk">Peraturan OJK</FormOption>
            <FormOption value="pdp">Peraturan Dana Pensiun</FormOption>
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

export default AddBantuanForm;
