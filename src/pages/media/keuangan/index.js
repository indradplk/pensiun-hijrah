import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import KeuanganSection from '../../../components/Media/KeuanganSection';
import Footer from '../../../components/Footer';
import {
  KeuanganHeader,
} from '../../../components/Media/HeaderSection/Data';

const Keuangan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Laporan Keuangan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...KeuanganHeader} />
      <KeuanganSection />
      <Footer />
    </>
  );
};

export default Keuangan;