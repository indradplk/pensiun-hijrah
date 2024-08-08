import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import {
  OfficeContainer,
  OfficeWrapper,
  BtnLink,
  EditLink,
  DeleteLink
} from './OfficeElements';
import '../../../../style.css';
import {
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import EditOfficeForm from './Form/Edit';
import AddOfficeForm from './Form/Add';
import DeleteOfficeForm from './Form/Delete';
import { dataServer } from '../../../DataServer';

const Office = () => {
  const [state, setState] = useState({
    data: [],
    activePage: 1,
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showAddForm: false,
    showDeleteForm: false,
    editData: {
      id: null,
      nama: '',
      cabang: '',
      area: '',
      alamat: '',
      kota: '',
      provinsi: '',
      kodepos: '',
      telepon: '',
      kategori: '',
      status: ''
    },
    addData: {
      nama: '',
      cabang: '',
      area: '',
      alamat: '',
      kota: '',
      provinsi: '',
      kodepos: '',
      telepon: '',
      kategori: ''
    },
    deleteData: {
      id: null
    }
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

  const fetchData = (pageNumber) => {
    axios
      .get(`${dataServer.href}/api/v1/office?page=${pageNumber}`)
      .then((res) => {
        const modifiedData = res.data.map((item) => ({
          ...item,
          status: item.status ? 'Aktif' : 'Nonaktif'
        }));
        setState((prev) => ({
          ...prev,
          data: modifiedData
        }));
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));
    fetchData(pageNumber);
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

  return (
    <OfficeContainer id="office">
      <EditOfficeForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />
      <AddOfficeForm
        show={state.showAddForm}
        handleClose={handleCloseAddForm}
        addData={state.addData}
        handleAddInputChange={handleAddInputChange}
        handleAddSubmit={handleAddSubmit}
      />
      <DeleteOfficeForm
        show={state.showDeleteForm}
        handleClose={handleCloseDeleteForm}
        deleteData={state.deleteData}
        handleDeleteSubmit={handleDeleteSubmit}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <OfficeWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="office">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Kota</th>
                  <th>Provinsi</th>
                  <th>Kode Pos</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.kota}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.kodepos}</td>
                    <td>{item.kategori}</td>
                    <td>{item.status}</td>
                    <td>
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)}>
                        <FaEdit/>
                      </EditLink>
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.id)}>
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </OfficeWrapper>
          <Pagination className="px-4">
            {state.data.map((_, index) => (
              <Pagination.Item
                onClick={() => handlePageChange(index + 1)}
                key={index + 1}
                active={index + 1 === state.activePage}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan nama dan status jika tampilan mobile
        <>
          <OfficeWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="office">
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
                      <EditLink to="#" onClick={() => handleShowEditForm(item.id)}>
                        <FaEdit/>
                      </EditLink>
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.id)}>
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </OfficeWrapper>
          <Pagination className="px-4">
            {state.data.map((_, index) => (
              <Pagination.Item
                onClick={() => handlePageChange(index + 1)}
                key={index + 1}
                active={index + 1 === state.activePage}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </OfficeContainer>
  );
};

export default Office;
