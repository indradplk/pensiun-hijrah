import React, { useState } from 'react';
import {
  ProgramContainer,
  ProgramWrapper,
  ProgramIcon,
  ProgramCard,
  ProgramH2,
  BtnLink1,
  BtnLink2,
  BtnLink3,
  BtnLinks,
  PopupOverlay,
  PopupContent,
  PopupImage,
  PopupCloseButton
} from './ProgramElements';
import {
  FaTimes
} from 'react-icons/fa';

const TelkomselSection = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <ProgramContainer>
      <ProgramWrapper>
        <ProgramIcon src={`/telkomsel/Mengapa DPLK Syariah Muamalat.png`} />
        <ProgramCard>
          <BtnLink1 href="https://www.dplksyariahmuamalat.co.id/peserta/registrasi/">Daftar Sekarang</BtnLink1>
          <ProgramH2>*Masukkan kode <strong>TELKOMSEL</strong> pada kolom <br/> Nomor Referensi saat pendaftaran online</ProgramH2>
          <BtnLink2 href="https://linktr.ee/muamalatXtelkomsel" target="_blank">Panduan Informasi</BtnLink2>
          <BtnLinks to="#" onClick={handlePopupOpen}>Biaya Spesial</BtnLinks>
          <BtnLink3 href="https://linktr.ee/PICTelkomsel" target="_blank">Contact Person</BtnLink3>
        </ProgramCard>
      </ProgramWrapper>
      {isPopupVisible && (
        <PopupOverlay onClick={handlePopupClose}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupImage
              src={`/telkomsel/Biaya Spesial DPLK Syariah Muamalat.png`}
              alt="Biaya Spesial"
            />
          </PopupContent>
          <PopupCloseButton onClick={handlePopupClose}>
            <FaTimes size={20} />
          </PopupCloseButton>
        </PopupOverlay>
      )}
    </ProgramContainer>
  );
};

export default TelkomselSection;
