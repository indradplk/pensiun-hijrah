import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import {
  RegisPerusahaanContainer,
  RegisPerusahaanWrapper,
  EditLink
} from './RegisPerusahaanElements';
import '../../../style.css';
import {
  FaEdit
} from 'react-icons/fa';
import ApproveForm from './Form/Approved';
import { animateScroll as scroll } from 'react-scroll';
import { dataServer } from '../../DataServer';

const RegisPerusahaanPage = ({userData}) => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showRejectForm: false,
    editData: {
      id: null,
      nik: '',
      email: ''
    },
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
      .get(`${dataServer.href}/api/v1/registrasi-perusahaan`)
      .then((res) => {
        const modifiedData = res.data.map((item) => {
          let statusText;
          if (item.status === false || item.status === 0) {
            statusText = 'Belum direspon';
          } else if (item.status === true || item.status === 1) {
            statusText = 'Sudah direspon';
          }
          return {
            ...item,
            status: statusText,
            createdAt: isValid(new Date(item.createdAt)) ? format(new Date(item.createdAt), 'dd MMMM yyyy', { locale: localeID }) : '',
          };
        });
        setState((prev) => ({
          ...prev,
          data: modifiedData
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleShowEditForm = (id) => {
    const dataToEdit = state.data.find((item) => item.id === id);
    if (dataToEdit) {
      setState((prev) => ({
        ...prev,
        showEditForm: true,
        editData: dataToEdit,
      }));
    } else {
      console.log('Data tidak ditemukan!');
    }
  };

  const handleCloseEditForm = () => {
    setState((prev) => ({
      ...prev,
      showEditForm: false
    }));
  };

  const handleEditSubmit = () => {
    console.log('Data edited:', state.editData);
    handleCloseEditForm();
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <RegisPerusahaanContainer id="registrasi-perusahaan">
      <ApproveForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditSubmit={handleEditSubmit}
        userData={userData}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <RegisPerusahaanWrapper>
            <Table striped bordered hover className="registrasi-perusahaan">
              <thead>
                <tr>
                  <th>Nama Perusahaan</th>
                  <th>Nama Penanggung Jawab</th>
                  <th>Jabatan</th>
                  <th>Email</th>
                  <th>Nomor Telepon/Hp</th>
                  <th>Status</th>
                  <th>Tanggal Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.pic}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.email}</td>
                    <td>{item.no_telepon}</td>
                    <td>{item.status}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      {item.status === 'Belum direspon' && (
                        <>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)} >
                            <FaEdit />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </RegisPerusahaanWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <RegisPerusahaanWrapper>
            <Table striped bordered hover className="registrasi">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.status}</td>
                    <td>
                      {item.status === 'Belum direspon' && (
                        <>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)}>
                            <FaEdit />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </RegisPerusahaanWrapper>
        </>
      )}
    </RegisPerusahaanContainer>
  );
};

export default RegisPerusahaanPage;
