import React from 'react';
import {
  NotFoundContainer,
  NotFoundWrapper,
  NotFoundRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrap,
  Img,
} from './NotFoundElements';

const NotFoundSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headline,
  darkText,
  description,
  alt,
  img,
}) => {
  return (
    <>
      <NotFoundContainer lightBg={lightBg} id={id}>
        <NotFoundWrapper>
          <NotFoundRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </NotFoundRow>
        </NotFoundWrapper>
      </NotFoundContainer>
    </>
  );
};

export default NotFoundSection;
