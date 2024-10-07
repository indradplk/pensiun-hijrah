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

const EditNewsForm = ({ show, handleClose, editData, handleEditInputChange }) => {
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

  const handleEditSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      formData.append('kategori', editData.kategori);
      formData.append('path_news', editData.path_news);

      const response = await axios.put(process.env.REACT_APP_API_BASE_URL + `/news/${editData.id}`, formData, {
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
      jabatan: editData.jabatan,
      path_news: editData.path_news,
      description: editData.description,
      kategori: editData.kategori,
    });
  }, [editData]);

  const handleDescriptionChange = (value) => {
    handleEditInputChange({
      target: {
        name: 'description',
        value: value
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Berita</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="title">Judul</FormLabel>
          <FormInput id="title" type="text" name="title" value={formData.title} onChange={handleEditInputChange} />
          <FormLabel htmlFor="kategori">Kategori</FormLabel>
          <FormSelect id="kategori" name="kategori" onChange={handleEditInputChange}>
            <FormOption value="">Pilih Kategori</FormOption>
            <FormOption value="artikel">Artikel</FormOption>
            <FormOption value="berita">Berita</FormOption>
          </FormSelect>
          <FormLabel htmlFor="path_news">Gambar</FormLabel>
          <FormInput id="path_news" type="file" name="path_news" onChange={handleEditInputChange} />
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
        <FormButton type="button" onClick={handleEditSubmit} disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</FormButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNewsForm;
