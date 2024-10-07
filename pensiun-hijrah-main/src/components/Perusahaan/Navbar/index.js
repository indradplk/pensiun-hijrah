import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from '../../../assets/images/LogoPensiunHijrahWidth.png';
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

const NavbarPerusahaan = ({ toggle, userData }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => window.removeEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
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
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <Navlogo to="/perusahaan/dashboard/" onClick={toggleHome}>
              <NavIcon src={Logo} />
            </Navlogo>
            <MobileIcons onClick={toggle}>
              <FaBars />
            </MobileIcons>
            <NavMenu>
              <NavItems>
                <NavDropdown title="Peserta">
                  <NavLinks to="/perusahaan/profil/" onClick={toggleHome} userData={userData}>Profil</NavLinks>
                  <NavLinks to="/perusahaan/ubah-password/" onClick={toggleHome} userData={userData}>Ubah Password</NavLinks>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Transaksi">
                  <NavLinks to="/perusahaan/saldo/" onClick={toggleHome} userData={userData}>Cek Saldo</NavLinks>
                  <NavLinks to="/perusahaan/riwayat/" onClick={toggleHome} userData={userData}>Riwayat Transaksi</NavLinks>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Pusat Media">
                  <NavLinks to="/media/investasi/" onClick={toggleHome}>Fund Fact Sheet</NavLinks>
                  <NavLinks to="/media/keuangan/" onClick={toggleHome}>Laporan Keuangan</NavLinks>
                  <NavLinks to="/media/dewan-pengawas/" onClick={toggleHome}>Laporan Dewan Pengawas</NavLinks>
                  <NavLinks to="/media/berita/" onClick={toggleHome}>Berita</NavLinks>
                  <NavLinks to="/media/video/" onClick={toggleHome}>Video</NavLinks>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Bantuan">
                  <NavLinks to="/bantuan/panduan/" onClick={toggleHome}>Panduan</NavLinks>
                  <NavLinks to="/bantuan/download/" onClick={toggleHome}>Download</NavLinks>
                  <NavLinks to="/bantuan/faq/" onClick={toggleHome}>Sering Ditanyakan</NavLinks>
                  <NavLinks to="/bantuan/kontak/" onClick={toggleHome}>Hubungi Kami</NavLinks>
                </NavDropdown>
              </NavItems>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="#" onClick={handleLogout}>Keluar</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
      <LogoutModal
        show={showModal}
        onLogin={() => history.push('/perusahaan/')}
      />
    </>
  );
};

export default NavbarPerusahaan;
