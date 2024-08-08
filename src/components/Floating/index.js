import React from 'react';
import {
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import {
  FloatingButton,
  IconButton,
  EmailButton
} from './FloatingElements';

const Floating = () => {
  return (
    <FloatingButton>
      <IconButton
        href="https://wa.me/6281333393820"
        target="_blank"
        arial-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </IconButton>
      <EmailButton
        href="mailto:dplk@bankmuamalat.co.id"
        arial-label="Email"
      >
        <FaEnvelope size={24} />
      </EmailButton>
    </FloatingButton>
  );
};

export default Floating;
