import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
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
  const history = useHistory();
  const [error, setError] = useState('');

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
      .get(process.env.REACT_APP_API_BASE_URL + `/user/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
            <SidebarLink to="/perusahaan/profil/" onClick={toggleHome}>
              Profil
            </SidebarLink>
            <SidebarLink to="/perusahaan/daftar-peserta/" onClick={toggleHome}>
              Daftar Peserta
            </SidebarLink>
            <SidebarLink to="/perusahaan/ubah-password/" onClick={toggleHome}>
              Ubah Password
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Transaksi</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/perusahaan/saldo/" onClick={toggleHome}>
              Cek Saldo
            </SidebarLink>
            <SidebarLink to="/perusahaan/riwayat/" onClick={toggleHome}>
              Riwayat Transaksi
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Simulasi</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/simulasi/" onClick={toggleHome}>
              Berdasarkan Iuran
            </SidebarLink>
            <SidebarLink to="/simulasi/based-on-needs/" onClick={toggleHome}>
              Berdasarkan Kebutuhan
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Pusat Media</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/media/investasi/" onClick={toggleHome}>
              Fund Fact Sheet
            </SidebarLink>
            <SidebarLink to="/media/keuangan/" onClick={toggleHome}>
              Laporan Keuangan
            </SidebarLink>
            <SidebarLink to="/media/dewan-pengawas/" onClick={toggleHome}>
              Laporan Dewan Pengawas
            </SidebarLink>
            <SidebarLink to="/media/berita/" onClick={toggleHome}>
              Berita
            </SidebarLink>
            <SidebarLink to="/media/pengumuman/" onClick={toggleHome}>
              Pengumuman
            </SidebarLink>
            <SidebarLink to="/media/video/" onClick={toggleHome}>
              Video
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Bantuan</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/bantuan/panduan/" onClick={toggleHome}>
              Panduan
            </SidebarLink>
            <SidebarLink to="/bantuan/download/" onClick={toggleHome}>
              Download
            </SidebarLink>
            <SidebarLink to="/bantuan/faq/" onClick={toggleHome}>
              Sering Ditanyakan
            </SidebarLink>
            <SidebarLink to="/bantuan/kontak/" onClick={toggleHome}>
              Hubungi Kami
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="#" onClick={handleLogout}>Keluar</SidebarRoute>
        </SideBtnWrap>
        <LogoutModal
          show={showModal}
          onLogin={() => history.push('/perusahaan/')}
        />
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
