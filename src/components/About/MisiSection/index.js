import React from 'react';
import Image3 from '../../../assets/images/intellectual.svg';
import Image4 from '../../../assets/images/laptop.svg';
import {
  MisiContainer,
  MisiWrapper,
  MisiCard,
  MisiIcon,
  MisiH2,
  MisiH1,
} from './MisiElements';

const Misi = () => {
  return (
    <MisiContainer id="services">
      <MisiH1><b>Misi</b></MisiH1>
      <MisiWrapper>
        <MisiCard>
          <MisiIcon src={Image4} />
          <MisiH2>Menyediakan produk dan layanan yang <b>cepat, mudah, inovatif & berkualitas</b> dengan dukungan teknologi sistem informasi yang handal.</MisiH2>
        </MisiCard>
        <MisiCard>
          <MisiIcon src={Image3} />
          <MisiH2>Memberikan <b>hasil investasi yang kompetitif</b> sebagai wujud profesionalisme pengelolaan DPLK.</MisiH2>
        </MisiCard>
      </MisiWrapper>
    </MisiContainer>
  );
};

export default Misi;
