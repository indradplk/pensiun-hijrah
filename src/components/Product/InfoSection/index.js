import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  Column2,
  TextWrapper,
  Heading,
  Subtitle,
  ImgWrap,
  Img,
  BtnWrap,
  BtnLink,
} from './InfoElements';
import { animateScroll as scroll } from 'react-scroll';

const Info = ({
  lightBg,
  id,
  imgStart,
  lightText,
  headline,
  darkText,
  description1,
  description2,
  alt,
  img,
  buttonLabel,
  link,
}) => {
  const [pojkData, setPojkData] = useState([]);
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/panduan?kategori=pojk&status=true')
      .then((response) => {
        setPojkData(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleDownloadAbout = () => {
    if (pojkData.length > 0) {
      window.open(`/panduan/${pojkData[0].path_panduan}`, '_blank');
    }
  };
  
  const handleDownloadInvestasi = () => {
    if (pojkData.length > 1) {
      window.open(`/panduan/${pojkData[1].path_panduan}`, '_blank');
    }
  };

  const onClickHandler = id === 'about' ? handleDownloadAbout : (id === 'investasi' ? handleDownloadInvestasi : toggleHome);

  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description1}</Subtitle>
                <Subtitle darkText={darkText}>{description2}</Subtitle>
                <BtnWrap>
                <BtnLink to={link} onClick={onClickHandler}>{buttonLabel}</BtnLink>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default Info;
