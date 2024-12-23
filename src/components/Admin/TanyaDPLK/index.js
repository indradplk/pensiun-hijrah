import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { Table } from 'react-bootstrap';
import {
  TanyaDPLKContainer,
  TanyaDPLKWrapper,
  EditLink
} from './TanyaDPLKElements';
import '../../../style.css';
import {
  FaEdit
} from 'react-icons/fa';
import ApproveForm from './Form/Approved';

const TanyaDPLK = ({userData}) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [dataUser, setUser] = useState({});
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showRejectForm: false,
    editData: {
      id: null,
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

  useEffect(() => {
    fetchAdmin();
  }, [userData.username]);

  const handleWindowSizeChange = () => {
    setState((prev) => ({
      ...prev,
      isMobile: window.innerWidth <= 820 // Mengupdate status isMobile saat terjadi perubahan ukuran layar
    }));
  };

  const fetchAdmin = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/admin/${userData.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/tanya-dplk', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const sortedData = res.data.content.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        const modifiedData = sortedData.map((item) => {
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
      .catch((error) => console.log(error.response.data.message));
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
    handleCloseEditForm();
  };

  return (
    <TanyaDPLKContainer id="tanya-dplk">
      <ApproveForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditSubmit={handleEditSubmit}
        userData={userData}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <TanyaDPLKWrapper>
            <Table striped bordered hover className="tanya-dplk">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Nomor Telepon/Hp</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                  <th>Tanggal Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.no_telp}</td>
                    <td>{item.text}</td>
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
          </TanyaDPLKWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <TanyaDPLKWrapper>
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
                    <td>{item.name}</td>
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
          </TanyaDPLKWrapper>
        </>
      )}
    </TanyaDPLKContainer>
  );
};

export default TanyaDPLK;
