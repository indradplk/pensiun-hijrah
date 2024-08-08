import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Bantuan/HeaderSection';
import PanduanSection from '../../../components/Bantuan/PanduanSection';
import Footer from '../../../components/Footer';
import {
  PanduanHeader,
} from '../../../components/Bantuan/HeaderSection/Data';
const Panduan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Panduan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PanduanHeader} />
      <PanduanSection />
      <Footer />
    </>
  );
};

export default Panduan;
