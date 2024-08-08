import React from 'react';
import Image1 from '../../../assets/images/profil-risiko.svg';
import {
  ProfRiskContainer,
  ProfRiskWrapper,
  ProfRiskCard,
  ProfRiskIcon,
  ProfRiskH2,
  ProfRiskH1,
  TextWrapper,
  BtnLink,
} from './ProfRiskElements';
import { animateScroll as scroll } from 'react-scroll';

const ProfRisk = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <ProfRiskContainer id="services">
      <ProfRiskWrapper>
        <ProfRiskCard>
          <ProfRiskIcon src={Image1} />
          <TextWrapper>
            <ProfRiskH1><b>Profil Risiko</b></ProfRiskH1>
            <ProfRiskH2>Ketahui lebih lanjut rekomendasi instrumen investasi yang sesuai dengan kepribadian dan tujuan investasi Anda!</ProfRiskH2>
            <BtnLink to="/profil-risiko/" onClick={toggleHome}>Cari Tahu Sekarang!</BtnLink>
          </TextWrapper>
        </ProfRiskCard>
      </ProfRiskWrapper>
    </ProfRiskContainer>
  );
};

export default ProfRisk;
