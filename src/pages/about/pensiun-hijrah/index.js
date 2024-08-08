import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import InfoSection from '../../../components/About/InfoSection';
import Visi from '../../../components/About/VisiSection';
import {
  homeObjOne,
} from '../../../components/About/InfoSection/Data';
import Misi from '../../../components/About/MisiSection';
import Benefit from '../../../components/About/BenefitSection';
import TimelineSection from '../../../components/About/TimelineSection';
import Footer from '../../../components/Footer';
const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Tentang Pensiun Hijrah | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <InfoSection {...homeObjOne} />
      <Visi />
      <Misi />
      <Benefit />
      <TimelineSection />
      <Footer />
    </>
  );
};

export default About;
