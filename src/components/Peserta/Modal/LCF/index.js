import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const LCFModal = ({ show, onLogin }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Life Cycle Fund</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Anda telah memasuki usia paling lama 5 (lima) tahun dan paling singkat 2 (dua) tahun sebelum Usia Pensiun Normal. Harap mengisi surat pernyataan Life Cycle Fund.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton variant="primary" onClick={onLogin}>
          Isi Sekarang!
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default LCFModal;
