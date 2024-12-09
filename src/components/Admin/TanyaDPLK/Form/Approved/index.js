import React, { useState } from 'react';
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
} from '../../../MessageElements';

const ApproveForm = ({ show, handleClose, editData, userData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios
        .post(process.env.REACT_APP_API_BASE_URL + `/tanya-dplk/approve/${editData.id}`, {}, {
          headers: {
            "Content-Type": "application/json",
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
      }, 3000);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Ubah Status Email Masuk</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="email">Email Pengirim</FormLabel>
          <FormInput id="email" type="text" name="email" value={editData.email} disabled />
          <FormLabel htmlFor="nik">Direspon Oleh</FormLabel>
          <FormInput id="nik" type="text" name="nik" value={userData.username} disabled />
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
