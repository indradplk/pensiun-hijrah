import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { BranchContainer, BranchWrapper, BranchH1, BtnLink, BtnLoad, FormInput } from './BranchElements';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import '../../../style.css';

const Branch = () => {
  const [state, setState] = useState({
    data: [],
    filteredData: [],
    visibleData: 15,
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
    .get(process.env.REACT_APP_API_BASE_URL + '/office?status=true')
      .then((res) => {
        setState((prev) => ({
          ...prev,
          data: res.data.content,
          filteredData: res.data.content
        }));
      })
      .catch((error) => console.log(error));
  };

  const exportToExcel = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/office?status=true')
      .then((res) => {
        const data = res.data.content;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Branch Location');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'branch_location.xlsx');
      })
      .catch((error) => console.log(error));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = state.data.filter(item => item.alamat.toLowerCase().includes(query));
    setState(prev => ({
      ...prev,
      searchQuery: query,
      filteredData: filteredData
    }));
  };
  

  const handleLoadMore = () => {
    setState((prev) => ({
      ...prev,
      visibleData: state.visibleData + 15,
    }));
  };

  return (
    <BranchContainer id="branch">
      <BranchH1><b>Lokasi Kantor Cabang</b></BranchH1>
      <BtnLink to="#" onClick={exportToExcel}>Download Lokasi Kantor Cabang</BtnLink>
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <FormInput name="searchQuery" type="text" placeholder="Cari berdasarkan nama kota..." value={state.searchQuery} onChange={handleSearchChange} />
          <BranchWrapper>
            <Table striped bordered hover className="branch">
              <thead>
                <tr>
                  <th>Nama Cabang</th>
                  <th>Cabang Induk</th>
                  <th>Area</th>
                  <th>Alamat</th>
                  <th>Telepon</th>
                </tr>
              </thead>
              <tbody>
              {state.filteredData.slice(0, state.visibleData).map((item) => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>{item.cabang}</td>
                  <td>{item.area}</td>
                  <td>{item.alamat}</td>
                  <td>{item.telepon}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </BranchWrapper>
          {state.visibleData < state.data.length && (
            <BtnLoad to="#" onClick={handleLoadMore}>
              Muat Lebih Banyak
            </BtnLoad>
          )}
        </>
      )}
    </BranchContainer>
  );
};

export default Branch;
