import React, { useState, useEffect } from 'react';
import { Button } from '../ButtonElements';
import { animateScroll as scroll } from 'react-scroll';
import {
  NewsItemContainer,
  NewsItemWrapper,
  NewsItemIcon,
  SocialLogoIcon,
  BtnWrap,
  InvestasiCard,
  InvestasiCardWrapper,
  NewsItemH2,
  BtnLink,
  Text
} from './NewsItemElements';

const TelkomselSection = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const handleDownload = () => {
    window.open(`/telkomsel/Biaya Spesial DPLK Syariah Muamalat.png`, '_blank');
  };

  return (
    <NewsItemContainer>
      <NewsItemWrapper>
        <NewsItemIcon src={`Mengapa DPLK Syariah Muamalat.png`} />
        <Text to="#" onClick={() => handleDownload()}>*Klik untuk detail biaya spesial</Text>
        <InvestasiCard>
          <BtnLink href="https://www.dplksyariahmuamalat.co.id/peserta/registrasi/" target="_blank">Daftar Sekarang</BtnLink>
          <NewsItemH2>*Masukkan kode “TELKOMSEL” pada kolom Nomor Referensi saat pendaftaran online</NewsItemH2>
          <BtnLink href="https://linktr.ee/muamalatXtelkomsel" target="_blank">Panduan Informasi</BtnLink><br/>
          <BtnLink href="https://linktr.ee/PICTelkomsel" target="_blank">Contact Person
          </BtnLink>
        </InvestasiCard>
      </NewsItemWrapper>
    </NewsItemContainer>
  );
};

export default TelkomselSection;
