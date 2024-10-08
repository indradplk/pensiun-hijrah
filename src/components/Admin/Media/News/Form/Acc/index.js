import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
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

const AccNewsForm = ({ show, handleClose, accData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

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
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/news/approve/${accData.id}`, 
        {},
        {
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
