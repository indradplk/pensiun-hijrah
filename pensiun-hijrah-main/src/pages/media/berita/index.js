import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Media/HeaderSection';
import NewsSection from '../../../components/Media/NewsSection';
import NewsItemSection from '../../../components/Media/NewsItemSection';
import Footer from '../../../components/Footer';
import {
  NewsHeader,
} from '../../../components/Media/HeaderSection/Data';

const News = ({ isSingleItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Berita | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...NewsHeader} />
      {isSingleItem ? <NewsItemSection /> : <NewsSection />}
      <Footer />
    </>
  );
};

export default News;