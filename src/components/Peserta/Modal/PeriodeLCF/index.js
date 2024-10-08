import React from 'react';
import { Modal } from 'react-bootstrap';
import {
    ModalH1,
    ModalH2,
    ModalButton,
  } from '../ModalElements';

const PeriodeLCFModal = ({ show, onLogin }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>Usia Belum Terpenuhi</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ModalH2>Anda belum dapat melakukan Life Cycle Fund karena usia Anda belum mencapai usia paling lama 5 (lima) tahun dan paling singkat 2 (dua) tahun sebelum Usia Pensiun Normal.</ModalH2>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalButton variant="primary" onClick={onLogin}>
          Kembali
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default PeriodeLCFModal;
