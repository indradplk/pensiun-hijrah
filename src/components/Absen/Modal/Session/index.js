import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const SessionModal = ({ show, onLogin }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Sesi Login Anda telah Berakhir</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Silakan login terlebih dahulu.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton onClick={onLogin}>
          Masuk
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionModal;
