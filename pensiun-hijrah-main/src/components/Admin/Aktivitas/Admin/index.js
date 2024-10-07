import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';
import { AktivitasContainer, AktivitasWrapper, BtnLink, BtnLoad, FormInput } from '../AktivitasElements';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../../../../style.css';

const AktivitasAdmin = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({
    data: [],
    filteredData: [],
    visibleData: 10,
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    searchQuery: ''
  });

  useEffect(() => {
    fetchData();
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

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/log/admin', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const reversedData = response.data.content.reverse();
        setState((prev) => ({
          ...prev,
          data: reversedData,
          filteredData: reversedData,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const exportToExcel = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/log/admin', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.content;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Aktivitas Admin');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'aktivitas_admin.xlsx');
      })
      .catch((error) => console.log(error));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = state.data.filter(item => item.log.toLowerCase().includes(query));
    setState(prev => ({
      ...prev,
      searchQuery: query,
      filteredData: filteredData
    }));
  };
  

  const handleLoadMore = () => {
    setState((prev) => ({
      ...prev,
      visibleData: state.visibleData + 10,
    }));
  };

  return (
    <AktivitasContainer id="aktivitas">
      <BtnLink to="#" onClick={exportToExcel}>Download Aktivitas Admin</BtnLink>
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <FormInput name="searchQuery" type="text" placeholder="Cari berdasarkan nama..." value={state.searchQuery} onChange={handleSearchChange} />
          <AktivitasWrapper>
            <Table striped bordered hover className="aktivitas">
              <thead>
                <tr>
                  <th>NIK</th>
                  <th>Aktivitas</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
              {state.filteredData.slice(0, state.visibleData).map((item) => (
                <tr key={item.id}>
                  <td>{item.nik}</td>
                  <td>{item.log}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </AktivitasWrapper>
          {state.visibleData < state.data.length && (
            <BtnLoad to="#" onClick={handleLoadMore}>
              Muat Lebih Banyak
            </BtnLoad>
          )}
        </>
      )}
    </AktivitasContainer>
  );
};

export default AktivitasAdmin;
