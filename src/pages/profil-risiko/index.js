import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import HeaderSection from '../../components/Simulasi/HeaderSection';
import Questionnaire from '../../components/Simulasi/PertanyaanProfilRisikoSection';
import Footer from '../../components/Footer';
import {
  ProfilRisikoHeader,
} from '../../components/Simulasi/HeaderSection/Data';
const ProfilRisiko = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Profil Risiko | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...ProfilRisikoHeader} />
      <Questionnaire />
      <Footer />
    </>
  );
};

export default ProfilRisiko;
