import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import NotFoundSection from '../../components/NotFound';
import { notFoundObj } from '../../components/NotFound/Data';
import Footer from '../../components/Footer';
const NotFound = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <NotFoundSection {...notFoundObj} />
      <Footer />
    </>
  );
};

export default NotFound;
