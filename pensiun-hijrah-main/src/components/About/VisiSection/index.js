import React from 'react';
import {
  VisiContainer,
  VisiWrapper,
  VisiH2,
  VisiH1,
} from './VisiElements';

const Visi = () => {
  return (
    <VisiContainer id="visi">
      <VisiH1><b>Visi</b></VisiH1>
      <VisiWrapper>
          <VisiH2>Menjadi DPLK Syariah <b>terbaik</b> di Indonesia.</VisiH2>
      </VisiWrapper>
    </VisiContainer>
  );
};

export default Visi;
