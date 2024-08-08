import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import {
  InvestasiContainer,
  InvestasiWrapper,
  EditLink,
} from './InvestasiElements';
import '../../../../style.css';
import { FaEdit } from 'react-icons/fa';
import ApproveForm from '../Form/ApprovedInvestasi';
import { dataServer } from '../../../DataServer';

const Investasi = ({ userData }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({ id: null, code: '' });
  const [paketInvestasi, setPaketInvestasi] = useState([]);

  useEffect(() => {
    fetchPaketInvestasi();
  }, []);

  const fetchPaketInvestasi = async () => {
    try {
      const paketA = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_A`);
      const paketB = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_B`);
      const paketC = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_C`);

      setPaketInvestasi([
        { id: 'A', name: 'Paket Investasi A', code: paketA.data[0]?.NUMERIC_VALUE || 0 },
        { id: 'B', name: 'Paket Investasi B', code: paketB.data[0]?.NUMERIC_VALUE || 0 },
        { id: 'C', name: 'Paket Investasi C', code: paketC.data[0]?.NUMERIC_VALUE || 0 },
      ]);
    } catch (error) {
      console.error('Error fetching investasi:', error);
    }
  };

  const handleShowEditForm = (id) => {
    const dataToEdit = paketInvestasi.find((item) => item.id === id);
    if (dataToEdit) {
      setEditData(dataToEdit);
      setShowEditForm(true);
    } else {
      console.log('Data tidak ditemukan!');
    }
  };

  const handleCloseEditForm = () => setShowEditForm(false);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    console.log('Data edited:', editData);
    handleCloseEditForm();
  };

  return (
    <InvestasiContainer id="investasi">
      <ApproveForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        editData={editData}
        handleEditInputChange={handleEditInputChange}
        handleEditSubmit={handleEditSubmit}
        userData={userData}
      />
      <InvestasiWrapper>
        <Table striped bordered hover className="investasi">
          <thead>
            <tr>
              <th>Paket</th>
              <th>Nilai (%)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paketInvestasi.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>
                  <EditLink to="#" onClick={() => handleShowEditForm(item.id)} title="Edit">
                    <FaEdit />
                  </EditLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InvestasiWrapper>
    </InvestasiContainer>
  );
};

export default Investasi;
