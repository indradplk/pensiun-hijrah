import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  Form,
  FormH1,
  FormInput,
  FormLabel,
  FormSelect,
  FormOption,
  FormButton,
  FormButtonCancel,
  FormText
} from '../FormElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../../../MessageElements';

const EditManagementForm = ({ show, handleClose, editData, handleEditInputChange }) => {
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

  const handleEditSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const formData = new FormData();
      formData.append('nama', editData.nama);
      formData.append('jabatan', editData.jabatan);
      formData.append('description', editData.description);
      formData.append('kategori', editData.kategori);
      formData.append('path_management', editData.path_management);

      const response = await axios.put(process.env.REACT_APP_API_BASE_URL + `/management/${editData.id}`, formData, {
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
      nama: editData.nama,
      jabatan: editData.jabatan,
      path_management: editData.path_management,
      description: editData.description,
      kategori: editData.kategori,
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Manajemen</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="nama">Nama</FormLabel>
          <FormInput id="nama" type="text" name="nama" value={formData.nama} onChange={handleEditInputChange} />
          <FormLabel htmlFor="jabatan">Jabatan</FormLabel>
          <FormInput id="jabatan" type="text" name="jabatan" value={formData.jabatan} onChange={handleEditInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleEditInputChange}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="pengurus">Pengurus</FormOption>
            <FormOption value="pengawas">Dewan Pengawas</FormOption>
            <FormOption value="dps">Dewan Pengawas Syariah</FormOption>
          </FormSelect>
          <FormLabel htmlFor="path_management">Gambar</FormLabel>
          <FormInput id="path_management" type="file" name="path_management" onChange={handleEditInputChange} />
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <FormText id="description" name="description" value={formData.description} onChange={handleEditInputChange} />
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

export default EditManagementForm;
