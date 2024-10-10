import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const LogoutModal = ({ show, onLogin }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Anda berhasil Logout!</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Silakan login kembali.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton onClick={onLogin}>
          Masuk
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
