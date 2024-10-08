import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Perusahaan/Navbar';
import Sidebar from '../../../components/Perusahaan/Sidebar';
import HeaderSection from '../../../components/Perusahaan/HeaderSection';
import { ProfilHeader } from '../../../components/Perusahaan/HeaderSection/Data';
import Profil from '../../../components/Perusahaan/Profil';
import Footer from '../../../components/Perusahaan/Footer';
import SessionModal from '../../../components/Perusahaan/Modal/Session';

const ProfilPPUKP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
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
    
    if (!token || role !== 'perusahaan') {
      setShowModal(true);
    } else {
      setUserData({ email, username, role });
    }
  }, [cookies]);

  return (
    <>
      <Helmet>
        <title>Profil | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...ProfilHeader} />
      <Profil userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/perusahaan/')} />
      <Footer />
    </>
  );
};

export default ProfilPPUKP;