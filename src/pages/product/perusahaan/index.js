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
  PerusahaanHeader,
} from '../../../components/Product/HeaderSection/Data';
import { 
  productPerusahaan,
} from '../../../components/Product/InfoSection/Data';
import { perusahaanProduct } from '../../../components/Product/BenefitSection/Data';
import Floating from '../../../components/Floating';

const Perusahaan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Helmet>
        <title>Produk Pensiun Hijrah Pasca Kerja | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...PerusahaanHeader} />
      <Info {...productPerusahaan} />
      <Benefit {...perusahaanProduct} />
      <Invest />
      <Syariah />
      <Product />
      <BantuanProduct />
      <Footer />
      <Floating />
    </>
  );
};

export default Perusahaan;
