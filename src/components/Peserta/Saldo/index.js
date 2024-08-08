import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { SaldoContainer, SaldoWrapper, SaldoH1 } from './SaldoElements';
import '../../../style.css';
import { dataServer } from '../../DataServer';

const Saldo = ({ userData }) => {
  const [state, setState] = useState({
    data: []
  });

  useEffect(() => {
    console.log('User ID:', userData.userId);
    fetchData();
  }, [userData.userId]);

  const fetchData = () => {
    axios
      .get(`${dataServer.href}/api/v1/ppip/saldo/${userData.userId}`)
      .then((res) => {
        setState({ data: res.data });
      })
      .catch((error) => console.log(error));
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
