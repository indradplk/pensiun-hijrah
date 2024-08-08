import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import HeaderSection from '../../components/Simulasi/HeaderSection';
import Footer from '../../components/Footer';
import {
  SimulasiHeader,
} from '../../components/Simulasi/HeaderSection/Data';
import ProfRisk from '../../components/Simulasi/ProfRiskSection';
import SimulasiSection from '../../components/Simulasi/SimulasiSection';

const Simulasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Simulasi Investasi | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...SimulasiHeader} />
      <ProfRisk />
      <SimulasiSection />
      <Footer />
    </>
  );
};

export default Simulasi;
