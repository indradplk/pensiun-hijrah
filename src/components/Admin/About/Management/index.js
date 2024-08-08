import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import {
  ManagementContainer,
  ManagementWrapper,
  BtnLink,
  EditLink,
  DeleteLink,
  ChangeLink,
  Text,
  ManagementP
} from './ManagementElements';
import '../../../../style.css';
import {
  FaEdit,
  FaTrash,
  FaFileImage,
  FaCheck
} from 'react-icons/fa';
import EditManagementForm from './Form/Edit';
import AddManagementForm from './Form/Add';
import DeleteManagementForm from './Form/Delete';
import AccManagementForm from './Form/Acc';
import { dataServer } from '../../../DataServer';

const Management = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showAddForm: false,
    showDeleteForm: false,
    editData: {
      id: null,
      nama: '',
      jabatan: '',
      path_management: '',
      description: '',
      kategori: '',
      status: ''
    },
    addData: {
      nama: '',
      jabatan: '',
      path_management: '',
      description: '',
      kategori: ''
    },
    deleteData: {
      id: null
    },
    accData: {
      id: null,
      nama: ''
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
      .get(`${dataServer.href}/api/v1/management`)
      .then((res) => {
        const modifiedData = res.data.map((item) => ({
          ...item,
          kategori: convertKategori(item.kategori),
          status: item.status ? 'Aktif' : 'Nonaktif'
        }));
        setState((prev) => ({
          ...prev,
          data: modifiedData
        }));
      })
      .catch((error) => console.log(error));
  };
  
  const convertKategori = (kategori) => {
    switch (kategori) {
      case 'dps':
        return 'Dewan Pengawas Syariah';
      case 'pengurus':
        return 'Pengurus';
      case 'pengawas':
        return 'Dewan Pengawas';
      default:
        return kategori;
    }
  };
  
  const handleDownload = (path) => {
    window.open(`${dataServer.href}/about/manajemen/${path}`, '_blank');
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
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setState((prev) => ({
        ...prev,
        editData: {
          ...prev.editData,
          [name]: files[0],
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        editData: {
          ...prev.editData,
          [name]: value,
        },
      }));
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setState((prev) => ({
        ...prev,
        addData: {
          ...prev.addData,
          [name]: files[0],
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        addData: {
          ...prev.addData,
          [name]: value,
        },
      }));
    }
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
    <ManagementContainer id="management">
      <EditManagementForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
        userData={userData}
      />
      <AddManagementForm
        show={state.showAddForm}
        handleClose={handleCloseAddForm}
        addData={state.addData}
        handleAddInputChange={handleAddInputChange}
        handleAddSubmit={handleAddSubmit}
        userData={userData}
      />
      <DeleteManagementForm
        show={state.showDeleteForm}
        handleClose={handleCloseDeleteForm}
        deleteData={state.deleteData}
        handleDeleteSubmit={handleDeleteSubmit}
        userData={userData}
      />
      <AccManagementForm
        show={state.showAcceptForm}
        handleClose={handleCloseAcceptForm}
        accData={state.accData}
        handleAcceptSubmit={handleAcceptSubmit}
        userData={userData}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <ManagementWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="management">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>Gambar</th>
                  <th>Deskripsi</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.jabatan}</td>
                    <td>
                      <Text to="#" onClick={() => handleDownload(item.path_management)}>
                        <FaFileImage/>  
                      </Text>
                    </td>
                    <td>
                      <ManagementP dangerouslySetInnerHTML={{ __html: item.description }} />
                    </td>
                    <td>{item.kategori}</td>
                    <td>{item.status}</td>
                    <td>
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Edit">
                        <FaEdit/>
                      </EditLink>
                      {userData.role !== 'operator' && item.status !== 'Aktif' && (
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
          </ManagementWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <ManagementWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="management">
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
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Edit">
                        <FaEdit/>
                      </EditLink>{userData.role !== 'operator' && item.status !== 'Aktif' && (
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
          </ManagementWrapper>
        </>
      )}
    </ManagementContainer>
  );
};

export default Management;
