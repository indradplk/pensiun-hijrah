import React from 'react';
import {
  DownloadContainer,
  DownloadWrapper,
  DownloadRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
  DownloadImg,
  Downloadlogo,
} from './DownloadElements';

const Download = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headline,
  darkText,
  description,
  alt,
  alt1,
  alt2,
  img,
  img1,
  img2,
}) => {
  return (
    <>
      <DownloadContainer lightBg={lightBg} id={id}>
        <DownloadWrapper>
          <DownloadRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                  <Downloadlogo href="https://play.google.com/store/apps/details?id=com.muamalatdin&hl=id" target="_blank" >
                    <DownloadImg src={img1} alt={alt1}></DownloadImg>
                  </Downloadlogo>
                  <Downloadlogo href="https://apps.apple.com/id/app/muamalat-din/id1481301137" target="_blank" >
                    <DownloadImg src={img2} alt={alt2}></DownloadImg>
                  </Downloadlogo>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </DownloadRow>
        </DownloadWrapper>
      </DownloadContainer>
    </>
  );
};

export default Download;
