import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { PengkinianHeader } from '../../../components/Peserta/HeaderSection/Data';
import Pengkinian from '../../../components/Peserta/Pengkinian';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import StatusPengkinianModal from '../../../components/Peserta/Modal/StatusPengkinianData';

const PengkinianData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);
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
      checkPesertaData(username, token);
    }
  }, [cookies]);

  const checkPesertaData = async (username, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mdplk/pengkinian-data/${username}?status=false`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.content.length !== 0) {
        setShowUpdateDataModal(true);
        return;
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pengkinian Data | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...PengkinianHeader} />
      <Pengkinian userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <StatusPengkinianModal show={showUpdateDataModal} onLogin={() => history.push('/peserta/profil/')} message={`Pengkinian Data Anda sedang diproses. Mohon untuk dapat menunggu dan dicek kembali secara berkala`} />
      <Footer />
    </>
  );
};

export default PengkinianData;