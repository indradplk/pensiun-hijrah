import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../assets/images/LogoDPLKSyariah.png';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {
  MobileIcons,
  Nav,
  NavbarContainer,
  NavBtn,
  NavBtnLink,
  NavItems,
  Navlogo,
  NavMenu,
  NavIcon,
  NavLinks,
} from './NavbarElements';
import { NavDropdown } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
import LogoutModal from '../Modal/Logout';
import { dataServer } from '../../DataServer';

const Navbar = ({ toggle, userData }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

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
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <Navlogo to="/admin/dashboard/" onClick={toggleHome}>
              <NavIcon src={Logo} />
            </Navlogo>
            <MobileIcons onClick={toggle}>
              <FaBars />
            </MobileIcons>
            <NavMenu>
              <NavItems>
                <NavDropdown title="Peserta">
                  <NavLinks to="/admin/peserta/reset-password/" onClick={toggleHome}>Reset Password Peserta</NavLinks>
                  <NavLinks to="/admin/perusahaan/reset-password/" onClick={toggleHome}>Reset Password Perusahaan</NavLinks>
                  <NavLinks to="/admin/peserta/block/" onClick={toggleHome}>Buka Blokir Peserta</NavLinks>
                  <NavLinks to="/admin/perusahaan/block/" onClick={toggleHome}>Buka Blokir Perusahaan</NavLinks>
                  <NavLinks to="/admin/peserta/registrasi/" onClick={toggleHome}>Registrasi Peserta</NavLinks>
                  <NavLinks to="/admin/perusahaan/registrasi/" onClick={toggleHome}>Registrasi Perusahaan</NavLinks>
                  <NavLinks to="/admin/tanya-dplk/" onClick={toggleHome}>Tanya DPLK</NavLinks>
                </NavDropdown>
              </NavItems>
              {userData.role !== 'admin' && (
                <NavItems>
                  <NavDropdown title="Tentang Kami">
                    <NavLinks to="/admin/about/manajemen/" onClick={toggleHome}>Manajemen</NavLinks>
                    <NavLinks to="/admin/about/penghargaan/" onClick={toggleHome}>Penghargaan</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {userData.role !== 'admin' && (
                <NavItems>
                  <NavDropdown title="Media">
                    <NavLinks to="/admin/media/berita/" onClick={toggleHome}>Berita</NavLinks>
                    <NavLinks to="/admin/media/video/" onClick={toggleHome}>Video</NavLinks>
                    <NavLinks to="/admin/media/slider/" onClick={toggleHome}>Slider</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {userData.role !== 'admin' && (
                <NavItems>
                  <NavDropdown title="Dokumen">
                    <NavLinks to="/admin/dokumen/report/" onClick={toggleHome}>Report</NavLinks>
                    <NavLinks to="/admin/dokumen/bantuan/" onClick={toggleHome}>Bantuan</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {userData.role == 'admin' && (
                <NavItems>
                  <NavDropdown title="User Admin">
                    <NavLinks to="/admin/user/create/" onClick={toggleHome}>Buat Admin Baru</NavLinks>
                    <NavLinks to="/admin/user/reset-password/" onClick={toggleHome}>Reset Password Admin</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {userData.role !== 'operator' && (
                <NavItems>
                  <NavDropdown title="Parameter">
                    <NavLinks to="/admin/parameter/investasi/" onClick={toggleHome}>Paket Investasi</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {userData.role == 'admin' && (
                <NavItems>
                  <NavDropdown title="Aktivitas">
                    <NavLinks to="/admin/aktivitas/admin/" onClick={toggleHome}>Admin</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="#" onClick={handleLogout}>Keluar</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
      <LogoutModal
        show={showModal}
        onLogin={() => history.push('/admin')}
      />
    </>
  );
};

export default Navbar;
