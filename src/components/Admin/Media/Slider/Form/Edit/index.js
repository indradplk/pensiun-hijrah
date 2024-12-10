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

const EditSliderForm = ({ show, handleClose, editData, handleEditInputChange }) => {
  const [formData, setFormData] = useState({
    judul: '',
    link: '',
    path_web: '',
    path_mobile: '',
    status: '',
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
      formData.append('judul', editData.judul);
      formData.append('link', editData.link);
      formData.append('path_web', editData.path_web);
      formData.append('path_mobile', editData.path_mobile);

      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/slider/edit/${editData.id}`, formData, {
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
      judul: editData.judul,
      link: editData.link,
      path_web: editData.path_web,
      path_mobile: editData.path_mobile,
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Slider</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="judul">Judul</FormLabel>
          <FormInput id="judul" name="judul" value={formData.judul} onChange={handleEditInputChange} />
          <FormLabel htmlFor="link">Hyperlink (Jika Ada)</FormLabel>
          <FormInput id="link" name="link" value={formData.link} onChange={handleEditInputChange} />
          <FormLabel htmlFor="path_web">Gambar Website</FormLabel>
          <FormInput id="path_web" type="file" name="path_web" onChange={handleEditInputChange} />
          <FormLabel htmlFor="path_mobile">Gambar Mobile</FormLabel>
          <FormInput id="path_mobile" type="file" name="path_mobile" onChange={handleEditInputChange} />
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

export default EditSliderForm;
