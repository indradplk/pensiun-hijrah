import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { dataServer } from '../../DataServer';

const Sidebar = ({ isOpen, toggle }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post(`${dataServer.href}/api/v1/perusahaan/logout`, {}, { withCredentials: true });
      setShowModal(true);
    } catch (err) {
      console.error('Error logging out:', err);
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
