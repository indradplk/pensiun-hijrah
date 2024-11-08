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

const AddSliderForm = ({ show, handleClose, addData, handleAddInputChange }) => {
  const [formData, setFormData] = useState({
    judul: '',
    path_web: '',
    path_mobile: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleAddSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('judul', addData.judul);
    formData.append('path_web', addData.path_web);
    formData.append('path_mobile', addData.path_mobile);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/slider', formData, {
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
      judul: addData.judul,
      path_web: addData.path_web,
      path_mobile: addData.path_mobile,
    });
  }, [addData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Slider</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="judul">Judul</FormLabel>
          <FormInput id="judul" name="judul" value={formData.judul} onChange={handleAddInputChange} />
          <FormLabel htmlFor="path_web">Gambar Website</FormLabel>
          <FormInput id="path_web" type="file" name="path_web" onChange={handleAddInputChange} />
          <FormLabel htmlFor="path_mobile">Gambar Mobile</FormLabel>
          <FormInput id="path_mobile" type="file" name="path_mobile" onChange={handleAddInputChange} />
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

export default AddSliderForm;
