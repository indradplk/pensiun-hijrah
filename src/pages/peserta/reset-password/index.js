import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { ResetHeader } from '../../../components/Peserta/HeaderSection/Data';
import ResetPasswordPeserta from '../../../components/Peserta/Password/ResetPassword';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';
import { dataServer } from '../../../components/DataServer';

const ResetPeserta = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
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
          // history.push('/peserta/');
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
        // history.push('/peserta/');
      }
    };

    checkSession();
  }, [history]);

  return (
    <>
      <Helmet>
        <title>Ubah Password | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...ResetHeader} />
      <ResetPasswordPeserta userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <Footer />
    </>
  );
};

export default ResetPeserta;