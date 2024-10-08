import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import HeaderSection from '../../../components/Perusahaan/HeaderSection';
import { RegistrasiHeader } from '../../../components/Perusahaan/HeaderSection/Data';
import Registrasi from '../../../components/Perusahaan/Registrasi';
import Footer from '../../../components/Footer';

const RegistrasiPPUKP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Registrasi Perusahaan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...RegistrasiHeader} />
      <Registrasi />
      <Footer />
    </>
  );
};

export default RegistrasiPPUKP;