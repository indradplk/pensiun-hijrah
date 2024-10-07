import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Peserta/Navbar';
import Sidebar from '../../../components/Peserta/Sidebar';
import HeaderSection from '../../../components/Peserta/HeaderSection';
import { UbahUsiaHeader } from '../../../components/Peserta/HeaderSection/Data';
import UbahUsia from '../../../components/Peserta/UbahUsia';
import Footer from '../../../components/Peserta/Footer';
import SessionModal from '../../../components/Peserta/Modal/Session';

const UbahUsiaPensiun = () => {
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
    
    if (!token || role !== 'peserta') {
      setShowModal(true);
    } else {
      setUserData({ email, username, role });
    }
  }, [cookies]);

  return (
    <>
      <Helmet>
        <title>Ubah Usia Pensiun | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...UbahUsiaHeader} />
      <UbahUsia userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/peserta/')} />
      <Footer />
    </>
  );
};

export default UbahUsiaPensiun;
