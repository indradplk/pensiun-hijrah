import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  InvestContainer,
  InvestWrapper,
  InvestH1,
  InvestH4,
} from './GraphicElements';

const GrafikInvestasi = ({ data }) => {
  const filteredData = data.filter(item => item.usia % 5 === 0)
  
  const chartData = {
    labels: filteredData.map((item) => item.usia),
    datasets: [
      {
        label: 'Biaya Iuran',
        data: filteredData.map((item) => item.iuran),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Hasil Pengembangan',
        data: filteredData.map((item) => item.pengembangan),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
      {
        label: 'Saldo Akhir',
        data: filteredData.map((item) => item.saldoAkhir),
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
  };

  return (
    <InvestContainer id="graphic">
      <InvestH1><b>Grafik Hasil Simulasi</b></InvestH1>
      <InvestH4>(Klik titik pada grafik untuk melihat akumulasi iuran, pengembangan, dan saldo akhir di setiap tahunnya)</InvestH4>
      <InvestWrapper>
        <Line data={chartData} options={options} />
      </InvestWrapper>
    </InvestContainer>
  );
};

export default GrafikInvestasi;
