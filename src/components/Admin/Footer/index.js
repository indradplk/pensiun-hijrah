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
