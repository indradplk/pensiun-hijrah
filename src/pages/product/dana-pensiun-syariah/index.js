import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Product/HeaderSection';
import Footer from '../../../components/Footer';
import {
  PensiunSyariahHeader,
} from '../../../components/Product/HeaderSection/Data';
import Info from '../../../components/Product/InfoSection';
import Perbedaan from '../../../components/Product/PerbedaanSection';
import { aboutSyariah, aboutInvestasi } from '../../../components/Product/InfoSection/Data';
import Floating from '../../../components/Floating';

const PensiunSyariah = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Mengenal Dana Pensiun Syariah | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PensiunSyariahHeader} />
      <Info {...aboutSyariah} />
      <Info {...aboutInvestasi} />
      <Perbedaan />
      <Footer />
      <Floating />
    </>
  );
};

export default PensiunSyariah;
