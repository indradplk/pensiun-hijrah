import React from 'react';
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
import { dataServer } from '../../DataServer';

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
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const handleDownloadAbout = () => {
    window.open(`${dataServer.href}/bantuan/panduan/c9fbcdd6-a970-4b17-8119-8bc35c65f86b.pdf`, '_blank');
  };

  const handleDownloadInvestasi = () => {
    window.open(`${dataServer.href}/bantuan/panduan/d7daec28-d377-40ef-bb26-11556ab7e7cc.pdf`, '_blank');
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
