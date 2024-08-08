import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Perusahaan/HeaderSection';
import { LupaPasswordHeader } from '../../../components/Perusahaan/HeaderSection/Data';
import LupaPasswordPerusahaan from '../../../components/Perusahaan/Password/LupaPassword';

import Footer from '../../../components/Footer';
const PasswordPerusahaanPage = () => {
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
      <LupaPasswordPerusahaan />
      <Footer />
    </>
  );
};

export default PasswordPerusahaanPage;
