import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButtonDelete,
  } from '../ModalElements';

const ErrorModal = ({ show, onHide, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Error!</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>{message}</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButtonDelete onClick={onHide}>
          Kembali
        </ModalButtonDelete>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
