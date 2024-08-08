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
} from '../../../MessageElements';
import { dataServer } from '../../../../DataServer';

const ApproveForm = ({ show, handleClose, editData, handleEditInputChange, userData }) => {
  const [formData, setFormData] = useState({
    no_peserta: '',
    email: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/mail/registrasi-peserta/${editData.id}`, {
        no_peserta: editData.no_peserta,
        email: editData.email,
        nama: userData.nama,
        userUpdate: userData.nik
      }, {
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
      no_peserta: editData.no_peserta,
      email: editData.email
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Setujui Pendaftaran Peserta</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
          <FormInput id="no_peserta" type="text" name="no_peserta" value={formData.no_peserta} onChange={handleEditInputChange} />
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput id="email" type="text" name="email" value={formData.email} onChange={handleEditInputChange} disabled />
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
