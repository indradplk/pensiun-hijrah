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

const AddNewsForm = ({ show, handleClose, addData, handleAddInputChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    path_news: '',
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

    const formData = new FormData();
    formData.append('title', addData.title);
    formData.append('description', addData.description);
    formData.append('kategori', addData.kategori);
    formData.append('path_news', addData.path_news);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/news', formData, {
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
      path_news: addData.path_news,
      description: addData.description,
      kategori: addData.kategori,
    });
  }, [addData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Tambah Berita</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleAddInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleAddInputChange} value={formData.kategori}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="artikel">Artikel</FormOption>
            <FormOption value="berita">Berita</FormOption>
          </FormSelect>
          <FormLabel htmlFor="path_news">Gambar</FormLabel>
          <FormInput id="path_news" type="file" name="path_news" onChange={handleAddInputChange} />
          {formData.path_news && (
            <p>{formData.path_news.name}</p>
          )}
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <FormText id="description" name="description" onChange={handleAddInputChange} value={formData.description} />
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

export default AddNewsForm;