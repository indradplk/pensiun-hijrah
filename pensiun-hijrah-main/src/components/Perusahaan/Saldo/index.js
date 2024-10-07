import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import { SaldoContainer, SaldoWrapper, SaldoH1 } from './SaldoElements';
import '../../../style.css';

const Saldo = ({ userData }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState({
    data: []
  });

  useEffect(() => {
    fetchData();
  }, [userData.username]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/ppukp/saldo/${userData.username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      .then((res) => {
        setState({ data: res.data.content });
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <SaldoContainer id="saldo">
      <SaldoH1><b>Saldo Peserta</b></SaldoH1>
      <SaldoWrapper>
        {state.data.map((item, index) => (
          <Table key={index} striped bordered hover className="saldo">
            <tbody>
              <tr>
                <td><b>Akumulasi Iuran Pemberi Kerja</b></td>
                <td>{formatCurrency(item.AKUM_IURAN_PK)}</td>
              </tr>
              <tr>
                <td><b>Akumulasi Iuran Peserta</b></td>
                <td>{formatCurrency(item.AKUM_IURAN_PASTI)}</td>
              </tr>
              <tr>
                <td><b>Akumulasi Dana Peralihan</b></td>
                <td>{formatCurrency(item.AKUM_PERALIHAN)}</td>
              </tr>
              <tr>
                <td><b>Akumulasi Dana Pengembangan</b></td>
                <td>{formatCurrency(item.AKUM_PENGEMBANGAN)}</td>
              </tr>
              <tr>
                <td><b>Total Dana</b></td>
                <td><b>{formatCurrency(item.TOTAL_DANA)}</b></td>
              </tr>
            </tbody>
          </Table>
        ))}
      </SaldoWrapper>
    </SaldoContainer>
  );
};

export default Saldo;
