import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { UbahPaketHeader } from '../../../components/Peserta/HeaderSection/Data';
import UbahPaket from '../../../components/Peserta/UbahPaket';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import UsiaKepesertaanModal from '../../../components/Peserta/Modal/UsiaKepesertaan';
import PindahPeriodeModal from '../../../components/Peserta/Modal/PeriodePindah';
import { dataServer } from '../../../components/DataServer';

const UbahPaketInvestasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [daysParameter, setDaysParameter] = useState(null);
  const [daysPeriodeParameter, setDaysPeriodeParameter] = useState(null);
  const [daysPindahHari, setDaysPindahHari] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.post(`${dataServer.href}/api/v1/peserta/auth`, {}, { withCredentials: true });
        if (!response.data.userId) {
          setShowModal(true);
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
      }
    };

    checkSession();
  }, [history]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parameterResponse = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/MIN_KEPESERTAAN_PINDAH_PAKET`);
        const daysParameter = parameterResponse.data[0].NUMERIC_VALUE;
        setDaysParameter(daysParameter);

        const registrationResponse = await axios.get(`${dataServer.href}/api/v1/ppip/peserta/${userData.userId}`);
        const registrationDate = registrationResponse.data[0].tgl_registrasi;
        setRegistrationDate(registrationDate);

        // Konversi tanggal dari format dd/MM/yyyy ke objek Date
        const [day, month, year] = registrationDate.split('/');
        const startDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);

        if (diffDays < daysParameter) {
          setShowAlertModal(true);
          return;
        }

        const parameterPeriodeResponse = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/PERIODE_PINDAH_PAKET_INVESTASI`);
        const daysPeriodeParameter = parameterPeriodeResponse.data[0].NUMERIC_VALUE;
        setDaysPeriodeParameter(daysPeriodeParameter);

        const daysPindahHariResponse = await axios.get(`${dataServer.href}/api/v1/ppip/pindah-paket/${userData.userId}`);
        const daysPindahHari = daysPindahHariResponse.data[0].hari_pindah;
        setDaysPindahHari(daysPindahHari);

        if (daysPindahHari < daysPeriodeParameter) {
          setShowRejectModal(true);
        }

      } catch (err) {
        console.error(err);
      }
    };

    if (userData.userId) {
      fetchData();
    }
  }, [userData]);

  return (
    <>
      <Helmet>
        <title>Ubah Paket Investasi | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...UbahPaketHeader} />
      <UbahPaket userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <UsiaKepesertaanModal show={showAlertModal} onLogin={() => history.push('/peserta/dashboard/')} message={`Masa Kepesertaan belum genap ${daysParameter} hari`} />
      <PindahPeriodeModal show={showRejectModal} onLogin={() => history.push('/peserta/dashboard/')} message={`Periode pindah Paket Investasi terakhir belum genap ${daysPeriodeParameter} hari`}  />
      <Footer />
    </>
  );
};

export default UbahPaketInvestasi;
