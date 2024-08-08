import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { LupaPasswordHeader } from '../../../components/Peserta/HeaderSection/Data';
import LupaPasswordPeserta from '../../../components/Peserta/Password/LupaPassword';
import Footer from '../../../components/Footer';

const PasswordPesertaPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Lupa Password | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...LupaPasswordHeader} />
      <LupaPasswordPeserta />
      <Footer />
    </>
  );
};

export default PasswordPesertaPage;
