import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import { RiwayatContainer, RiwayatWrapper, RiwayatH1, RiwayatH2, BtnLink } from './RiwayatElements';
import '../../../style.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DPLK from '../../../assets/images/DPLK.png';
import Header from '../../../assets/images/header.png';
import Footer from '../../../assets/images/footer.png';

const Riwayat = ({ userData }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({
    data: [],
    dataUser: [],
    isMobile: false
  });

  const [saldoSebelum, setSaldoSebelum] = useState(0);
  let saldoSebelumWeb = saldoSebelum;
  let saldoSebelumMobile = saldoSebelum;

  useEffect(() => {
    fetchData();
    fetchUser();
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
  }, [userData.username]);

  const fetchData = async () => {
    try {
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
      const startDate = format(threeMonthsAgo, 'yyyy-MM-dd');
      const endDate = format(today, 'yyyy-MM-dd');
      
      const transaksiResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppip/transaksi/${userData.username}?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState((prevState) => ({
        ...prevState,
        data: transaksiResponse.data.content
      }));

      const saldoResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppip/saldo/${userData.username}?end_date=${startDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const totalDana = saldoResponse.data.content[0].TOTAL_DANA;
      setSaldoSebelum(totalDana || 0);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message);
      } else {
        console.error('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };
  
  const fetchUser = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppip/peserta/${userData.username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState((prevState) => ({
        ...prevState,
        dataUser: user.data.content
      }));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message);
      } else {
        console.error('Terjadi kesalahan. Silakan coba lagi.');
      }
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
    const headerWidth = 48;
    const headerHeight = 20;
    const headerX = 150;
    const headerY = 5;
    doc.addImage(DPLK, 'PNG', headerX, headerY, headerWidth, headerHeight);

    const tanggalTransaksi = state.data
      .map(item => item.TGL_TRANSAKSI)
      .filter(Boolean)
      .sort((a, b) => new Date(a) - new Date(b));

    const tanggalAwal = tanggalTransaksi[0] || '-';
    const tanggalAkhir = tanggalTransaksi[tanggalTransaksi.length - 1] || '-';
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
    // Tambahkan judul pada PDF
    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(14);
    doc.text('Riwayat Transaksi /', 15, 30, null, null, 'left');

    doc.setFont('helvetica', 'italic'); 
    doc.setFontSize(14);
    doc.text('Statement of Account', 62, 30, null, null, 'left');

    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(12);
    doc.text(`Periode: ${formatDate(tanggalAwal)} - ${formatDate(tanggalAkhir)}`, 15, 35, null, null, 'left');
    
    doc.setFont('helvetica', 'bold'); 
    doc.setFontSize(12);
    doc.text(
      `${state.dataUser.map(item => item.nama_lengkap).join('\n')} (${state.dataUser.map(item => item.no_peserta).join('\n')})`, 15, 50, { align: 'left' }
    );  

    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(10);
    doc.text(
      `${state.dataUser.map(item => (item.alamat_jalan ? item.alamat_jalan : '-')).join('\n')}`, 15, 55, { align: 'left' }
    );  

    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(10);
    doc.text(
      `RT/RW ${state.dataUser.map(item => (item.alamat_rtrw ? item.alamat_rtrw : '-')).join('\n')}`, 15, 60, { align: 'left' }
    );  

    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(10);
    doc.text(
      `${state.dataUser.map(item => (item.alamat_kelurahan ? item.alamat_kelurahan : '-')).join('\n')}, ${state.dataUser.map(item => (item.ALAMAT_KECAMATAN ? item.ALAMAT_KECAMATAN : '-')).join('\n')}`, 15, 65, { align: 'left' }
    );   

    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(10);
    doc.text(
      `${state.dataUser.map(item => (item.alamat_kota ? item.alamat_kota : '-')).join('\n')}, ${state.dataUser.map(item => (item.ALAMAT_PROPINSI ? item.ALAMAT_PROPINSI : '-')).join('\n')}`, 15, 70, { align: 'left' }
    );

    doc.setFont('helvetica', 'normal'); 
    doc.setFontSize(10);
    doc.text(
      `${state.dataUser.map(item => (item.alamat_kode_pos ? item.alamat_kode_pos : '-')).join('\n')}`, 15, 75, { align: 'left' }
    );

    let saldoSebelumPDF = saldoSebelum;
  
    // Tambahkan tabel dengan menggunakan AutoTable
    doc.autoTable({
      headStyles: { fillColor: '#D7A1FF', textColor: [255, 255, 255], fontStyle: 'bold' },
      margin: { top: 30 },
      startY: 80,
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
    doc.save(`${state.dataUser.map(item => item.no_peserta)}_statement_${formattedDate}.pdf`);
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
