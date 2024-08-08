import React from 'react';
import Image1 from '../../../assets/images/oke.svg';
import Image2 from '../../../assets/images/cut.svg';
import Image3 from '../../../assets/images/star.svg';
import Image4 from '../../../assets/images/in.svg';
import {
  BenefitContainer,
  BenefitWrapper,
  BenefitCard,
  BenefitIcon,
  BenefitH2,
  BenefitH1,
} from './BenefitElements';

const Benefit = ({
  judul,
  teks1,
  teks2,
  teks3,
  teks4,
}) => {
  return (
    <BenefitContainer id="services">
      <BenefitH1><b>{judul}</b></BenefitH1>
      <BenefitWrapper>
        <BenefitCard>
          <BenefitIcon src={Image1} />
          <BenefitH2>{teks1}</BenefitH2>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon src={Image2} />
          <BenefitH2>{teks2}</BenefitH2>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon src={Image3} />
          <BenefitH2>{teks3}</BenefitH2>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon src={Image4} />
          <BenefitH2>{teks4}</BenefitH2>
        </BenefitCard>
      </BenefitWrapper>
    </BenefitContainer>
  );
};

export default Benefit;
