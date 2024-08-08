import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/SignUp/HeaderSection';
import { PerusahaanHeader } from '../../../components/SignUp/HeaderSection/Data';
import SignUpSection from '../../../components/SignUp/Perusahaan';
import Footer from '../../../components/Footer';

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Sign Up | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PerusahaanHeader} />
      <SignUpSection />
      <Footer />
    </>
  );
};

export default SignUp;
