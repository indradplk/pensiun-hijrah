import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import {
  RegistrasiContainer,
  RegistrasiWrapper,
  EditLink,
  DeleteLink,
  ViewLink
} from './RegistrasiElements';
import '../../../style.css';
import {
  FaEye,
  FaCheck,
  FaWindowClose
} from 'react-icons/fa';
import ApproveForm from './Form/Approved';
import RejectForm from './Form/Rejected';
import { animateScroll as scroll } from 'react-scroll';

const Registrasi = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showRejectForm: false,
    editData: {
      id: null,
      no_peserta: '',
      email: ''
    },
    rejectData: {
      id: null,
      email: ''
    },
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
      .get(process.env.REACT_APP_API_BASE_URL + `/registrasi`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sortedData = response.data.content.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        
        const modifiedData = sortedData.map((item) => {
          let statusText;
          if (item.status === null || item.status === '') {
            statusText = 'Belum diproses';
          } else if (item.status === true || item.status === 1) {
            statusText = 'Disetujui';
          } else if (item.status === false || item.status === 0) {
            statusText = 'Ditolak';
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
      .catch((error) => {
        console.error(error.response.data.message);
      });
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

  const handleShowRejectForm = (id) => {
    const dataToReject = state.data.find((item) => item.id === id);
    if (dataToReject) {
      setState((prev) => ({
        ...prev,
        showRejectForm: true,
        rejectData: dataToReject,
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

  const handleCloseRejectForm = () => {
    setState((prev) => ({
      ...prev,
      showRejectForm: false
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      editData: {
        ...prev.editData,
        [name]: value,
      },
    }));
  };

  const handleRejectInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      rejectData: {
        ...prev.rejectData,
        [name]: value,
      },
    }));
  };

  const handleEditSubmit = () => {
    console.log('Data edited:', state.editData);
    handleCloseEditForm();
  };

  const handleRejectSubmit = () => {
    console.log('Data edited:', state.rejectData);
    handleCloseRejectForm();
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <RegistrasiContainer id="registrasi">
      <ApproveForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />
      <RejectForm
        show={state.showRejectForm}
        handleClose={handleCloseRejectForm}
        rejectData={state.rejectData}
        handleRejectInputChange={handleRejectInputChange}
        handleRejectSubmit={handleRejectSubmit}
        userData={userData}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <RegistrasiWrapper>
            <Table striped bordered hover className="registrasi">
              <thead>
                <tr>
                  <th>Nomor Peserta</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Tanggal Registrasi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.no_peserta}</td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      {item.status === 'Belum diproses' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Approve">
                            <FaCheck />
                          </EditLink>
                          <DeleteLink to="#" onClick={() => handleShowRejectForm(item.id)} title="Reject">
                            <FaWindowClose />
                          </DeleteLink>
                        </>
                      )}
                      {item.status === 'Disetujui' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                        </>
                      )}
                      {item.status === 'Ditolak' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Approve">
                            <FaCheck />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </RegistrasiWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <RegistrasiWrapper>
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
                      {item.status === 'Belum diproses' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Approve">
                            <FaCheck />
                          </EditLink>
                          <DeleteLink to="#" onClick={() => handleShowRejectForm(item.id)} title="Reject">
                            <FaWindowClose />
                          </DeleteLink>
                        </>
                      )}
                      {item.status === 'Disetujui' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                        </>
                      )}
                      {item.status === 'Ditolak' && (
                        <>
                          <ViewLink to={`/admin/peserta/registrasi/${item.id}`} onClick={toggleHome} title="View">
                            <FaEye/>
                          </ViewLink>
                          <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Approve">
                            <FaCheck />
                          </EditLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </RegistrasiWrapper>
        </>
      )}
    </RegistrasiContainer>
  );
};

export default Registrasi;
