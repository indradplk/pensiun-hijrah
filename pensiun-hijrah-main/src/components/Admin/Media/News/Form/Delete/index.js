import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  Form,
  FormH1,
  FormButtonDelete,
  FormButtonCancel
} from '../FormElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../../../MessageElements';

const DeleteNewsForm = ({ show, handleClose, deleteData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleDeleteSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await axios
      .delete(process.env.REACT_APP_API_BASE_URL + `/news/${deleteData.id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <FormH1>Hapus Berita</FormH1>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormH1>Apakah Anda yakin ingin menghapus data ini?</FormH1>
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
        <FormButtonDelete type="button" onClick={handleDeleteSubmit} disabled={loading}>{loading ? 'Menghapus...' : 'Hapus'}</FormButtonDelete>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteNewsForm;
