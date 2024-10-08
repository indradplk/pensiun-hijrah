import React from 'react';
import {
  KontakContainer,
  KontakWrapper,
  KontakRow,
  KontakCard,
  Column1,
  Column2,
  TextWrapper,
  Heading,
  Title,
  Subtitle,
  ImgWrap,
  Img,
  KontakCardWrapper,
  KontakTextWrapper,
  Icon,
} from './KontakElements';

const KontakSection = ({
  lightBg,
  id,
  imgStart,
  lightText,
  headline,
  darkText,
  title1,
  title2,
  title3,
  description1,
  description2,
  description3,
  img1,
  img2,
  img3,
  alt,
  img,
}) => {

  return (
    <>
      <KontakContainer lightBg={lightBg} id={id}>
        <KontakWrapper>
          <KontakRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <KontakCard> 
                  <KontakCardWrapper>
                    <Icon src={img1} />
                    <KontakTextWrapper>
                      <Title darkText={darkText}>{title1}</Title>
                      <Subtitle darkText={darkText}>{description1}</Subtitle>
                    </KontakTextWrapper>
                  </KontakCardWrapper>
                </KontakCard>
                <KontakCard> 
                  <KontakCardWrapper>
                    <Icon src={img2} />
                    <KontakTextWrapper>
                      <Title darkText={darkText}>{title2}</Title>
                      <Subtitle darkText={darkText}>{description2}</Subtitle>
                    </KontakTextWrapper>
                  </KontakCardWrapper>
                </KontakCard>
                <KontakCard> 
                  <KontakCardWrapper>
                    <Icon src={img3} />
                    <KontakTextWrapper>
                      <Title darkText={darkText}>{title3}</Title>
                      <Subtitle darkText={darkText}>{description3}</Subtitle>
                    </KontakTextWrapper>
                  </KontakCardWrapper>
                </KontakCard>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </KontakRow>
        </KontakWrapper>
      </KontakContainer>
    </>
  );
};

export default KontakSection;
