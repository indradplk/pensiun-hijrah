import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../../components/Admin/Navbar';
import Sidebar from '../../../../components/Admin/Sidebar';
import HeaderSection from '../../../../components/Admin/HeaderSection';
import { RegisPerusahaanHeader } from '../../../../components/Admin/HeaderSection/Data';
import RegisPerusahaanPage from '../../../../components/Admin/RegistrasiPerusahaan';
import Footer from '../../../../components/Admin/Footer';
import SessionModal from '../../../../components/Admin/Modal/Session';
import { dataServer } from '../../../../components/DataServer';

const RegisPerusahaan = () => {
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
        const response = await axios.post(`${dataServer.href}/api/v1/admin/auth`, {}, { withCredentials: true });
        if (!response.data.adminId) {
          setShowModal(true);
          // history.push('/admin');
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
        setShowModal(true);
        // history.push('/admin');
      }
    };

    checkSession();
  }, [history]);

  return (
    <>
      <Helmet>
        <title>Tanya DPLK | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...RegisPerusahaanHeader} />
      <RegisPerusahaanPage userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/admin')} />
      <Footer />
    </>
  );
};

export default RegisPerusahaan;