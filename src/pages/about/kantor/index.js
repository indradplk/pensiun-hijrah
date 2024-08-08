import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/About/HeaderSection';
import Footer from '../../../components/Footer';
import {
  KantorPusatHeader,
} from '../../../components/About/HeaderSection/Data';
import Office from '../../../components/About/OfficeSection';
import {
  officeObjOne,
} from '../../../components/About/OfficeSection/Data';
import Branch from '../../../components/About/BranchSection';
const Lokasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Lokasi Kantor | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...KantorPusatHeader} />
      <Office {...officeObjOne} />
      <Branch />
      <Footer />
    </>
  );
};

export default Lokasi;
