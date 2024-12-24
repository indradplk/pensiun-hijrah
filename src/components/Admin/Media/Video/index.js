import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';
import {
  VideoContainer,
  VideoWrapper,
  BtnLink,
  EditLink,
  DeleteLink,
  ChangeLink
} from './VideoElements';
import '../../../../style.css';
import {
  FaEdit,
  FaTrash,
  FaCheck
} from 'react-icons/fa';
import EditVideoForm from './Form/Edit';
import AddVideoForm from './Form/Add';
import DeleteVideoForm from './Form/Delete';
import AccVideoForm from './Form/Acc';

const Video = ({ userData }) => {
  const [dataUser, setUser] = useState({});
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showAddForm: false,
    showDeleteForm: false,
    editData: {
      id: null,
      title: '',
      link: '',
      status: ''
    },
    addData: {
      title: '',
      link: '',
    },
    deleteData: {
      id: null
    },
    accData: {
      id: null,
      title: ''
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
      .get(process.env.REACT_APP_API_BASE_URL + '/video')
      .then((res) => {
        const sortedData = res.data.content.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        const modifiedData = sortedData.map((item) => ({
          ...item,
          status: item.status ? 'Aktif' : 'Nonaktif'
        }));
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

  const handleShowAddForm = () => {
    setState((prev) => ({
      ...prev,
      showAddForm: true
    }));
  };

  const handleShowDeleteForm = (id) => {
    const dataToDelete = state.data.find((item) => item.id === id);
    if (dataToDelete) {
      setState((prev) => ({
        ...prev,
        showDeleteForm: true,
        deleteData: dataToDelete,
      }));
    } else {
      console.log('Data tidak ditemukan!');
    }
  };

  const handleShowAccForm = (id) => {
    const dataToAccept = state.data.find((item) => item.id === id);
    if (dataToAccept) {
      setState((prev) => ({
        ...prev,
        showAcceptForm: true,
        accData: dataToAccept,
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

  const handleCloseAddForm = () => {
    setState((prev) => ({
      ...prev,
      showAddForm: false
    }));
  };

  const handleCloseDeleteForm = () => {
    setState((prev) => ({
      ...prev,
      showDeleteForm: false
    }));
  };

  const handleCloseAcceptForm = () => {
    setState((prev) => ({
      ...prev,
      showAcceptForm: false
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

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      addData: {
        ...prev.addData,
        [name]: value,
      },
    }));
  };

  const handleEditSubmit = () => {
    console.log('Data edited:', state.editData);
    handleCloseEditForm();
  };

  const handleAddSubmit = () => {
    console.log('Data added:', state.addData);
    handleCloseAddForm();
  };

  const handleDeleteSubmit = () => {
    console.log('Data deleted:', state.deleteData);
    handleCloseDeleteForm();
  };

  const handleAcceptSubmit = () => {
    console.log('Data accepted:', state.accData);
    handleCloseAcceptForm();
  };

  return (
    <VideoContainer id="video">
      <EditVideoForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />
      <AddVideoForm
        show={state.showAddForm}
        handleClose={handleCloseAddForm}
        addData={state.addData}
        handleAddInputChange={handleAddInputChange}
        handleAddSubmit={handleAddSubmit}
      />
      <DeleteVideoForm
        show={state.showDeleteForm}
        handleClose={handleCloseDeleteForm}
        deleteData={state.deleteData}
        handleDeleteSubmit={handleDeleteSubmit}
      />
      <AccVideoForm
        show={state.showAcceptForm}
        handleClose={handleCloseAcceptForm}
        accData={state.accData}
        handleAcceptSubmit={handleAcceptSubmit}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <VideoWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="video">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kode Link YouTube</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.link}</td>
                    <td>{item.status}</td>
                    <td>
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Edit">
                        <FaEdit/>
                      </EditLink>
                      {dataUser.role !== 'operator' && item.status !== 'Aktif' && (
                        <ChangeLink to="#" onClick={() => handleShowAccForm(item.id)} title="Approve">
                          <FaCheck/>
                        </ChangeLink>
                      )}
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.id)} title="Delete">
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </VideoWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan title dan status jika tampilan mobile
        <>
          <VideoWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="video">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.status}</td>
                    <td>
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Edit">
                        <FaEdit/>
                      </EditLink>
                      {dataUser.role !== 'operator' && item.status !== 'Aktif' && (
                        <ChangeLink to="#" onClick={() => handleShowAccForm(item.id)} title="Approve">
                          <FaCheck/>
                        </ChangeLink>
                      )}
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.id)} title="Delete">
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </VideoWrapper>
        </>
      )}
    </VideoContainer>
  );
};

export default Video;
