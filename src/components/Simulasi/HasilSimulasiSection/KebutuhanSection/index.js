import React from 'react';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import {
  InvestContainer,
  InvestWrapper,
  InvestCard,
  InvestH3,
  InvestH2,
  InvestH1,
  InvestWrapper2Column,
} from '../InvestElements';

const HasilInvestasiKebutuhan = ({ hasilInvestasi, data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <InvestContainer id="result">
      <InvestH1><b>Hasil Simulasi</b></InvestH1>
      <InvestWrapper2Column>
        <InvestCard>
          <InvestH2>Tanggal Pensiun</InvestH2>
          <InvestH3><b>{format(new Date(hasilInvestasi.tanggalPensiun), 'dd MMMM yyyy', { locale: localeID })}</b></InvestH3>
        </InvestCard>
        <InvestCard>
          <InvestH2>Lama Kepesertaan</InvestH2>
          <InvestH3><b>{hasilInvestasi.lamaKepesertaan} tahun</b></InvestH3>
        </InvestCard>
        <InvestCard>
          <InvestH2>Iuran per Bulan*</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.iuranPerBulan)}</b></InvestH3>
        </InvestCard>
        <InvestCard>
          <InvestH2>Tabungan per Bulan jika tidak berinvestasi DPLK*</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.iuranWithoutRatePerBulan)}</b></InvestH3>
        </InvestCard>
      </InvestWrapper2Column>
      <InvestH2><b> *) Hasil simulasi merupakan estimasi, hasil akhir sebenarnya dapat berbeda.</b></InvestH2>
    </InvestContainer>
  );
};

export default HasilInvestasiKebutuhan;
