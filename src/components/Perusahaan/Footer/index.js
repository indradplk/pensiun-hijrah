import React from 'react';
import Logo from '../../../assets/images/LogoPensiunHijrah.png';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  FooterLinkWrapper,
  FooterLinkItems,
  FooterLinkContainer,
  FooterLinkTitle,
  FooterLink,
  SocialIconLink,
  SocialIcons,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
  SocialLogoIcon,
} from './FooterElements';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinkContainer>
          <FooterLinkWrapper>
            <FooterLinkItems>
              <FooterLinkTitle><b>Tentang Kami</b></FooterLinkTitle>
              <FooterLink to="/about/dplk/" onClick={toggleHome}>Tentang DPLK</FooterLink>
              <FooterLink to="/about/manajemen/" onClick={toggleHome}>Manajemen</FooterLink>
              <FooterLink to="/about/lokasi/" onClick={toggleHome}>Lokasi Kantor</FooterLink>
              <FooterLink to="/about/penghargaan/" onClick={toggleHome}>Penghargaan</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle><b>Produk</b></FooterLinkTitle>
              <FooterLink to="/product/pensiun-hijrah/" onClick={toggleHome}>Pensiun Hijrah</FooterLink>
              <FooterLink to="/product/pensiun-hijrah-pasca-kerja/" onClick={toggleHome}>Pensiun Hijrah Pasca Kerja</FooterLink>
              <FooterLink to="/product/pensiun-hijrah-eksekutif/" onClick={toggleHome}>Pensiun Hijrah Eksekutif</FooterLink>
              <FooterLink to="/product/zakat-dana-pensiun/" onClick={toggleHome}>Zakat Dana Pensiun</FooterLink>
            </FooterLinkItems>
          </FooterLinkWrapper>

          <FooterLinkWrapper>
            <FooterLinkItems>
              <FooterLinkTitle><b>Simulasi</b></FooterLinkTitle>
              <FooterLink to="/simulasi/" onClick={toggleHome}>Berdasarkan Iuran</FooterLink>
              <FooterLink to="/simulasi/based-on-needs/" onClick={toggleHome}>Berdasarkan Kebutuhan</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle><b>Pusat Media</b></FooterLinkTitle>
              <FooterLink to="/media/keuangan/" onClick={toggleHome}>Laporan Keuangan</FooterLink>
              <FooterLink to="/media/dewan-pengawas/" onClick={toggleHome}>Laporan Dewan Pengawas</FooterLink>
              <FooterLink to="/media/investasi/" onClick={toggleHome}>Fund Fact Sheet</FooterLink>
              <FooterLink to="/media/berita/" onClick={toggleHome}>Berita</FooterLink>
              <FooterLink to="/media/pengumuman/" onClick={toggleHome}>Pengumuman</FooterLink>
              <FooterLink to="/media/video/" onClick={toggleHome}>Video</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle><b>Bantuan</b></FooterLinkTitle>
              <FooterLink to="/bantuan/panduan/" onClick={toggleHome}>Panduan</FooterLink>
              <FooterLink to="/bantuan/formulir/" onClick={toggleHome}>Download Formulir</FooterLink>
              <FooterLink to="/bantuan/faq/" onClick={toggleHome}>Sering Ditanyakan</FooterLink>
              <FooterLink to="/bantuan/kontak/" onClick={toggleHome}>Hubungi Kami</FooterLink>
            </FooterLinkItems>
          </FooterLinkWrapper>
        </FooterLinkContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              <SocialLogoIcon src={Logo} />
            </SocialLogo>
            <WebsiteRights>
              Pensiun Hijrah © {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink
                href="https://www.facebook.com/dplksyariah.muamalat.5"
                target="_blank"
                arial-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com/dplksyariahmuamalat/"
                target="_blank"
                arial-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink
                href="https://youtube.com/@dplksyariahmuamalat3802?si=um9rfefCu_6gvJYI"
                target="_blank"
                arial-label="Youtube"
              >
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink
                href="https://wa.me/6281333393820"
                target="_blank"
                arial-label="WhatsApp"
              >
                <FaWhatsapp />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
