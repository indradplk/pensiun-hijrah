import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { LCFHeader } from '../../../components/Peserta/HeaderSection/Data';
import LifeCycleFund from '../../../components/Peserta/LCF';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import PeriodeLCFModal from '../../../components/Peserta/Modal/PeriodeLCF';
import { dataServer } from '../../../components/DataServer';

const LCF = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showLCFModal, setShowLCFModal] = useState(false);
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
          await checkUsiaPensiun(response.data.userId);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
      }
    };

    const checkUsiaPensiun = async (userId) => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/ppip/usia-pensiun/${userId}`);
        const peserta = response.data[0];
        const { usia_pensiun, usia_saat_ini } = peserta;
        const usiaLimitBawah = usia_pensiun - 5;

        if (usia_saat_ini < usiaLimitBawah) {
          setShowLCFModal(true);
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
        <title>Life Cycle Fund | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...LCFHeader} />
      <LifeCycleFund userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <PeriodeLCFModal show={showLCFModal} onLogin={() => history.push('/peserta/dashboard/')} />
      <Footer />
    </>
  );
};

export default LCF;
