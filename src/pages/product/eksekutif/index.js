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
import BantuanProduct from '../../../components/Product/BantuanSection';
import Footer from '../../../components/Footer';
import {
  EksekutifHeader,
} from '../../../components/Product/HeaderSection/Data';
import { 
  productEksekutif,
} from '../../../components/Product/InfoSection/Data';
import { individuProduct } from '../../../components/Product/BenefitSection/Data';

const Eksekutif = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Produk Pensiun Hijrah Eksekutif | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...EksekutifHeader} />
      <Info {...productEksekutif} />
      <Benefit {...individuProduct} />
      <Invest />
      <Syariah />
      <Product />
      <BantuanProduct />
      <Footer />
    </>
  );
};

export default Eksekutif;
