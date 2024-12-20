import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/LogoPensiunHijrahWidth.png';
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
  NavLinkS,
  SubMenu,
  SubMenuItem
} from './NavbarElements';
import { NavDropdown } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [showIndividuSubMenu, setShowIndividuSubMenu] = useState(false);
  const [showNonIndividuSubMenu, setShowNonIndividuSubMenu] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <Navlogo to="/" onClick={toggleHome}>
              <NavIcon src={Logo} />
            </Navlogo>
            <MobileIcons onClick={toggle}>
              <FaBars />
            </MobileIcons>
            <NavMenu>
              <NavItems>
                <NavDropdown title="Tentang Kami">
                  <NavLinks to="/about/dplk/" onClick={toggleHome}>Tentang DPLK</NavLinks>
                  <NavLinks to="/about/manajemen/" onClick={toggleHome}>Manajemen</NavLinks>
                  <NavLinks to="/about/lokasi/" onClick={toggleHome}>Lokasi Kantor</NavLinks>
                  <NavLinks to="/about/penghargaan/" onClick={toggleHome}>Penghargaan</NavLinks>
                  <NavLinkS href="https://www.bankmuamalat.co.id/" target="_blank">Bank Muamalat</NavLinkS>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Produk">
                  <NavLinks
                    to="#"
                    onMouseEnter={() => setShowIndividuSubMenu(true)}
                    onMouseLeave={() => setShowIndividuSubMenu(false)}
                  >
                    Individu
                    {showIndividuSubMenu && (
                      <SubMenu>
                        <SubMenuItem to="/product/pensiun-hijrah/" onClick={toggleHome}>Pensiun Hijrah</SubMenuItem>
                      </SubMenu>
                    )}
                  </NavLinks>
                  <NavLinks
                    to="#"
                    onMouseEnter={() => setShowNonIndividuSubMenu(true)}
                    onMouseLeave={() => setShowNonIndividuSubMenu(false)}
                  >
                    Non-Individu
                    {showNonIndividuSubMenu && (
                      <SubMenu>
                        <SubMenuItem to="/product/pensiun-hijrah/" onClick={toggleHome}>Pensiun Hijrah</SubMenuItem>
                        <SubMenuItem to="/product/pensiun-hijrah-pasca-kerja/" onClick={toggleHome}>Pensiun Hijrah Pasca Kerja</SubMenuItem>
                        <SubMenuItem to="/product/pensiun-hijrah-eksekutif/" onClick={toggleHome}>Pensiun Hijrah Eksekutif</SubMenuItem>
                      </SubMenu>
                    )}
                  </NavLinks>
                  <NavLinks to="/product/zakat-dana-pensiun/" onClick={toggleHome}>Zakat Dana Pensiun</NavLinks>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Simulasi">
                  <NavLinks to="/simulasi/" onClick={toggleHome}>Berdasarkan Iuran</NavLinks>
                  <NavLinks to="/simulasi/based-on-needs/" onClick={toggleHome}>Berdasarkan Kebutuhan</NavLinks>
                </NavDropdown>
              </NavItems>
              <NavItems>
                <NavDropdown title="Pusat Media">
                  <NavLinks to="/media/investasi/" onClick={toggleHome}>Fund Fact Sheet</NavLinks>
                  <NavLinks to="/media/keuangan/" onClick={toggleHome}>Laporan Keuangan</NavLinks>
                  <NavLinks to="/media/dewan-pengawas/" onClick={toggleHome}>Laporan Dewan Pengawas</NavLinks>
                  <NavLinks to="/media/berita/" onClick={toggleHome}>Berita</NavLinks>
                  <NavLinks to="/media/pengumuman/" onClick={toggleHome}>Pengumuman</NavLinks>
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
              <NavBtnLink to="/peserta/" onClick={toggleHome}>Masuk</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;