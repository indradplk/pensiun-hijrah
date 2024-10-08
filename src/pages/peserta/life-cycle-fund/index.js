import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { LCFHeader } from '../../../components/Peserta/HeaderSection/Data';
import LifeCycleFund from '../../../components/Peserta/LCF';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import PeriodeLCFModal from '../../../components/Peserta/Modal/PeriodeLCF';

const LCF = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showLCFModal, setShowLCFModal] = useState(false);
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

      if (usia_saat_ini < usiaLimitBawah) {
        setShowLCFModal(true);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };  

  return (
    <>
      <Helmet>
        <title>Life Cycle Fund | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...LCFHeader} />
      <LifeCycleFund userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <PeriodeLCFModal show={showLCFModal} onLogin={() => history.push('/peserta/dashboard/')} />
      <Footer />
    </>
  );
};

export default LCF;
