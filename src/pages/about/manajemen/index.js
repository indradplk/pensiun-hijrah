import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/About/HeaderSection';
import ManagementSection from '../../../components/About/ManagementSection';
import Footer from '../../../components/Footer';
import {
  ManajemenHeader,
} from '../../../components/About/HeaderSection/Data';
const Management = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Manajemen | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...ManajemenHeader} />
      <ManagementSection />
      <Footer />
    </>
  );
};

export default Management;
