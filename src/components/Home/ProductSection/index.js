import React from 'react';
import Image1 from '../../../assets/images/image-1.svg';
import Image2 from '../../../assets/images/image-2.svg';
import {
  ProductContainer,
  ProductWrapper,
  ProductCard,
  ProductIcon,
  ProductH2,
  ProductP,
  BtnLink,
} from './ProductElements';
import { animateScroll as scroll } from 'react-scroll';

const Product = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <ProductContainer id="product">
      <ProductWrapper>
        <ProductCard>
          <ProductIcon src={Image1} />
          <ProductH2><b>Pensiun Hijrah</b></ProductH2>
          <ProductP>
            Rencanakan masa pensiun dengan aman dan nyaman. Nikmati kebebasan finansial di hari tua dengan keputusan yang bijak hari ini.
          </ProductP>
          <BtnLink to="/peserta/registrasi/" onClick={toggleHome}>Registrasi Sekarang!</BtnLink>
        </ProductCard>
        <ProductCard>
          <ProductIcon src={Image2} />
          <ProductH2><b>Pensiun Hijrah Pasca Kerja</b></ProductH2>
          <ProductP>
            Manfaatkan peluang untuk memberikan jaminan masa depan karyawan dengan bijak berinvestasi.
          </ProductP>
          <BtnLink to="/perusahaan/registrasi/" onClick={toggleHome}>Registrasi Sekarang!</BtnLink>
        </ProductCard>
      </ProductWrapper>
    </ProductContainer>
  );
};

export default Product;
