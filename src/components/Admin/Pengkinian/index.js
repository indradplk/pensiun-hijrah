import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import {
  PengkinianContainer,
  PengkinianWrapper,
  ViewLink
} from './PengkinianElements';
import {
  FaEye
} from 'react-icons/fa';
import '../../../style.css';
import { animateScroll as scroll } from 'react-scroll';

const Pengkinian = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
  });
  const cookies = new Cookies();
  const token = cookies.get('token');

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
      .get(process.env.REACT_APP_API_BASE_URL + `/mdplk/pengkinian-data?status=false`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedData = response.data.content.sort((a, b) => {
          const dateA = new Date(a.dateadd);
          const dateB = new Date(b.dateadd);
          return dateB - dateA;
        });

        const modifiedData = sortedData.map((item) => {
          let statusText;
          if (item.flag === 'F') {
            statusText = 'Belum diproses';
          } else if (item.flag === 'T') {
            statusText = 'Disetujui';
          }
          return {
            ...item,
            flag: statusText,
            dateadd: isValid(new Date(item.dateadd)) ? format(new Date(item.dateadd), 'dd MMMM yyyy', { locale: localeID }) : '',
          };
        });

        setState((prev) => ({
          ...prev,
          data: modifiedData
        }));
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <PengkinianContainer id="pengkinian">
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <PengkinianWrapper>
            <Table striped bordered hover className="Pengkinian">
              <thead>
                <tr>
                  <th>Nomor Peserta</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Tanggal Pengkinian</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id_pengkinian}>
                    <td>{item.no_peserta}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.email}</td>
                    <td>{item.flag}</td>
                    <td>{item.dateadd}</td>
                    <td>
                      <ViewLink to={`/admin/peserta/pengkinian-data/${item.id_pengkinian}`} onClick={toggleHome} title="View">
                        <FaEye/>
                      </ViewLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PengkinianWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <PengkinianWrapper>
            <Table striped bordered hover className="Pengkinian">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id_pengkinian}>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.flag}</td>
                    <td>
                      <ViewLink to={`/admin/peserta/pengkinian-data/${item.id_pengkinian}`} onClick={toggleHome} title="View">
                        <FaEye/>
                      </ViewLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PengkinianWrapper>
        </>
      )}
    </PengkinianContainer>
  );
};

export default Pengkinian;
