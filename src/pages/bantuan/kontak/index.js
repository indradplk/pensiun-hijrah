import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Bantuan/HeaderSection';
import Footer from '../../../components/Footer';
import {
  KontakHeader,
} from '../../../components/Bantuan/HeaderSection/Data';
import KontakSection from '../../../components/Bantuan/KontakSection';
import { bantuanKontak } from '../../../components/Bantuan/KontakSection/Data';
import Mail from '../../../components/Bantuan/MailSection';
import Floating from '../../../components/Floating';

const Kontak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Hubungi Kami | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...KontakHeader} />
      <KontakSection {...bantuanKontak} />
      <Mail />
      <Footer />
      <Floating />
    </>
  );
};

export default Kontak;
