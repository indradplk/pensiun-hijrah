import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import Footer from '../../../components/Footer';
import {
  VideoHeader,
} from '../../../components/Media/HeaderSection/Data';
import VideoSection from '../../../components/Media/VideoSection';

const Video = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Video | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...VideoHeader} />
      <VideoSection />
      <Footer />
    </>
  );
};

export default Video;