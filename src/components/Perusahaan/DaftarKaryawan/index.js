import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import { KaryawanContainer, KaryawanWrapper, KaryawanH1, FormInput } from './KaryawanElements';
import '../../../style.css';
import { format, parse } from 'date-fns';
import { id } from 'date-fns/locale/id';

const DaftarKaryawan = ({ userData }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({
    data: [],
    filteredData: [],
    isMobile: false,
    searchQuery: ''
  });

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
  }, [userData.username]);

  const fetchData = async () => {
    try {      
      const karyawan = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppukp/daftar-karyawan/${userData.username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState((prevState) => ({
        ...prevState,
        data: karyawan.data.content,
        filteredData: karyawan.data.content
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
    try {
      const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
      return format(parsedDate, 'dd MMM yyyy', { locale: id });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = state.data.filter(item => item.NAMA_LENGKAP.toLowerCase().includes(query));
    setState(prev => ({
      ...prev,
      searchQuery: query,
      filteredData: filteredData
    }));
  };

  return (
    <KaryawanContainer id="karyawan">
      <KaryawanH1><b>Daftar Peserta</b></KaryawanH1>
      <FormInput name="searchQuery" type="text" placeholder="Cari berdasarkan nama..." value={state.searchQuery} onChange={handleSearchChange} />
      {!state.isMobile && state.data && state.data.length > 0 && (
        <KaryawanWrapper>
            <Table striped bordered hover className="karyawan">
              <thead>
                <tr>
                  <th>Nomor Peserta</th>
                  <th>Nama Lengkap</th>
                  <th>Tanggal Lahir</th>
                  <th>Tanggal Registrasi</th>
                  <th>KTP</th>
                  <th>NPWP</th>
                  <th>Kode Paket</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {state.filteredData.map((item) => {
                return (
                  <tr key={item.no_peserta}>
                    <td>{item.no_peserta}</td>
                    <td>{item.NAMA_LENGKAP}</td>
                    <td>{formatDate(item.TANGGAL_LAHIR) ? formatDate(item.TANGGAL_LAHIR) : ''}</td>
                    <td>{formatDate(item.TGL_REGISTRASI)}</td>
                    <td>{item.NO_IDENTITAS_DIRI}</td>
                    <td>{item.NPWP}</td>
                    <td>{item.kode_paket_investasi}</td>
                    <td>{item.STATUS_DPLK === 'A' ? 'Aktif' : item.STATUS_DPLK === 'N' ? 'Nonaktif' : 'Tidak Diketahui'}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
        </KaryawanWrapper>
      )}
      {state.isMobile && state.data && state.data.length > 0 && (
        <KaryawanWrapper>
            <Table striped bordered hover className="karyawan-mobile">
              <thead>
                <tr>
                  <th>Nomor Peserta</th>
                  <th>Nama Lengkap</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {state.filteredData.map((item) => {
                return (
                  <tr key={item.no_peserta}>
                    <td>{item.no_peserta}</td>
                    <td>{item.NAMA_LENGKAP}</td>
                    <td>{item.STATUS_DPLK === 'A' ? 'Aktif' : item.STATUS_DPLK === 'N' ? 'Nonaktif' : 'Tidak Diketahui'}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
        </KaryawanWrapper>
      )}
    </KaryawanContainer>
  );
};

export default DaftarKaryawan;
