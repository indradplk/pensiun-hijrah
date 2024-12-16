import React from 'react';
import DPLK from '../../../../assets/images/DPLK.png';
import BMI from '../../../../assets/images/BMI.png';
import BPKH from '../../../../assets/images/BPKH.png';
import {
  FooterContainer,
  FooterWrap,
  SocialLogo,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
  SocialLogoIcon,
  SocialMediaColumn,
  SocialIconsColumn,
  SocialIconLink,
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
            <SocialMediaColumn>
              <SocialIconsColumn>
                <SocialIconLink
                  href='https://www.dplksyariahmuamalat.co.id/'
                  target='_blank'
                  aria-label='DPLK'
                >
                  <SocialLogoIcon src={DPLK} />
                </SocialIconLink>
                <SocialIconLink
                  href='https://www.bankmuamalat.co.id/'
                  target='_blank'
                  aria-label='BMI'
                >
                  <SocialLogoIcon src={BMI} />
                </SocialIconLink>
                <SocialIconLink
                  href='https://bpkh.go.id/'
                  target='_blank'
                  aria-label='BPKH'
                >
                  <SocialLogoIcon src={BPKH} />
                </SocialIconLink>
              </SocialIconsColumn>
            </SocialMediaColumn>
            <WebsiteRights>
              DPLK Syariah Muamalat terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK)<br/>
              Pensiun Hijrah © {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
