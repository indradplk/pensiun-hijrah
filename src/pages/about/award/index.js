import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/About/HeaderSection';
import AwardSection from '../../../components/About/AwardSection';
import Footer from '../../../components/Footer';
import {
  PenghargaanHeader,
} from '../../../components/About/HeaderSection/Data';
import Floating from '../../../components/Floating';

const Award = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Penghargaan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PenghargaanHeader} />
      <AwardSection />
      <Footer />
      <Floating />
    </>
  );
};

export default Award;
