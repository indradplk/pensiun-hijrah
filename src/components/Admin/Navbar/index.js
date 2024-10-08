import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
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

const Navbar = ({ toggle, userData }) => {
  const [dataUser, setUser] = useState({});
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
      })
      .then((response) => {
        setUser(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                  {/* <NavLinks to="/admin/peserta/block/" onClick={toggleHome}>Buka Blokir Peserta</NavLinks> */}
                  {/* <NavLinks to="/admin/perusahaan/block/" onClick={toggleHome}>Buka Blokir Perusahaan</NavLinks> */}
                  <NavLinks to="/admin/peserta/registrasi/" onClick={toggleHome}>Registrasi Peserta</NavLinks>
                  <NavLinks to="/admin/perusahaan/registrasi/" onClick={toggleHome}>Registrasi Perusahaan</NavLinks>
                  <NavLinks to="/admin/tanya-dplk/" onClick={toggleHome}>Tanya DPLK</NavLinks>
                </NavDropdown>
              </NavItems>
              {dataUser.role !== 'administrator' && (
                <NavItems>
                  <NavDropdown title="Tentang Kami">
                    <NavLinks to="/admin/about/manajemen/" onClick={toggleHome}>Manajemen</NavLinks>
                    <NavLinks to="/admin/about/penghargaan/" onClick={toggleHome}>Penghargaan</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {dataUser.role !== 'administrator' && (
                <NavItems>
                  <NavDropdown title="Media">
                    <NavLinks to="/admin/media/berita/" onClick={toggleHome}>Berita</NavLinks>
                    <NavLinks to="/admin/media/video/" onClick={toggleHome}>Video</NavLinks>
                    <NavLinks to="/admin/media/slider/" onClick={toggleHome}>Slider</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {dataUser.role !== 'administrator' && (
                <NavItems>
                  <NavDropdown title="Dokumen">
                    <NavLinks to="/admin/dokumen/report/" onClick={toggleHome}>Report</NavLinks>
                    <NavLinks to="/admin/dokumen/bantuan/" onClick={toggleHome}>Bantuan</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {dataUser.role === 'administrator' && (
                <NavItems>
                  <NavDropdown title="User Admin">
                    <NavLinks to="/admin/user/create/" onClick={toggleHome}>Buat Admin Baru</NavLinks>
                    <NavLinks to="/admin/user/reset-password/" onClick={toggleHome}>Reset Password Admin</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {dataUser.role !== 'operator' && (
                <NavItems>
                  <NavDropdown title="Parameter">
                    <NavLinks to="/admin/parameter/investasi/" onClick={toggleHome}>Paket Investasi</NavLinks>
                  </NavDropdown>
                </NavItems>
              )}
              {dataUser.role === 'administrator' && (
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
