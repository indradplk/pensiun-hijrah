import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Product/HeaderSection';
import ZakatSection from '../../../components/Product/ZakatSection';
import Syariah from '../../../components/Product/SyariahSection';
import Footer from '../../../components/Footer';
import {
  ZakatHeader,
} from '../../../components/Product/HeaderSection/Data';
import { productZakat } from '../../../components/Product/ZakatSection/Data';

const Zakat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Zakat Dana Pensiun | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...ZakatHeader} />
      <ZakatSection {...productZakat} />
      <Syariah />
      <Footer />
    </>
  );
};

export default Zakat;
