import React from 'react';
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

const Sidebar = ({ isOpen, toggle }) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <Heading><b>Tentang Kami</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/about/pensiun-hijrah/" onClick={toggleHome}>
              Tentang Pensiun Hijrah
            </SidebarLink>
            <SidebarLink to="/about/manajemen/" onClick={toggleHome}>
              Manajemen
            </SidebarLink>
            <SidebarLink to="/about/lokasi/" onClick={toggleHome}>
              Lokasi Kantor
            </SidebarLink>
            <SidebarLink to="/about/penghargaan/" onClick={toggleHome}>
              Penghargaan
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Produk Individu</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/product/pensiun-hijrah/" onClick={toggleHome}>
              Pensiun Hijrah
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Produk Non-Individu</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/product/pensiun-hijrah/" onClick={toggleHome}>
              Pensiun Hijrah
            </SidebarLink>
            <SidebarLink to="/product/pensiun-hijrah-pasca-kerja/" onClick={toggleHome}>
              Pensiun Hijrah Pasca Kerja
            </SidebarLink>
            <SidebarLink to="/product/pensiun-hijrah-eksekutif/" onClick={toggleHome}>
            Pensiun Hijrah Eksekutif
            </SidebarLink>
          </SidebarSubMenu>
        </SidebarMenu>
        <SidebarMenu>
          <Heading><b>Produk Lainnya</b></Heading>
          <SidebarSubMenu>
            <SidebarLink to="/product/zakat-dana-pensiun/" onClick={toggleHome}>
              Zakat Dana Pensiun
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
          <SidebarRoute to="/peserta/">Masuk</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
