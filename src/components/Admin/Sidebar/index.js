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

const Sidebar = ({ isOpen, toggle, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post(`${dataServer.href}/api/v1/admin/logout`, {}, { withCredentials: true });
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
            <SidebarLink to="/admin/peserta/reset-password/" onClick={toggleHome}>
              Reset Password Peserta
            </SidebarLink>
            <SidebarLink to="/admin/perusahaan/reset-password/" onClick={toggleHome}>
              Reset Password Perusahaan
            </SidebarLink>
            <SidebarLink to="/admin/peserta/block/" onClick={toggleHome}>
              Buka Blokir Peserta
            </SidebarLink>
            <SidebarLink to="/admin/perusahaan/block/" onClick={toggleHome}>
              Buka Blokir Perusahaan
            </SidebarLink>
            <SidebarLink to="/admin/peserta/registrasi/" onClick={toggleHome}>
              Registrasi Peserta
            </SidebarLink>
            <SidebarLink to="/admin/perusahaan/registrasi/" onClick={toggleHome}>
              Registrasi Perusahaan
            </SidebarLink>
            <SidebarLink to="/admin/tanya-dplk/" onClick={toggleHome}>
              Tanya DPLK
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        {userData.role !== 'admin' && (
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
        {userData.role !== 'admin' && (
          <SidebarMenu>
            <Heading><b>Media</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/media/berita/" onClick={toggleHome}>
                Berita
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
        {userData.role !== 'admin' && (
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
        {userData.role == 'admin' && (
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
        {userData.role !== 'operator' && (
          <SidebarMenu>
            <Heading><b>Parameter</b></Heading>
            <SidebarSubMenu>
              <SidebarLink to="/admin/parameter/investasi/" onClick={toggleHome}>
                Paket Investasi
              </SidebarLink>
            </SidebarSubMenu>
          </SidebarMenu>
        )}
        {userData.role == 'admin' && (
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
