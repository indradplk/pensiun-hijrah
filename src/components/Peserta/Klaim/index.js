import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { KlaimContainer, KlaimWrapper, KlaimH1 } from './KlaimElements';
import '../../../style.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { dataServer } from '../../DataServer';

const Klaim = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: false // Default nilai isMobile false
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
  }, [userData.userId]);

  const fetchData = async () => {
    try {
      const klaimResponse = await axios.get(`${dataServer.href}/api/v1/mdplk/klaim/${userData.userId}`);
      setState((prevState) => ({
        ...prevState,
        data: klaimResponse.data
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
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
      {!state.isMobile && state.data && state.data.length > 0 && (
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
      {state.isMobile && state.data && state.data.length > 0 && (
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
    </KlaimContainer>
  );
};

export default Klaim;
