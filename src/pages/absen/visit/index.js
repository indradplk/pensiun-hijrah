import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../components/Absen/Navbar';
import Sidebar from '../../../components/Absen/Sidebar';
import HeaderSection from '../../../components/Absen/HeaderSection';
import { VisitHeader } from '../../../components/Absen/HeaderSection/Data';
import Visit from '../../../components/Absen/Visit';
import { dataDashboard } from '../../../components/Absen/Visit/Data';
import Footer from '../../../components/Absen/Footer';
import SessionModal from '../../../components/Absen/Modal/Session';

const VisitAbsen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const cookies = useMemo(() => new Cookies(), []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Ambil data user dari cookie
    const token = cookies.get('token');
    const role = cookies.get('role');
    const username = cookies.get('username');
    const nama = cookies.get('nama');
    const lokasi = cookies.get('lokasi');

    // Periksa apakah pengguna sudah login
    if (!token) {
      setShowModal(true);
    } else {
      // Set data pengguna dari cookie
      setUserData({ nama, username, role, lokasi });
    }
  }, [history, cookies]);

  return (
    <>
      <Helmet>
        <title>Absen Visit HRIS | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...VisitHeader} />
      <Visit {...dataDashboard} userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/absen')} />
      <Footer />
    </>
  );
};

export default VisitAbsen;
