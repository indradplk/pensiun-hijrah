import React from 'react';
import Image1 from '../../../assets/images/bar.svg';
import Image2 from '../../../assets/images/lan.svg';
import Image3 from '../../../assets/images/oke.svg';
import {
  FloatingContainer,
  FloatingWrapper,
  FloatingCard,
  FloatingIcon,
  FloatingH2,
  FloatingH1,
  BtnLink1,
  BtnLink2
} from './ButtonElements';
import { animateScroll as scroll } from 'react-scroll';

const FloatingSection = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FloatingContainer id="floating-button">
      <FloatingWrapper>
        <BtnLink1 to="/peserta/" onClick={toggleHome}>Cek Saldo</BtnLink1>
        <BtnLink2 to="/peserta/registrasi/" onClick={toggleHome}>Registrasi Peserta Baru</BtnLink2>
      </FloatingWrapper>
    </FloatingContainer>
  );
};

export default FloatingSection;
