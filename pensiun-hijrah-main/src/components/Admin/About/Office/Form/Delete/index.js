import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
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
import { dataServer } from '../../../../../DataServer';

const DeleteOfficeForm = ({ show, handleClose, deleteData }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      await axios.delete(`${dataServer.href}:4000/api/v1/office/${deleteData.id}`);
      setSuccess('Data berhasil dihapus!');
      setTimeout(() => {
        setSuccess('');
        handleClose();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message || 'Terjadi kesalahan saat menghapus data.');
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
        <FormH1>Hapus Kantor Cabang</FormH1>
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

export default DeleteOfficeForm;
