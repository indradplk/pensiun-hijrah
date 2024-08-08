import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {
  Form,
  FormH1,
  FormInput,
  FormLabel,
  FormText,
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

const EditAwardForm = ({ show, handleClose, editData, handleEditInputChange, userData }) => {
  const [formData, setFormData] = useState({
    path_award: '',
    description: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const formData = new FormData();
      formData.append('description', editData.description);
      formData.append('path_award', editData.path_award);
      formData.append('userUpdate', userData.nik);
      formData.append('nama', userData.nama);

      const response = await axios.put(`${dataServer.href}/api/v1/award/${editData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setSuccess('Data berhasil diubah!');
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      console.log(formData);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }
    setLoading(false);
  };

  useEffect(() => {
    setFormData({
      path_award: editData.path_award,
      description: editData.description,
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Edit Penghargaan</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <FormInput id="description" name="description" value={formData.description} onChange={handleEditInputChange} />
          <FormLabel htmlFor="path_award">Gambar</FormLabel>
          <FormInput id="path_award" type="file" name="path_award" onChange={handleEditInputChange} />
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

export default EditAwardForm;
