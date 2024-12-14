import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Bantuan/HeaderSection';
import FormulirSection from '../../../components/Bantuan/FormulirSection';
import Footer from '../../../components/Footer';
import {
  FormulirHeader,
} from '../../../components/Bantuan/HeaderSection/Data';
import Floating from '../../../components/Floating';

const Formulir = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Download | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...FormulirHeader} />
      <FormulirSection />
      <Footer />
      <Floating />
    </>
  );
};

export default Formulir;
