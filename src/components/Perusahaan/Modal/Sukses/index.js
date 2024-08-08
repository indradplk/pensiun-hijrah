import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const SuccessModal = ({ show, onLogin, message }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Berhasil!</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>{message}</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton variant="primary" onClick={onLogin}>
          Kembali
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
