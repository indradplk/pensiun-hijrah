import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { RegistrasiHeader } from '../../../components/Peserta/HeaderSection/Data';
import Registrasi from '../../../components/Peserta/Registrasi';
import Footer from '../../../components/Footer';

const RegistrasiPPIP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Registrasi Peserta Baru | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...RegistrasiHeader} />
      <Registrasi />
      <Footer />
    </>
  );
};

export default RegistrasiPPIP;