import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import {
  Form,
  FormH1,
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

const AccNewsForm = ({ show, handleClose, accData, userData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setError('');
      setSuccess('');
      setLoading(false);
    }
  }, [show]);

  const handleAcceptSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`${dataServer.href}/api/v1/news/accept/${accData.id}`, {
        title: accData.title,
        nama: userData.nama,
        userUpdate: userData.nik
      });
      setSuccess('Data berhasil diperbarui!');
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat memperbarui data.');
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
        <FormH1>Setujui Berita & Artikel</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormH1>Apakah Anda yakin ingin menyetujui data ini?</FormH1>
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
        <FormButtonCancel type="button" onClick={handleClose}>Batal</FormButtonCancel>
        <FormButton type="button" onClick={handleAcceptSubmit} disabled={loading}>
          {loading ? 'Menyetujui...' : 'Setuju'}
        </FormButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AccNewsForm;
