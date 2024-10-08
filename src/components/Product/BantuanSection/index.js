import React from 'react';
import Image1 from '../../../assets/images/ask.svg';
import {
  BantuanContainer,
  BantuanWrapper,
  BantuanCard,
  BantuanIcon,
  BantuanH1,
  TextWrapper,
  BtnLink,
} from './BantuanElements';
import { animateScroll as scroll } from 'react-scroll';

const BantuanProduct = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <BantuanContainer id="help">
      <BantuanWrapper>
        <BantuanCard>
          <BantuanIcon src={Image1} />
          <TextWrapper>
            <BantuanH1><b>Ada Pertanyaan Mengenai Informasi Produk?</b></BantuanH1>
            <BtnLink to="/bantuan/kontak/" onClick={toggleHome}>Hubungi Kami!</BtnLink>
          </TextWrapper>
        </BantuanCard>
      </BantuanWrapper>
    </BantuanContainer>
  );
};

export default BantuanProduct;
