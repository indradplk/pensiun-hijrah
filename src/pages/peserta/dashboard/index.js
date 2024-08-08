import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
import { dataServer } from '../../../components/DataServer';

const DashboardPPIP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);
  const [showLCFDataModal, setShowLCFDataModal] = useState(false);

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
          await checkPesertaData(response.data.userId);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
      }
    };

    const checkPesertaData = async (userId) => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/ppip/peserta/${userId}`);
        const peserta = response.data[0];

        // Check for empty fields
        const hasEmptyFields = Object.values(peserta).some(value => !value);
        if (hasEmptyFields) {
          // Check if there is existing pengkinian data
          const updateResponse = await axios.get(`${dataServer.href}/api/v1/mdplk/pengkinian-data/${userId}`);
          if (updateResponse.data.length === 0) {
            setShowUpdateDataModal(true);
            return; // Stop further checks if data is missing
          }
        }
        await checkUsiaPensiun(userId); // Check usia pensiun after pengkinian data check
      } catch (error) {
        console.error('Error fetching peserta data:', error);
      }
    };

    const checkUsiaPensiun = async (userId) => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/ppip/usia-pensiun/${userId}`);
        const peserta = response.data[0];
        const { usia_pensiun, usia_saat_ini, kode_paket_investasi } = peserta;
        const usiaLimitBawah = usia_pensiun - 5;

        if (usia_saat_ini >= usiaLimitBawah && usia_saat_ini <= usia_pensiun && kode_paket_investasi !== 'A') {
          const lcfResponse = await axios.get(`${dataServer.href}/api/v1/mdplk/life-cycle-fund/${userId}`);
          if (lcfResponse.data.length === 0) {
            setShowLCFDataModal(true);
          }
        }
      } catch (error) {
        console.error('Error fetching usia pensiun:', error);
      }
    };

    checkSession();
  }, [history]);

  return (
    <>
      <Helmet>
        <title>MyDPLK | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
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
