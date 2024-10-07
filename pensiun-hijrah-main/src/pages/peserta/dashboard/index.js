import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { DashboardHeader } from '../../../components/Peserta/HeaderSection/Data';
import Dashboard from '../../../components/Peserta/Dashboard';
import { dataDashboard } from '../../../components/Peserta/Dashboard/Data';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import PengkinianDataModal from '../../../components/Peserta/Modal/PengkinianData';
import LCFModal from '../../../components/Peserta/Modal/LCF';

const DashboardPPIP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);
  const [showLCFDataModal, setShowLCFDataModal] = useState(false);
  const history = useHistory();

  const cookies = useMemo(() => new Cookies(), []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = cookies.get('token');
    const role = cookies.get('role');
    const username = cookies.get('username');
    const email = cookies.get('email');
    
    if (!token || role !== 'peserta') {
      setShowModal(true);
    } else {
      setUserData({ email, username, role });
      checkUsiaPensiun(username, token);
      checkPesertaData(username, token);
    }
  }, [cookies]);

  const checkPesertaData = async (username, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/ppip/peserta/${username}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const peserta = response.data.content[0];
      const hasEmptyFields = Object.values(peserta).some((value) => !value);

      if (hasEmptyFields) {
        const updateResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/mdplk/pengkinian-data/${username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updateResponse.data.content.length === 0) {
          setShowUpdateDataModal(true);
          return;
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  
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
      const { usia_pensiun, usia_saat_ini, kode_paket_investasi } = peserta;
      const usiaLimitBawah = usia_pensiun - 5;

      if (
        usia_saat_ini >= usiaLimitBawah &&
        usia_saat_ini <= usia_pensiun &&
        kode_paket_investasi !== 'A'
      ) {
        const lcfResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/mdplk/life-cycle-fund/${username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setShowLCFDataModal(true);
      } else {
        console.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>MyDPLK | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...DashboardHeader} />
      <Dashboard {...dataDashboard} userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <PengkinianDataModal show={showUpdateDataModal} onLogin={() => history.push('/peserta/pengkinian-data/')} />
      <LCFModal show={showLCFDataModal} onLogin={() => history.push('/peserta/life-cycle-fund/')} />
      <Footer />
    </>
  );
};

export default DashboardPPIP;
