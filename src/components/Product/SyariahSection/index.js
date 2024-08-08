import React from 'react';
import Image1 from '../../../assets/images/sharia.svg';
import {
  SyariahContainer,
  SyariahWrapper,
  SyariahCard,
  SyariahIcon,
  SyariahH2,
  SyariahH1,
  TextWrapper,
  BtnLink,
} from './SyariahElements';
import { animateScroll as scroll } from 'react-scroll';

const Syariah = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <SyariahContainer id="services">
      <SyariahWrapper>
        <SyariahCard>
          <SyariahIcon src={Image1} />
          <TextWrapper>
            <SyariahH1><b>Kenapa Harus Syariah?</b></SyariahH1>
            <SyariahH2>Ketahui lebih lanjut bagaimana nyamannya menerapkan prinsip syariah dalam mengatur keuanganmu!</SyariahH2>
            <BtnLink to="/product/dana-pensiun-syariah/" onClick={toggleHome}>Cari Tahu Sekarang!</BtnLink>
          </TextWrapper>
        </SyariahCard>
      </SyariahWrapper>
    </SyariahContainer>
  );
};

export default Syariah;
