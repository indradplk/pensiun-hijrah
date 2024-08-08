import React from 'react';
import {
  PerbedaanContainer,
  PerbedaanWrapper,
  PerbedaanH2,
  PerbedaanH1,
  TextWrapper,
} from './PerbedaanElements';

const Perbedaan = () => {
  return (
    <PerbedaanContainer id="perbedaan">
      <PerbedaanWrapper>
          <PerbedaanH1>Perbedaan utama antara Syariah & Konvensional</PerbedaanH1>
          <TextWrapper>
            <PerbedaanH2>Prinsip dan praktik dalam mengelola dan menjalankan program yang menjanjikan manfaat pensiun pada Dana Pensiun Syariah tunduk pada peraturan dari regulator dan <b>juga tunduk pada fatwa-fatwa yang diterbitkan oleh Dewan Syariah Nasional.</b></PerbedaanH2>
            <PerbedaanH2>Adapun pengelolaan Dana Pensiun dan penyaluran di Konvensional hanya merujuk pada peraturan dari regulator saja.</PerbedaanH2>
          </TextWrapper>
      </PerbedaanWrapper>
    </PerbedaanContainer>
  );
};

export default Perbedaan;
