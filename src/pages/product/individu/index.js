import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import HeaderSection from '../../../components/Product/HeaderSection';
import Info from '../../../components/Product/InfoSection';
import Benefit from '../../../components/Product/BenefitSection';
import Invest from '../../../components/Product/InvestSection';
import Syariah from '../../../components/Product/SyariahSection';
import Product from '../../../components/Product/ProductSection';
import Footer from '../../../components/Footer';
import {
  IndividuHeader,
} from '../../../components/Product/HeaderSection/Data';
import { 
  productIndividu,
} from '../../../components/Product/InfoSection/Data';
import { individuProduct } from '../../../components/Product/BenefitSection/Data';
import BantuanProduct from '../../../components/Product/BantuanSection';

const Individu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Produk Pensiun Hijrah | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...IndividuHeader} />
      <Info {...productIndividu} />
      <Benefit {...individuProduct} />
      <Invest />
      <Syariah />
      <Product />
      <BantuanProduct />
      <Footer />
    </>
  );
};

export default Individu;
