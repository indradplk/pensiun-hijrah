import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const PengkinianDataModal = ({ show, onLogin }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Pengkinian Data</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Data Anda belum lengkap. Harap lakukan pengkinian data.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton variant="primary" onClick={onLogin}>
          Lengkapi Sekarang!
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default PengkinianDataModal;
