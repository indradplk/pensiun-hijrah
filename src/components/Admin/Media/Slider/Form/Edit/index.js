import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
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

const EditSliderForm = ({ show, handleClose, editData, handleEditInputChange, userData }) => {
  const [formData, setFormData] = useState({
    judul: '',
    path_web: '',
    path_mobile: '',
    status: '',
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
      formData.append('judul', editData.judul);
      formData.append('path_web', editData.path_web);
      formData.append('path_mobile', editData.path_mobile);
      formData.append('userUpdate', userData.nik);
      formData.append('nama', userData.nama);

      const response = await axios.put(`${dataServer.href}/api/v1/slider/${editData.id}`, formData, {
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
      judul: editData.judul,
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
