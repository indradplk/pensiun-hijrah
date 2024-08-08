import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import InfoSection from '../../components/Home/InfoSection';
import DownloadSection from '../../components/Home/DownloadSection';
import CarouselSection from '../../components/Home/CarouselSection';
import {
  homeObjOne,
  homeObjThree,
} from '../../components/Home/InfoSection/Data';
import {
  homeObjTwo,
} from '../../components/Home/DownloadSection/Data';
import Product from '../../components/Home/ProductSection';
import Benefit from '../../components/Home/BenefitSection';
import Invest from '../../components/Home/InvestSection';
import Footer from '../../components/Footer';
import Floating from '../../components/Floating';
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Pensiun Hijrah | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <CarouselSection />
      <InfoSection {...homeObjOne} />
      <Product />
      <Benefit />
      <Invest />
      <InfoSection {...homeObjThree} />
      <DownloadSection {...homeObjTwo} />
      <Footer />
      <Floating />
    </>
  );
};

export default Home;
