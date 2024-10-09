import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { UbahPaketHeader } from '../../../components/Peserta/HeaderSection/Data';
import UbahPaket from '../../../components/Peserta/UbahPaket';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import UsiaKepesertaanModal from '../../../components/Peserta/Modal/UsiaKepesertaan';
import PindahPeriodeModal from '../../../components/Peserta/Modal/PeriodePindah';
import PaketTerakhirModal from '../../../components/Peserta/Modal/ProsesPaketTerakhir';
import LCFModal from '../../../components/Peserta/Modal/LCF';

const UbahPaketInvestasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [daysParameter, setDaysParameter] = useState(null);
  const [daysPeriodeParameter, setDaysPeriodeParameter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPaketTerakhirModal, setShowPaketTerakhirModal] = useState(false);
  const [showLCFDataModal, setShowLCFDataModal] = useState(false);
  const history = useHistory();

  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get('token');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const role = cookies.get('role');
    const username = cookies.get('username');
    const email = cookies.get('email');
    
    if (!token || role !== 'peserta') {
      setShowModal(true);
    } else {
      setUserData({ email, username, role });
      checkUsiaPensiun(username, token);
    }
  }, [cookies]);

  const checkUsiaPensiun = async (username, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppip/usia-pensiun/${username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const peserta = response.data.content[0];
      const { usia_pensiun, usia_saat_ini } = peserta;
      const usiaLimitBawah = usia_pensiun - 5;

      if (
        usia_saat_ini >= usiaLimitBawah &&
        usia_saat_ini <= usia_pensiun
      ) {
        setShowLCFDataModal(true);
        return;
      }

      checkLastPackage(username, token);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const checkLastPackage = async (username, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mdplk/paket-investasi/${username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.content.length !== 0) {
        setShowPaketTerakhirModal(true);
        return;
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parameterResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/ppip/parameter/MIN_KEPESERTAAN_PINDAH_PAKET`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const daysParameter = parameterResponse.data.content[0].NUMERIC_VALUE;
        setDaysParameter(daysParameter);

        const registrationResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/ppip/peserta/${userData.username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const registrationDate = registrationResponse.data.content[0].tgl_registrasi;

        // Konversi tanggal dari format dd/MM/yyyy ke objek Date
        const [day, month, year] = registrationDate.split('/');
        const startDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < daysParameter) {
          setShowAlertModal(true);
          return;
        }

        const parameterPeriodeResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/ppip/parameter/PERIODE_PINDAH_PAKET_INVESTASI`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const daysPeriodeParameter = parameterPeriodeResponse.data.content[0].NUMERIC_VALUE;
        setDaysPeriodeParameter(daysPeriodeParameter);

        const daysPindahHariResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/ppip/pindah-paket/${userData.username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const daysPindahHari = daysPindahHariResponse.data.content[0].hari_pindah;

        if (daysPindahHari < daysPeriodeParameter) {
          setShowRejectModal(true);
        }

      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    if (userData.username) {
      fetchData();
    }
  }, [userData, token]);

  return (
    <>
      <Helmet>
        <title>Ubah Paket Investasi | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...UbahPaketHeader} />
      <UbahPaket userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <UsiaKepesertaanModal show={showAlertModal} onLogin={() => history.push('/peserta/dashboard/')} message={`Masa Kepesertaan belum genap ${daysParameter} hari`} />
      <PindahPeriodeModal show={showRejectModal} onLogin={() => history.push('/peserta/dashboard/')} message={`Periode pindah Paket Investasi terakhir belum genap ${daysPeriodeParameter} hari`} />
      <PaketTerakhirModal show={showPaketTerakhirModal} onLogin={() => history.push('/peserta/profil/')} message={`Perubahan Paket Investasi Anda sedang diproses. Mohon untuk dapat menunggu dan dicek kembali secara berkala`} />
      <LCFModal show={showLCFDataModal} onLogin={() => history.push('/peserta/life-cycle-fund/')} />
      <Footer />
    </>
  );
};

export default UbahPaketInvestasi;
