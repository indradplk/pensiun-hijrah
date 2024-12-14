import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import AnnouncementSection from '../../../components/Media/AnnouncementSection';
import AnnouncementItemSection from '../../../components/Media/AnnouncementItemSection';
import Footer from '../../../components/Footer';
import {
  AnnouncementHeader,
} from '../../../components/Media/HeaderSection/Data';
import Floating from '../../../components/Floating';

const Announcement = ({ isSingleItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Pengumuman | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...AnnouncementHeader} />
      {isSingleItem ? <AnnouncementItemSection /> : <AnnouncementSection />}
      <Footer />
      <Floating />
    </>
  );
};

export default Announcement;