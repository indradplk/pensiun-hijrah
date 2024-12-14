import React, { useState } from 'react';
import {
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaArrowLeft
} from 'react-icons/fa';
import {
  FloatingButton,
  IconButton,
  EmailButton,
  YtbButton,
  FacebookButton,
  FloatingContainer,
  FloatingMainButton,
  FloatingBackButton,
  InstagramButton
} from './FloatingElements';

const Floating = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <FloatingContainer>
      {isOpen && (
        <FloatingButton>
          <IconButton
            href="https://wa.me/6281333393820"
            target="_blank"
            arial-label="WhatsApp"
          >
            <FaWhatsapp size={24} />
          </IconButton>
          <InstagramButton
            href="https://instagram.com/dplksyariahmuamalat"
            target="_blank"
            arial-label="Instagram"
          >
            <FaInstagram size={24} />
          </InstagramButton>
          <YtbButton
            href="https://youtube.com/@dplksyariahmuamalat3802?si=um9rfefCu_6gvJYI"
            target="_blank"
            arial-label="Youtube"
          >
            <FaYoutube size={24} />
          </YtbButton>
          <FacebookButton
            href="https://www.facebook.com/dplksyariah.muamalat.5"
            target="_blank"
            arial-label="Facebook"
          >
            <FaFacebook size={24} />
          </FacebookButton>
          <EmailButton
            href="mailto:dplk@bankmuamalat.co.id"
            arial-label="Email"
          >
            <FaEnvelope size={24} />
          </EmailButton>
        </FloatingButton>
      )}
      <FloatingMainButton onClick={toggleButtons} aria-label="Toggle Menu">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </FloatingMainButton>
      <FloatingBackButton onClick={handleBack} aria-label="Back">
        <FaArrowLeft size={24} />
      </FloatingBackButton>
    </FloatingContainer>
  );
};

export default Floating;
