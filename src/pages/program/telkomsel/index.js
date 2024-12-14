import React from 'react';
import { Helmet } from 'react-helmet';
import TelkomselSection from '../../../components/Program/Telkomsel';
import Footer from '../../../components/Program/Telkomsel/Footer';
import HeaderSection from '../../../components/Program/Telkomsel/HeaderSection';
import Floating from '../../../components/Floating';

const Telkomsel = () => {
  return (
    <>
      <Helmet>
        <title>Program Telkomsel | DPLK Syariah Muamalat</title>
      </Helmet>
      <HeaderSection />
      <TelkomselSection />
      <Footer />
      <Floating />
    </>
  );
};

export default Telkomsel;