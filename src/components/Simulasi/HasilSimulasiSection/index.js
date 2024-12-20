import React from 'react';
import { utils, writeFile } from 'xlsx';
import {
  InvestContainer,
  InvestWrapper,
  InvestCard,
  InvestH4,
  InvestH3,
  InvestH2,
  InvestH1,
  FormButton,
} from './InvestElements';

const HasilInvestasi = ({ hasilInvestasi, data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const exportToExcel = () => {
    // Mapping data with custom header names
    const mappedData = data.map(row => ({
      'Usia': row.usia,
      'Total Iuran': row.iuran,
      'Pengembangan (Sebelum dipotong Biaya)': row.pengembanganAwal,
      'Pengembangan (Setelah dipotong Biaya)': row.pengembangan,
      'Saldo Akhir (Sebelum Dipotong Biaya) ': row.saldoAkhirSebelum,
      'Saldo Akhir (Setelah dipotong Biaya)': row.saldoAkhir,
    }));

    const ws = utils.json_to_sheet(mappedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Hasil Investasi");
    writeFile(wb, "Hasil_Investasi.xlsx");
  };

  return (
    <InvestContainer id="result">
      <InvestH1><b>Hasil Simulasi</b></InvestH1>
      <FormButton onClick={exportToExcel}>Rincian Hasil Simulasi</FormButton>
      <InvestWrapper>
        <InvestCard>
          <InvestH2>Total Iuran</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.akumulasiIuran)}</b></InvestH3>
          <InvestH4><i>Total iuran adalah dana awal ditambah iuran mulai dari awal kepesertaan hingga berakhirnya masa kepesertaan (sesuai usia pensiun).</i></InvestH4>
        </InvestCard>
        <InvestCard>
          <InvestH2>Hasil Pengembangan</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.hasilPengembangan)}</b></InvestH3>
          <InvestH4><i>Hasil pengembangan adalah jumlah perkembangan total iuran dikurangi biaya administrasi dan pengelolaan.</i></InvestH4>
        </InvestCard>
        <InvestCard>
          <InvestH2>Total Dana Manfaat</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.totalDana)}</b></InvestH3>
          <InvestH4><i>Total dana manfaat adalah dana yang bisa diklaim di akhir masa kepesertaan (sesuai usia pensiun).</i></InvestH4>
        </InvestCard>
        <InvestCard>
          <InvestH2>Total Pajak</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.pajak)}</b></InvestH3>
          <InvestH4><i>Total pajak adalah pajak yang harus dibayarkan untuk manfaat pensiun. Sesuai regulasi, tarif pajak sebesar 5% jika total dana manfaat di atas Rp50.000.000.</i></InvestH4>
        </InvestCard>
        <InvestCard>
          <InvestH2>Total Dana Manfaat (Setelah Pajak)</InvestH2>
          <InvestH3><b>{formatCurrency(hasilInvestasi.totalDanaPajak)}</b></InvestH3>
          <InvestH4><i>Total dana manfaat adalah dana yang bisa diklaim di akhir masa kepesertaan (sesuai usia pensiun) setelah dipotong pajak.</i></InvestH4>
        </InvestCard>
      </InvestWrapper>
      <InvestH2><b> *) Hasil simulasi merupakan estimasi, hasil akhir sebenarnya dapat berbeda.</b></InvestH2>
    </InvestContainer>
  );
};

export default HasilInvestasi;
