import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const StatusPengkinianModal = ({ show, onLogin, message }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Pengkinian Data Terakhir Sedang Diproses</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Anda belum dapat melakukan pengkinian data karena {message}.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton variant="primary" onClick={onLogin}>
          Kembali
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusPengkinianModal;
