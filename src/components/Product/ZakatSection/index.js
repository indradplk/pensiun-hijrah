import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ZakatContainer,
  ZakatWrapper,
  ZakatRow,
  Column1,
  Column2,
  TextWrapper,
  Heading,
  Subtitle,
  ImgWrap,
  Img,
  BtnWrap,
  BtnLink,
  Ayat,
} from './ZakatElements';
import { dataServer } from '../../DataServer';

const ZakatSection = ({
  lightBg,
  id,
  imgStart,
  lightText,
  headline,
  darkText,
  description,
  alt,
  img,
  buttonLabel,
}) => {
  const handleDownload = () => {
    window.open(`${dataServer.href}/bantuan/panduan/901e1a6d-e85d-440f-8b40-882f79f01867.pdf`, '_blank');
  };

  const [zakatData, setZakatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://equran.id/api/surat/51');
        setZakatData(response.data);
      } catch (error) {
        console.error('Error fetching Zakat data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ZakatContainer lightBg={lightBg} id={id}>
        <ZakatWrapper>
          <ZakatRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                {zakatData.ayat &&
                zakatData.ayat.map((item) => {
                  if (item.nomor === 19) {
                    return (
                      <div key={item.id}>
                        <Ayat darkText={darkText}>{item.ar}</Ayat>
                        <Subtitle darkText={darkText}>"{item.idn}" (QS. Az-Zariyat: 19)</Subtitle>
                      </div>
                    );
                  }
                  return null;
                })}
                <BtnWrap>
                  <BtnLink to='#' onClick={handleDownload}>{buttonLabel}</BtnLink>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </ZakatRow>
        </ZakatWrapper>
      </ZakatContainer>
    </>
  );
};

export default ZakatSection;
