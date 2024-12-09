import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  Form,
  FormH1,
  FormInput,
  FormLabel,
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

const EditAnnouncementForm = ({ show, handleClose, editData, handleEditInputChange }) => {
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

  const handleEditSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      formData.append('document', editData.document);
      formData.append('path_announcement', editData.path_announcement);

      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/announcement/edit/${editData.id}`, formData, {
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
      title: editData.title,
      path_announcement: editData.path_announcement,
      description: editData.description,
      document: editData.document,
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Pengumuman</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleEditInputChange} />
          <FormLabel htmlFor="path_announcement">Gambar</FormLabel>
          <FormInput id="path_announcement" type="file" name="path_announcement" onChange={handleEditInputChange} />
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <FormText id="description" name="description" onChange={handleEditInputChange} value={formData.description} />
          <FormLabel htmlFor="document">Dokumen</FormLabel>
          <FormInput id="document" type="file" name="document" onChange={handleEditInputChange} />
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

export default EditAnnouncementForm;
