import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';
import {
  ReportContainer,
  ReportWrapper,
  BtnLink,
  EditLink,
  DeleteLink,
  ChangeLink,
  Text
} from './ReportElements';
import '../../../../style.css';
import {
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaCheck
} from 'react-icons/fa';
import EditReportForm from './Form/Edit';
import AddReportForm from './Form/Add';
import DeleteReportForm from './Form/Delete';
import AccReportForm from './Form/Acc';

const Report = ({ userData }) => {
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
      path_report: '',
      kategori: '',
      status: ''
    },
    addData: {
      title: '',
      path_report: '',
      kategori: ''
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
      .get(process.env.REACT_APP_API_BASE_URL + '/report')
      .then((res) => {
        const modifiedData = res.data.content.map((item) => ({
          ...item,
          kategori: convertKategori(item.kategori),
          status: item.status ? 'Aktif' : 'Nonaktif'
        }));
        setState((prev) => ({
          ...prev,
          data: modifiedData
        }));
      })
      .catch((error) => console.log(error.response.data.message));
  };
  
  const convertKategori = (kategori) => {
    switch (kategori) {
      case 'keuangan':
        return 'Laporan Keuangan';
      case 'pengawas':
        return 'Laporan Dewan Pengawas';
      case 'investasi':
        return 'Fund Fact Sheet';
      default:
        return kategori;
    }
  };
  
  const handleDownload = (path) => {
    window.open(`/report/${path}`, '_blank');
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
    console.log('Data deleteed:', state.deleteData);
    handleCloseDeleteForm();
  };

  const handleAcceptSubmit = () => {
    console.log('Data accepted:', state.accData);
    handleCloseAcceptForm();
  };

  return (
    <ReportContainer id="report">
      <EditReportForm
        show={state.showEditForm}
        handleClose={handleCloseEditForm}
        editData={state.editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
      />
      <AddReportForm
        show={state.showAddForm}
        handleClose={handleCloseAddForm}
        addData={state.addData}
        handleAddInputChange={handleAddInputChange}
        handleAddSubmit={handleAddSubmit}
      />
      <DeleteReportForm
        show={state.showDeleteForm}
        handleClose={handleCloseDeleteForm}
        deleteData={state.deleteData}
        handleDeleteSubmit={handleDeleteSubmit}
      />
      <AccReportForm
        show={state.showAcceptForm}
        handleClose={handleCloseAcceptForm}
        accData={state.accData}
        handleAcceptSubmit={handleAcceptSubmit}
      />
      {!state.isMobile && ( // Hanya menampilkan tabel dan pagination jika bukan tampilan mobile
        <>
          <ReportWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="report">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Dokumen</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <Text to="#" onClick={() => handleDownload(item.path_report)}>
                        <FaFilePdf/>  
                      </Text>
                    </td>
                    <td>{item.kategori}</td>
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
          </ReportWrapper>
        </>
      )}
      {state.isMobile && ( // Hanya menampilkan title dan status jika tampilan mobile
        <>
          <ReportWrapper>
            <BtnLink to="#" onClick={handleShowAddForm}>Tambah</BtnLink>
            <Table striped bordered hover className="report">
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
          </ReportWrapper>
        </>
      )}
    </ReportContainer>
  );
};

export default Report;
