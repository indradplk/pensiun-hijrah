import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import { KlaimContainer, KlaimWrapper, KlaimH1, KlaimP } from './KlaimElements';
import '../../../style.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

const Klaim = ({ userData }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({
    data: [],
    isMobile: false
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
      const klaimResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mdplk/klaim/${userData.username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState((prevState) => ({
        ...prevState,
        data: klaimResponse.data.content
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
    if (!dateString || typeof dateString !== 'string') {
      return '';
    }
  
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) {
      return '';
    }
  
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    return format(new Date(year, month - 1, day), 'dd MMM yyyy', { locale: id });
  };  

  return (
    <KlaimContainer id="klaim">
      <KlaimH1><b>Status Klaim Peserta</b></KlaimH1>
      {state.data.length === 0 ? (
        <KlaimP>Belum ada riwayat klaim yang dilakukan</KlaimP>
      ) : (
        <>
        {!state.isMobile && (
        <KlaimWrapper>
          <Table striped bordered hover className="klaim">
            <thead>
              <tr>
                <th>Tanggal Pengajuan</th>
                <th>Tanggal Otorisasi</th>
                <th>Jenis Pengajuan</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.tgl_input)}</td>
                  <td>{formatDate(item.tgl_otorisasi)}</td>
                  <td>{item.pengajuan}</td>
                  <td>{item.status}</td>
                  <td>{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </KlaimWrapper>  
        )}
        {state.isMobile && (
          <KlaimWrapper>
            <Table striped bordered hover className="klaim-mobile">
              <thead>
                <tr>
                  <th>Tanggal Pengajuan</th>
                  <th>Tanggal Otorisasi</th>
                  <th>Jenis Pengajuan</th>
                  <th>Status</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
              {state.data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{formatDate(item.tgl_input)}</td>
                    <td>{formatDate(item.tgl_otorisasi)}</td>
                    <td>{item.pengajuan}</td>
                    <td>{item.status}</td>
                    <td>{item.keterangan}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
          </KlaimWrapper>
        )}
        </>
      )}
    </KlaimContainer>
  );
};

export default Klaim;
