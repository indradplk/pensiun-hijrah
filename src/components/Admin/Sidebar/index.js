import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {
  CloseIcon,
  Heading,
  Icon,
  SidebarContainer,
  SidebarLink,
  SidebarMenu,
  SidebarRoute,
  SidebarSubMenu,
  SidebarWrapper,
  SideBtnWrap,
} from './SidebarElements';
import { animateScroll as scroll } from 'react-scroll';
import LogoutModal from '../Modal/Logout';

const Sidebar = ({ isOpen, toggle, userData }) => {
  const [dataUser, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    fetchData();
  }, [userData.username]);

  const fetchData = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/admin/${userData.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }, { withCredentials: true })
      .then((response) => {
        setUser(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = async () => {
    const cookies = new Cookies();

    try {
      await axios.post(process.env.REACT_APP_API_BASE_URL + '/logout', { withCredentials: true });

      // Clear localStorage and remove cookies
      localStorage.clear();
      cookies.remove('token', { path: '/' });
      cookies.remove('username', { path: '/' });
      cookies.remove('role', { path: '/' });
      cookies.remove('id', { path: '/' });

      // Show logout modal
      setShowModal(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <Heading><b>Peserta</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/admin/peserta/reset-password/" onClick={toggleHome}>
              Reset Password Peserta
            </SidebarLink>
            <SidebarLink to="/admin/perusahaan/reset-password/" onClick={toggleHome}>
              Reset Password Perusahaan
            </SidebarLink>
            {/* <SidebarLink to="/admin/peserta/block/" onClick={toggleHome}>
              Buka Blokir Peserta
            </SidebarLink> */}
            {/* <SidebarLink to="/admin/perusahaan/block/" onClick={toggleHome}>
              Buka Blokir Perusahaan
            </SidebarLink> */}
            <SidebarLink to="/admin/peserta/registrasi/" onClick={toggleHome}>
              Registrasi Peserta
            </SidebarLink>
            <SidebarLink to="/admin/perusahaan/registrasi/" onClick={toggleHome}>
              Registrasi Perusahaan
            </SidebarLink>
            <SidebarLink to="/admin/peserta/paket-investasi/" onClick={toggleHome}>
              Paket Investasi Peserta
            </SidebarLink>
            <SidebarLink to="/admin/tanya-dplk/" onClick={toggleHome}>
              Tanya DPLK
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        {dataUser.role !== 'administrator' && (
          <SidebarMenu>
            <Heading><b>Tentang Kami</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/about/manajemen/" onClick={toggleHome}>
                Manajemen
              </SidebarLink>
              <SidebarLink to="/admin/about/penghargaan/" onClick={toggleHome}>
                Penghargaan
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {dataUser.role !== 'administrator' && (
          <SidebarMenu>
            <Heading><b>Media</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/media/berita/" onClick={toggleHome}>
                Berita
              </SidebarLink>
              <SidebarLink to="/admin/media/pengumuman/" onClick={toggleHome}>
                Pengumuman
              </SidebarLink>
              <SidebarLink to="/admin/media/video/" onClick={toggleHome}>
                Video
              </SidebarLink>
              <SidebarLink to="/admin/media/slider/" onClick={toggleHome}>
                Slider
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {dataUser.role !== 'administrator' && (
          <SidebarMenu>
            <Heading><b>Dokumen</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/dokumen/report/" onClick={toggleHome}>
                Report
              </SidebarLink>
              <SidebarLink to="/admin/dokumen/bantuan/" onClick={toggleHome}>
                Bantuan
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {dataUser.role === 'administrator' && (
          <SidebarMenu>
            <Heading><b>User Admin</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/user/create/" onClick={toggleHome}>
                Report
              </SidebarLink>
              <SidebarLink to="/admin/user/reset-password/" onClick={toggleHome}>
                Bantuan
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {dataUser.role !== 'operator' && (
          <SidebarMenu>
            <Heading><b>Parameter</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/parameter/investasi/" onClick={toggleHome}>
                Paket Investasi
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {dataUser.role === 'administrator' && (
          <SidebarMenu>
            <Heading><b>Aktivitas</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/aktivitas/admin/" onClick={toggleHome}>
                Admin
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        <SideBtnWrap>
          <SidebarRoute to="#" onClick={handleLogout}>Keluar</SidebarRoute>
        </SideBtnWrap>
        <LogoutModal
          show={showModal}
          onLogin={() => history.push('/admin')}
        />
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
