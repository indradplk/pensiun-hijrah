import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Simulasi/HeaderSection';
import Footer from '../../../components/Footer';
import {
  SimulasiHeader
} from '../../../components/Simulasi/HeaderSection/Data';
import ProfRisk from '../../../components/Simulasi/ProfRiskSection';
import NeedsSection from '../../../components/Simulasi/NeedsSection';

const SimulasiKebutuhan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Simulasi Investasi Berdasarkan Kebutuhan | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...SimulasiHeader} />
      <ProfRisk />
      <NeedsSection />
      <Footer />
    </>
  );
};

export default SimulasiKebutuhan;
