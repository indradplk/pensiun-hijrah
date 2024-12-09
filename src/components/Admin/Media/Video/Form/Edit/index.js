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
  FormButtonCancel
} from '../FormElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../../../MessageElements';

const EditVideoForm = ({ show, handleClose, editData, handleEditInputChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
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
      formData.append('link', editData.link);

      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/video/edit/${editData.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
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
      link: editData.link,
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Video</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleEditInputChange} />
          <FormLabel htmlFor="link">Kode Link YouTube</FormLabel>
          <FormInput id="link" type="text" name="link" value={formData.link} onChange={handleEditInputChange} />
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

export default EditVideoForm;
