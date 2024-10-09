import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import {
  PaketInvestasiContainer,
  PaketInvestasiWrapper,
  EditLink,
} from './PaketInvestasiElements';
import '../../../style.css';
import {
  FaCheck,
} from 'react-icons/fa';
import SuccessModal from '../Modal/Success';

const PerubahanPaketInvestasi = () => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      .get(process.env.REACT_APP_API_BASE_URL + `/mdplk/ubah-paket-investasi`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const modifiedData = response.data.content.map((item) => {
          let statusText;
          if (item.flag === 'F') {
            statusText = 'Belum Diproses';
          } else if (item.flag === 'T') {
            statusText = `Disetujui oleh ${item.useradd}`;
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

  const handleApprove = async (noPeserta, paketInvestasi) => {
    try {
      // Jalankan API pertama
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + `/ppip/paket-investasi/${noPeserta}`,
        { paket_investasi: paketInvestasi },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Jalankan API kedua
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + `/mdplk/approve/paket-investasi/${noPeserta}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Tampilkan modal sukses setelah berhasil
      setShowSuccessModal(true);
      
      // Refresh data setelah approve
      fetchData();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <PaketInvestasiContainer id="paket-investasi">
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <PaketInvestasiWrapper>
            <Table striped bordered hover className="paket-investasi">
              <thead>
                <tr>
                  <th>Nomor Peserta</th>
                  <th>Nama</th>
                  <th>Paket Investasi Awal</th>
                  <th>Paket Investasi Baru</th>
                  <th>Status</th>
                  <th>Tanggal Diajukan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.no_peserta}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.kode_paket_lama}</td>
                    <td>{item.kode_paket_baru}</td>
                    <td>{item.flag}</td>
                    <td>{item.dateadd}</td>
                    <td>
                      {item.flag === 'Belum Diproses' && (
                        <>
                          <EditLink to="#" title="Approve" onClick={() => handleApprove(item.no_peserta, item.kode_paket_baru)}>
                            <FaCheck />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PaketInvestasiWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <PaketInvestasiWrapper>
            <Table striped bordered hover className="paket-investasi">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Paket Investasi Baru</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.kode_paket_baru}</td>
                    <td>
                      {item.flag === 'Belum Diproses' && (
                        <>
                          <EditLink to="#" title="Approve" onClick={() => handleApprove(item.no_peserta, item.kode_paket_baru)}>
                            <FaCheck />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PaketInvestasiWrapper>
        </>
      )}
      <SuccessModal 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)} 
        message="Paket investasi berhasil disetujui!" 
      />
    </PaketInvestasiContainer>
  );
};

export default PerubahanPaketInvestasi;
