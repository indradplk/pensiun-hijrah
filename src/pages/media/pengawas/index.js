import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import PengawasSection from '../../../components/Media/PengawasSection';
import Footer from '../../../components/Footer';
import {
  DPHeader,
} from '../../../components/Media/HeaderSection/Data';

const Pengawas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Laporan Dewan Pengawas | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...DPHeader} />
      <PengawasSection />
      <Footer />
    </>
  );
};

export default Pengawas;