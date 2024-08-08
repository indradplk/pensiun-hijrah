import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../../components/Admin/Navbar';
import Sidebar from '../../../../components/Admin/Sidebar';
import HeaderSection from '../../../../components/Admin/HeaderSection';
import { VideoHeader } from '../../../../components/Admin/HeaderSection/Data';
import Video from '../../../../components/Admin/Media/Video';
import Footer from '../../../../components/Admin/Footer';
import SessionModal from '../../../../components/Admin/Modal/Session';
import { dataServer } from '../../../../components/DataServer';

const VideoAdmin = () => {
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
        <title>Video | DPLK Syariah Muamalat</title>
      </Helmet>
      <Sidebar isOpen={isOpen} toggle={toggle} userData={userData} />
      <Navbar toggle={toggle} userData={userData} />
      <HeaderSection {...VideoHeader} />
      <Video userData={userData} />
      <SessionModal show={showModal} onLogin={() => history.push('/admin')} />
      <Footer />
    </>
  );
};

export default VideoAdmin;