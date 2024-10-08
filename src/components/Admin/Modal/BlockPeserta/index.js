import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
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

const UnblockPesertaModal = ({ show, handleClose, pesertaData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleUnblock = async () => {
    setLoading(true);
    try {
      const response = await axios
        .post(process.env.REACT_APP_API_BASE_URL + `/peserta/unblock/${pesertaData.no_peserta}`,
          {}, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
      const { message } = response.data;
      setSuccess(message);
      
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
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
          <ModalLabel htmlFor="block_count">Percobaan Login</ModalLabel>
          <ModalInput id="block_count" type="text" name="block_count" value={pesertaData.block_count} disabled />
          <ModalLabel htmlFor="status">Status</ModalLabel>
          <ModalInput id="status" type="text" name="status" value={pesertaData.status} disabled />
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
        <ModalButton type="button" onClick={handleUnblock} disabled={loading}>{loading ? 'Loading...' : 'Reset Password'}</ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UnblockPesertaModal;
