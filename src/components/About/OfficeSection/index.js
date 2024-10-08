import React from 'react';
import {
  OfficeContainer,
  OfficeWrapper,
  OfficeRow,
  Column1,
  Column2,
  TextWrapper,
  Heading,
  Subtitle,
  ImgWrap,
  Img,
} from './OfficeElements';

const Office = ({
  lightBg,
  id,
  imgStart,
  lightText,
  headline,
  darkText,
  description,
  alt,
  img,
}) => {
  return (
    <>
      <OfficeContainer lightBg={lightBg} id={id}>
        <OfficeWrapper>
          <OfficeRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </OfficeRow>
        </OfficeWrapper>
      </OfficeContainer>
    </>
  );
};

export default Office;
