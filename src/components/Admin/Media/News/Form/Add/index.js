import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
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
import { dataServer } from '../../../../../DataServer';

const AddNewsForm = ({ show, handleClose, addData, handleAddInputChange, userData }) => {
  const [formData, setFormData] = useState({
    title: '',
    path_news: '',
    description: '',
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
      formData.append('description', addData.description);
      formData.append('kategori', addData.kategori);
      formData.append('path_news', addData.path_news);
      formData.append('nama', userData.nama);
      formData.append('userUpdate', userData.nik);
      
      const response = await axios.post(`${dataServer.href}/api/v1/news`, formData, {
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
      path_news: addData.path_news,
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

export default AddNewsForm;