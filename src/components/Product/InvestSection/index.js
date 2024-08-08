import React from 'react';
import Image1 from '../../../assets/images/A.svg';
import Image2 from '../../../assets/images/B.svg';
import Image3 from '../../../assets/images/C.svg';
import {
  InvestContainer,
  InvestWrapper,
  InvestCard,
  InvestIcon,
  InvestH2,
  InvestH1,
} from './InvestElements';

const Invest = () => {
  return (
    <InvestContainer id="services">
      <InvestH1><b>Paket Investasi</b></InvestH1>
      <InvestWrapper>
        <InvestCard>
          <InvestIcon src={Image1} />
          <InvestH2>Deposito Syariah ≤ 100%<br/>Instrumen Pasar Uang Syariah ≤ 80%</InvestH2>
        </InvestCard>
        <InvestCard>
          <InvestIcon src={Image2} />
          <InvestH2>Deposito Syariah ≤ 100%<br/>Instrumen Pendapatan Tetap ≤ 80%</InvestH2>
        </InvestCard>
        <InvestCard>
          <InvestIcon src={Image3} />
          <InvestH2>Deposito Syariah ≤ 100%<br/>Reksadana Syariah ≤ 80%<br/>Saham Syariah ≤ 50%</InvestH2>
        </InvestCard>
      </InvestWrapper>
    </InvestContainer>
  );
};

export default Invest;
