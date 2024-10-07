import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Bantuan/HeaderSection';
import FAQSection from '../../../components/Bantuan/FAQSection';
import Footer from '../../../components/Footer';
import {
  FAQHeader,
} from '../../../components/Bantuan/HeaderSection/Data';
const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Sering Ditanyakan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...FAQHeader} />
      <FAQSection />
      <Footer />
    </>
  );
};

export default FAQ;
