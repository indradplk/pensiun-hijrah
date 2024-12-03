import React from 'react';
import Image1 from '../../../assets/images/bar.svg';
import Image2 from '../../../assets/images/lan.svg';
import Image3 from '../../../assets/images/oke.svg';
import {
  BenefitContainer,
  BenefitWrapper,
  BenefitCard,
  BenefitIcon,
  BenefitH2,
  BenefitH1,
} from './BenefitElements';

const Benefit = () => {
  return (
    <BenefitContainer id="services">
      <BenefitH1><b>Kelebihan DPLK Syariah Muamalat</b></BenefitH1>
      <BenefitWrapper>
        <BenefitCard>
          <BenefitIcon src={Image1} />
          <BenefitH2>Pengembangan <b>investasi</b> lebih <b>maksimal</b></BenefitH2>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon src={Image2} />
          <BenefitH2>Pendaftaran serta transaksi secara <b>online</b></BenefitH2>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon src={Image3} />
          <BenefitH2>Biaya <b>ringan</b> serta <b>transparan</b></BenefitH2>
        </BenefitCard>
      </BenefitWrapper>
    </BenefitContainer>
  );
};

export default Benefit;
