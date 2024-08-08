import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { ProductContainer, ProductWrapper, ProductH1, ProductP, BtnLink } from './ProductElements';
import '../../../style.css';
import { dataServer } from '../../DataServer';

const Product = () => {
  const [state, setState] = useState({
    data: [],
    activePage: 1,
    isMobile: window.innerWidth <= 820 // Menentukan apakah tampilan saat ini adalah mobile
  });

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange); // Menambahkan event listener untuk menghandle perubahan ukuran layar
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange); // Membersihkan event listener saat komponen dilepas
    };
  }, []);

  const handleWindowSizeChange = () => {
    setState((prev) => ({
      ...prev,
      isMobile: window.innerWidth <= 820 // Mengupdate status isMobile saat terjadi perubahan ukuran layar
    }));
  };

  const handleDownload = () => {
    window.open(`${dataServer.href}/bantuan/panduan/ab63370e-251b-490a-a0c5-581868b8378d.pdf`, '_blank');
  };

  return (
    <ProductContainer id="product">
      <ProductH1><b>Detail Produk</b></ProductH1>
      <BtnLink to='#' onClick={handleDownload}>Lihat Selengkapnya!</BtnLink>
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <ProductWrapper>
            <Table striped bordered hover className="product">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Pensiun Hijrah</th>
                  <th>Pensiun Hijrah Pasca Kerja</th>
                  <th>Pensiun Hijrah Eksekutif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Akad</b></td>
                  <td>Wakalah Bil Ujroh</td>
                  <td>Hibah Bi Syarthin & Wakalah Bil Ujroh</td>
                  <td>Wakalah Bil Ujroh</td>
                </tr>
                <tr>
                  <td><b>Peserta</b></td>
                  <td>Karyawan (Pekerja)</td>
                  <td>Karyawan (Pekerja)</td>
                  <td>Direksi, Dewan Komisaris, Pengurus Yayasan</td>
                </tr>
                <tr>
                  <td><b>Kepemilikan Rekening DPLK</b></td>
                  <td>Peserta (Individu)</td>
                  <td>Perusahaan/Badan</td>
                  <td>Peserta (Individu)</td>
                </tr>
                <tr>
                  <td><b>Sumber Iuran</b></td>
                  <td>Kombinasi (Pemberi Kerja + Pekerja), Hanya Pemberi Kerja, Hanya Pekerja</td>
                  <td>Pemberi Kerja (Perusahaan)</td>
                  <td>Pemberi Kerja (Perusahaan)</td>
                </tr>
                <tr>
                  <td><b>Besaran Iuran</b></td>
                  <td>Sukarela Pribadi, Kebijakan Perusahaan</td>
                  <td>Kebijakan Perusahaan</td>
                  <td>Kebijakan Perusahaan (Maksimal 25% dari Upah Setahun)</td>
                </tr>
                <tr>
                  <td><b>Mekanisme Iuran</b></td>
                  <td>Tunai, Transfer (ATM/Internet Banking), Autodebet</td>
                  <td>Tunai, Transfer (ATM/Internet Banking), Autodebet</td>
                  <td>Tunai, Transfer (ATM/Internet Banking), Autodebet</td>
                </tr>
                <tr>
                  <td><b>Manfaat Pensiun jika di atas Rp625.000.000 (Setelah Pajak)</b></td>
                  <td>20% Langsung Dibayarkan, 80% Mekanisme Anuitas*</td>
                  <td>100% Langsung Dibayarkan</td>
                  <td>20% Langsung Dibayarkan, 80% Mekanisme Anuitas*</td>
                </tr>
                <tr>
                  <td><b>Peruntukkan</b></td>
                  <td>Pembayaran Imbalan Pasca Kerja Sesuai UU Cipta Kerja No. 11/2020</td>
                  <td>Pembayaran MPUKP Sesuai UU Cipta Kerja No. 11/2020</td>
                  <td>Peraturan Menteri BUMN No. 04/MBU/2014</td>
                </tr>
              </tbody>
            </Table>
            <ProductP>*) Saat ini tidak berlaku di DPLK Syariah karena ketentuan baru POJK60/2020 terkait selama belum tersedianya anuitas syariah di Indonesia.</ProductP>
          </ProductWrapper>
        </>
      )}
    </ProductContainer>
  );
};

export default Product;
