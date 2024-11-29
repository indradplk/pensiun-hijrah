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

const AddAnnouncementForm = ({ show, handleClose, addData, handleAddInputChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    path_announcement: '',
    description: '',
    document: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleAddSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', addData.title);
    formData.append('description', addData.description);
    formData.append('document', addData.document);
    formData.append('path_announcement', addData.path_announcement);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/announcement', formData, {
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
      title: addData.title,
      path_announcement: addData.path_announcement,
      description: addData.description,
      document: addData.document,
    });
  }, [addData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Pengumuman</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleAddInputChange} />
          <FormLabel htmlFor="path_announcement">Gambar</FormLabel>
          <FormInput id="path_announcement" type="file" name="path_announcement" onChange={handleAddInputChange} />
          {formData.path_announcement && (
            <p>{formData.path_announcement.name}</p>
          )}
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <FormText id="description" name="description" onChange={handleAddInputChange} value={formData.description} />
          <FormLabel htmlFor="document">Dokumen</FormLabel>
          <FormInput id="document" type="file" name="document" onChange={handleAddInputChange} />
          {formData.document && (
            <p>{formData.document.name}</p>
          )}
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

export default AddAnnouncementForm;