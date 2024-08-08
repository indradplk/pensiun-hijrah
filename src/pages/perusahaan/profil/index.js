import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Perusahaan/Navbar';
import Sidebar from '../../../components/Perusahaan/Sidebar';
import HeaderSection from '../../../components/Perusahaan/HeaderSection';
import { ProfilHeader } from '../../../components/Perusahaan/HeaderSection/Data';
import Profil from '../../../components/Perusahaan/Profil';
import Footer from '../../../components/Perusahaan/Footer';
import SessionModal from '../../../components/Perusahaan/Modal/Session';
import { dataServer } from '../../../components/DataServer';

const ProfilPPUKP = () => {
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
        const response = await axios.post(`${dataServer.href}/api/v1/perusahaan/auth`, {}, { withCredentials: true });
        if (!response.data.userId) {
          setShowModal(true);
          // history.push('/perusahaan/');
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
        // history.push('/perusahaan/');
      }
    };

    checkSession();
  }, [history]);

  return (
    <>
      <Helmet>
        <title>Profil | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeaderSection {...ProfilHeader} />
      <Profil userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/perusahaan/')} />
      <Footer />
    </>
  );
};

export default ProfilPPUKP;