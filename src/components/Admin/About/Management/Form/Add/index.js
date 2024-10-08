import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
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

const AddManagementForm = ({ show, handleClose, addData, handleAddInputChange }) => {
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    path_management: '',
    description: '',
    kategori: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleAddSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('jabatan', formData.jabatan);
    data.append('description', formData.description);
    data.append('kategori', formData.kategori);
    data.append('path_management', formData.path_management);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/management', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const { message } = response.data;
      setSuccess(message);

      setTimeout(() => {
        setSuccess('');
        handleClose();
        window.location.reload();
      }, 3000);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }

      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      nama: addData.nama,
      jabatan: addData.jabatan,
      path_management: addData.path_management,
      description: addData.description,
      kategori: addData.kategori,
    });
  }, [addData]);

  const handleDescriptionChange = (value) => {
    handleAddInputChange({
      target: {
        name: 'description',
        value: value
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Manajemen</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="nama">Nama</FormLabel>
          <FormInput id="nama" type="text" name="nama" value={formData.nama} onChange={handleAddInputChange} />
          <FormLabel htmlFor="jabatan">Jabatan</FormLabel>
          <FormInput id="jabatan" type="text" name="jabatan" value={formData.jabatan} onChange={handleAddInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleAddInputChange} value={formData.kategori}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="pengurus">Pengurus</FormOption>
            <FormOption value="pengawas">Dewan Pengawas</FormOption>
            <FormOption value="dps">Dewan Pengawas Syariah</FormOption>
          </FormSelect>
          <FormLabel htmlFor="path_management">Gambar</FormLabel>
          <FormInput id="path_management" type="file" name="path_management" onChange={handleAddInputChange} />
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <ReactQuill value={formData.description} onChange={handleDescriptionChange} />
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

export default AddManagementForm;
