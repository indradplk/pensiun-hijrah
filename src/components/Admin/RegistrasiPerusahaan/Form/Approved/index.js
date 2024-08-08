import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
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
} from '../../../MessageElements';
import { dataServer } from '../../../../DataServer';

const ApproveForm = ({ show, handleClose, editData, userData }) => {
  const [formData, setFormData] = useState({
    nik: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        nik: formData.nik,
        email: editData.email,
        namaAdmin: userData.nama
      };

      const response = await axios.put(`${dataServer.href}/api/v1/registrasi-perusahaan/${editData.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
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
      setError(error.response ? error.response.data.message : 'Terjadi kesalahan');
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }
    setLoading(false);
  };

  useEffect(() => {
    setFormData({
      nik: userData.nik
    });
  }, [editData, userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Ubah Status Email Pendaftaran Perusahaan</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="email">Email Pengirim</FormLabel>
          <FormInput id="email" type="text" name="email" value={editData.email} disabled />
          <FormLabel htmlFor="nik">Disetujui Oleh</FormLabel>
          <FormInput id="nik" type="text" name="nik" value={formData.nik} onChange={handleChange} disabled />
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

export default ApproveForm;
