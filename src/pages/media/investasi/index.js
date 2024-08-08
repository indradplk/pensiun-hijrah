import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import InvestasiSection from '../../../components/Media/InvestasiSection';
import Footer from '../../../components/Footer';
import {
  FunFactHeader,
} from '../../../components/Media/HeaderSection/Data';

const Investasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Fund Fact Sheet | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...FunFactHeader} />
      <InvestasiSection />
      <Footer />
    </>
  );
};

export default Investasi;