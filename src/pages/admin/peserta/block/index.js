import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../../../../components/Admin/Navbar';
import Sidebar from '../../../../components/Admin/Sidebar';
import HeaderSection from '../../../../components/Admin/HeaderSection';
import { PasswordHeader } from '../../../../components/Admin/HeaderSection/Data';
import UnblockPeserta from '../../../../components/Admin/Block/PesertaBlock';
import Footer from '../../../../components/Admin/Footer';
import SessionModal from '../../../../components/Admin/Modal/Session';

const BlockPeserta = () => {
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
    const id = cookies.get('id');

    // Periksa apakah pengguna sudah login dan apakah role adalah admin
    if (!token || role !== 'admin') {
      setShowModal(true);
    } else {
      // Set data pengguna dari cookie
      setUserData({ id, username, role });
    }
  }, [history, cookies]);

  return (
    <>
      <Helmet>
        <title>Reset Password Peserta | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...PasswordHeader} />
      <UnblockPeserta userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/admin')} />
      <Footer />
    </>
  );
};

export default BlockPeserta;