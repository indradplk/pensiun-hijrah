import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {
    ModalH1,
    ModalButton,
    ModalLabel,
    ModalInput,
    Form,
    ModalButtonCancel
  } from '../ModalElements';
  import {
    ErrorCard,
    SuccessCard,
    MessageH1,
    MessageH2,
  } from '../../MessageElements';
  import { dataServer } from '../../../DataServer';


const PasswordPesertaModal = ({ show, handleClose, pesertaData, userData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const response = await axios.post(`${dataServer.href}:4000/api/v1/peserta/reset-password/${pesertaData.no_peserta}`, {
        nama: userData.nama,
        userUpdate: userData.nik
      });
      const data = response.data;

      console.log(data);
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

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <ModalH1>Data Peserta</ModalH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ModalLabel htmlFor="no_peserta">Nomor Peserta</ModalLabel>
          <ModalInput id="no_peserta" type="text" name="no_peserta" value={pesertaData.no_peserta} disabled />
          <ModalLabel htmlFor="nama">Nama</ModalLabel>
          <ModalInput id="nama" type="text" name="nama" value={pesertaData.nama_lengkap} disabled />
          <ModalLabel htmlFor="email">Email</ModalLabel>
          <ModalInput id="email" type="text" name="email" value={pesertaData.email} disabled />
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
        <ModalButtonCancel type="button" onClick={handleClose}>Tutup</ModalButtonCancel>
        <ModalButton type="button" onClick={handleResetPassword} disabled={loading}>{loading ? 'Mereset...' : 'Reset Password'}</ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordPesertaModal;
