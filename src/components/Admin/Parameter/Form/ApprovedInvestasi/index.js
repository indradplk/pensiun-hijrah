import React, { useState, useEffect } from 'react';
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

const ApproveForm = ({ show, handleClose, editData, handleEditInputChange, userData }) => {
  const [formData, setFormData] = useState({
    code: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (editData.id === 'A') {
        endpoint = `${process.env.REACT_APP_API_BASE_URL}/parameter/1`;
      } else if (editData.id === 'B') {
        endpoint = `${process.env.REACT_APP_API_BASE_URL}/parameter/2`;
      } else if (editData.id === 'C') {
        endpoint = `${process.env.REACT_APP_API_BASE_URL}/parameter/3`;
      }

      const response = await axios.post(endpoint, {
        NUMERIC_VALUE: editData.code
      }, {
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
      }, 2000);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      code: editData.code || ''
    });
  }, [editData]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Ubah Parameter</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormLabel htmlFor="code">Nilai Parameter</FormLabel>
          <FormInput id="code" type="text" name="code" value={formData.code} onChange={handleEditInputChange} />
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