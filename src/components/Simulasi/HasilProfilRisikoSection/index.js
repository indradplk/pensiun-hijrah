import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  ModalH1,
  ModalH2,
  ModalButton,
  ModalButtonCancel,
  ImgWrap,
  Img,
} from './ModalElements';

const ResultModal = ({ show, hasilPertanyaan, onRetry, onProceed }) => {

  return (
    <Modal show={show} centered>
      <Modal.Header closeButton={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalH1><b>{hasilPertanyaan?.judul || 'Default Title'}</b></ModalH1>
      </Modal.Header>
      <Modal.Body>
        <ImgWrap>
          <Img src={hasilPertanyaan?.img || 'Default Image'} />
        </ImgWrap>
        <ModalH2>{hasilPertanyaan?.description || 'Default Description'}</ModalH2>
      </Modal.Body>
      <Modal.Footer>
        <ModalButtonCancel onClick={onRetry}>Coba Lagi</ModalButtonCancel>
        <ModalButton onClick={onProceed}>Simulasi Investasi</ModalButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
