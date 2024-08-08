import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { RiwayatContainer, RiwayatWrapper, RiwayatH1, RiwayatH2, BtnLink } from './RiwayatElements';
import '../../../style.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../../assets/images/header.png';
import Footer from '../../../assets/images/footer.png';
import { dataServer } from '../../DataServer';

const Riwayat = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: false // Default nilai isMobile false
  });

  const [saldoSebelum, setSaldoSebelum] = useState(0);
  let saldoSebelumWeb = saldoSebelum;
  let saldoSebelumMobile = saldoSebelum;

  useEffect(() => {
    fetchData();
    const handleWindowSizeChange = () => {
      setState((prevState) => ({
        ...prevState,
        isMobile: window.innerWidth <= 820
      }));
    };
    handleWindowSizeChange(); // Panggil fungsi sekali saat komponen dipasang
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [userData.userId]);

  const fetchData = async () => {
    try {
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
      const startDate = format(threeMonthsAgo, 'yyyy-MM-dd');
      const endDate = format(today, 'yyyy-MM-dd');
      
      const transaksiResponse = await axios.get(`${dataServer.href}/api/v1/ppip/transaksi/${userData.userId}?start_date=${startDate}&end_date=${endDate}`);
      setState((prevState) => ({
        ...prevState,
        data: transaksiResponse.data
      }));

      const saldoResponse = await axios.get(`${dataServer.href}/api/v1/ppip/saldo/${userData.userId}?end_date=${startDate}`);
      const totalDana = saldoResponse.data[0]?.TOTAL_DANA;
      setSaldoSebelum(totalDana || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 

  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return format(new Date(year, month - 1, day), 'dd MMM yyyy', { locale: id });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Tambahkan gambar header di atas
    const headerWidth = 175;
    const headerHeight = 18.12;
    const headerX = (doc.internal.pageSize.getWidth() - headerWidth) / 2;
    const headerY = 10;
    doc.addImage(Header, 'PNG', headerX, headerY, headerWidth, headerHeight);
  
    // Tambahkan judul pada PDF
    doc.setFontSize(14);
    doc.text('Riwayat Transaksi 3 Bulan Terakhir', 105, 50, null, null, 'center');

    let saldoSebelumPDF = saldoSebelum;
  
    // Tambahkan tabel dengan menggunakan AutoTable
    doc.autoTable({
      headStyles: { fillColor: '#D7A1FF', textColor: [255, 255, 255], fontStyle: 'bold' },
      margin: { top: 30 },
      startY: 60,
      head: [['Tanggal', 'Transaksi', 'Nominal', 'Saldo']],
      body: state.data.map(item => {
        const saldo = item.MUTASI_IURAN_PK + item.MUTASI_IURAN_PST + item.MUTASI_PENGEMBANGAN + item.MUTASI_PERALIHAN;
        saldoSebelumPDF += saldo;
        return [
          formatDate(item.TGL_TRANSAKSI),
          item.KETERANGAN,
          formatCurrency(saldo),
          formatCurrency(saldoSebelumPDF)
        ];
      }),
    });

    // Tambahkan gambar footer di bawah
    const footerWidth = 175;
    const footerHeight = 15
    const footerX = (doc.internal.pageSize.getWidth() - footerWidth) / 2;
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.addImage(Footer, 'PNG', footerX, footerY, footerWidth, footerHeight);
  
    // Simpan atau unduh PDF
    doc.save('riwayat_transaksi.pdf');
  };  

  return (
    <RiwayatContainer id="riwayat">
      <RiwayatH1><b>Transaksi Peserta</b></RiwayatH1>
      <RiwayatH2>3 Bulan Terakhir</RiwayatH2>
      <RiwayatWrapper>
        <BtnLink to="#" onClick={handleDownloadPDF}>Download Riwayat Transaksi</BtnLink>
      </RiwayatWrapper>
      {!state.isMobile && state.data && state.data.length > 0 && (
        <RiwayatWrapper>
            <Table striped bordered hover className="riwayat">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Transaksi</th>
                  <th>Iuran Pemberi Kerja</th>
                  <th>Iuran Peserta</th>
                  <th>Pengembangan</th>
                  <th>Peralihan</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
              {state.data.map((item) => {
                const saldo = item.MUTASI_IURAN_PK + item.MUTASI_IURAN_PST + item.MUTASI_PENGEMBANGAN + item.MUTASI_PERALIHAN;
                saldoSebelumWeb += saldo;
                return (
                  <tr key={item.ID_TRANSAKSI}>
                    <td>{formatDate(item.TGL_TRANSAKSI)}</td>
                    <td>{item.KETERANGAN}</td>
                    <td>{formatCurrency(item.MUTASI_IURAN_PK)}</td>
                    <td>{formatCurrency(item.MUTASI_IURAN_PST)}</td>
                    <td>{formatCurrency(item.MUTASI_PENGEMBANGAN)}</td>
                    <td>{formatCurrency(item.MUTASI_PERALIHAN)}</td>
                    <td>{formatCurrency(saldoSebelumWeb)}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
        </RiwayatWrapper>
      )}
      {state.isMobile && state.data && state.data.length > 0 && (
        <RiwayatWrapper>
            <Table striped bordered hover className="riwayat-mobile">
              <thead>
                <tr>
                  <th>Transaksi</th>
                  <th>Nominal</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
              {state.data.map((item) => {
                const saldo = item.MUTASI_IURAN_PK + item.MUTASI_IURAN_PST + item.MUTASI_PENGEMBANGAN + item.MUTASI_PERALIHAN;
                saldoSebelumMobile += saldo;
                return (
                  <tr key={item.ID_TRANSAKSI}>
                    <td>{item.KETERANGAN}<br/>({formatDate(item.TGL_TRANSAKSI)})</td>
                    <td>{formatCurrency(saldo)}</td>
                    <td>{formatCurrency(saldoSebelumMobile)}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
        </RiwayatWrapper>
      )}
    </RiwayatContainer>
  );
};

export default Riwayat;
