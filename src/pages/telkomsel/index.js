import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import TelkomselSection from '../../components/Telkomsel';
import HeaderSection from '../../components/Telkomsel/HeaderSection';

const Telkomsel = ({ isSingleItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Telkomsel | DPLK Syariah Muamalat</title>
      </Helmet>
      <HeaderSection />
      <TelkomselSection />
    </>
  );
};

export default Telkomsel;