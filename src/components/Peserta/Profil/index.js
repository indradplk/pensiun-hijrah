import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { ProfilContainer, ProfilWrapper, ProfilH1, BtnLink } from './ProfilElements';
import '../../../style.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import jsPDF from 'jspdf';
import Ecard from '../../../assets/images/ecard.png';
import { dataServer } from '../../DataServer';

const Profil = ({ userData }) => {
  const [state, setState] = useState({
    data: []
  });

  useEffect(() => {
    console.log('User ID:', userData.userId);
    fetchData();
  }, [userData.userId]);

  const fetchData = () => {
    axios
      .get(`${dataServer.href}/api/v1/ppip/peserta/${userData.userId}`)
      .then((res) => {
        setState({ data: res.data });
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split('/');
    const year = dateParts[2];
    const month = dateParts[1];
    const day = dateParts[0];
    return format(new Date(year, month - 1, day), 'dd MMMM yyyy', { locale: id });
  };

  const handleDownloadCard = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [8.56, 5.39]
    });

    state.data.forEach((item) => {
      doc.addImage(Ecard, 'PNG', 0, 0, 8.56, 5.39);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.nama_lengkap}`, 0.5, 3.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`${item.no_peserta}`, 0.5, 3.9);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Berlaku hingga: ${formatDate(item.tgl_pensiun)}`, 0.5, 4.2);
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(`KARTU PESERTA`, 5.6, 5.1);
    });

    doc.save('kartu_peserta.pdf');
  };

  return (
    <ProfilContainer id="profil">
      <ProfilH1><b>Data Peserta</b></ProfilH1>
      <BtnLink to="#" onClick={handleDownloadCard}>Download Kartu Peserta</BtnLink>
      <ProfilWrapper>
        {state.data.map((item, index) => (
          <Table key={index} striped bordered hover className="profil">
            <tbody>
              <tr>
                <td><b>Nomor Peserta</b></td>
                <td>{item.no_peserta}</td>
              </tr>
              <tr>
                <td><b>Nama Lengkap</b></td>
                <td>{item.nama_lengkap}</td>
              </tr>
              <tr>
                <td><b>Email</b></td>
                <td>{item.ALAMAT_EMAIL}</td>
              </tr>
              <tr>
                <td><b>Nomor HP/Telepon</b></td>
                <td>{item.alamat_telepon}</td>
              </tr>
              <tr>
                <td><b>Paket Investasi</b></td>
                <td>Paket {item.kode_paket_investasi}</td>
              </tr>
              <tr>
                <td><b>Alamat Sesuai Kartu Identitas</b></td>
                <td>
                  {`${item.alamat_jalan ? `${item.alamat_jalan} RT ${item.alamat_rtrw}, ` : ''}`}
                  {`${item.alamat_kelurahan ? `${item.alamat_kelurahan}, ` : ''}`}
                  {`${item.ALAMAT_KECAMATAN ? `${item.ALAMAT_KECAMATAN}, ` : ''}`}
                  <br/>
                  {`${item.alamat_kota ? `${item.alamat_kota}, ` : ''}`}
                  {`${item.ALAMAT_PROPINSI ? `${item.ALAMAT_PROPINSI} ` : ''}`}
                  {`${item.alamat_kode_pos ? `${item.alamat_kode_pos}` : ''}`}
                </td>
              </tr>
              <tr>
                <td><b>Tanggal Lahir</b></td>
                <td>{formatDate(item.tanggal_lahir)}</td>
              </tr>
              <tr>
                <td><b>Tanggal Registrasi</b></td>
                <td>{formatDate(item.tgl_registrasi)}</td>
              </tr>
              <tr>
                <td><b>Tanggal Pensiun</b></td>
                <td>{formatDate(item.tgl_pensiun)}</td>
              </tr>
              <tr>
                <td><b>Tanggal Pensiun Dipercepat</b></td>
                <td>{formatDate(item.tgl_pensiun_dipercepat)}</td>
              </tr>
            </tbody>
          </Table>
        ))}
      </ProfilWrapper>
    </ProfilContainer>
  );
};

export default Profil;
