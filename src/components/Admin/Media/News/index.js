import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import {
  NewsContainer,
  NewsWrapper,
  BtnLink,
  EditLink,
  DeleteLink,
  ChangeLink,
  Text,
  NewsP
} from './NewsElements';
import '../../../../style.css';
import {
  FaEdit,
  FaTrash,
  FaFileImage,
  FaCheck
} from 'react-icons/fa';
import EditNewsForm from './Form/Edit';
import AddNewsForm from './Form/Add';
import DeleteNewsForm from './Form/Delete';
import AccNewsForm from './Form/Acc';
import { dataServer } from '../../../DataServer';

const News = ({ userData }) => {
  const [state, setState] = useState({
    data: [],
    isMobile: window.innerWidth <= 820, // Menentukan apakah tampilan saat ini adalah mobile
    showEditForm: false,
    showAddForm: false,
    showDeleteForm: false,
    editData: {
      seo: null,
      title: '',
      path_news: '',
      description: '',
      kategori: '',
      status: ''
    },
    addData: {
      title: '',
      path_news: '',
      description: '',
      kategori: ''
    },
    deleteData: {
      seo: null
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

  const handleWindowSizeChange = () => {
    setState((prev) => ({
      ...prev,
      isMobile: window.innerWidth <= 820 // Mengupdate status isMobile saat terjadi perubahan ukuran layar
    }));
  };

  const fetchData = () => {
    axios
      .get(`${dataServer.href}/api/v1/news`)
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
      case 'artikel':
        return 'Artikel';
      case 'berita':
        return 'Berita';
      default:
        return kategori;
    }
  };
  
  const handleDownload = (path) => {
    window.open(`${dataServer.href}/media/berita/${path}`, '_blank');
  };

  const handleShowEditForm = (seo) => {
    const dataToEdit = state.data.find((item) => item.seo === seo);
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

  const handleShowDeleteForm = (seo) => {
    const dataToDelete = state.data.find((item) => item.seo === seo);
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
    <NewsContainer id="news">
      <EditNewsForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
        userData={userData}
      />
      <AddNewsForm
        show={state.showAddForm}
        handleClose={handleCloseAddForm}
        addData={state.addData}
        handleAddInputChange={handleAddInputChange}
        handleAddSubmit={handleAddSubmit}
        userData={userData}
      />
      <DeleteNewsForm
        show={state.showDeleteForm}
        handleClose={handleCloseDeleteForm}
        deleteData={state.deleteData}
        handleDeleteSubmit={handleDeleteSubmit}
        userData={userData}
      />
      <AccNewsForm
        show={state.showAcceptForm}
        handleClose={handleCloseAcceptForm}
        accData={state.accData}
        handleAcceptSubmit={handleAcceptSubmit}
        userData={userData}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <NewsWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="news">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Gambar</th>
                  <th>Deskripsi</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.seo}>
                    <td>{item.title}</td>
                    <td>
                      <Text to="#" onClick={() => handleDownload(item.path_news)}>
                        <FaFileImage/>  
                      </Text>
                    </td>
                    <td>
                      <NewsP dangerouslySetInnerHTML={{ __html: item.description }} />
                    </td>
                    <td>{item.kategori}</td>
                    <td>{item.status}</td>
                    <td>
                      <EditLink to="#" onClick={() => handleShowEditForm(item.seo)} title="Edit">
                        <FaEdit/>
                      </EditLink>
                      {userData.role !== 'operator' && item.status !== 'Aktif' && (
                        <ChangeLink to="#" onClick={() => handleShowAccForm(item.id)} title="Approve">
                          <FaCheck/>
                        </ChangeLink>
                      )}
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.seo)} title="Delete">
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </NewsWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan title dan status jika tampilan mobile
        <>
          <NewsWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="news">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.seo}>
                    <td>{item.title}</td>
                    <td>{item.status}</td>
                    <td>
                    <EditLink to="#" onClick={() => handleShowEditForm(item.seo)} title="Edit">
                        <FaEdit/>
                      </EditLink>
                      {userData.role !== 'operator' && item.status !== 'Aktif' && (
                        <ChangeLink to="#" onClick={() => handleShowAccForm(item.id)} title="Approve">
                          <FaCheck/>
                        </ChangeLink>
                      )}
                      <DeleteLink to="#" onClick={() => handleShowDeleteForm(item.seo)} title="Delete">
                        <FaTrash/>
                      </DeleteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </NewsWrapper>
        </>
      )}
    </NewsContainer>
  );
};

export default News;
