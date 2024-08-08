import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import HeaderSection from '../../components/SignIn/HeaderSection';
import { PerusahaanHeader } from '../../components/SignIn/HeaderSection/Data';
import SignIn from '../../components/SignIn/Perusahaan';
import Footer from '../../components/Footer';
const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Login | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PerusahaanHeader} />
      <SignIn />
      <Footer />
    </>
  );
};

export default Login;
