import React from 'react';
import {
  DashboardContainer,
  DashboardWrapper,
  DashboardRow,
  DashboardCard,
  Column1,
  Column2,
  TextWrapper,
  Heading,
  Title,
  Subtitle,
  ImgWrap,
  Img,
  DashboardCardWrapper,
  DashboardTextWrapper,
  BtnWrap,
  BtnLink,
} from './DashboardElements';
import { animateScroll as scroll } from 'react-scroll';

const Dashboard = ({
  lightBg,
  id,
  imgStart,
  lightText,
  headline,
  darkText,
  alt,
  img,
  userData,
}) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <DashboardContainer lightBg={lightBg} id={id}>
        <DashboardWrapper>
          <DashboardRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <DashboardCard> 
                  <DashboardCardWrapper>
                    <DashboardTextWrapper>
                      <Title darkText={darkText}>{userData.nama}</Title>
                      <Subtitle darkText={darkText}>{userData.userId}</Subtitle>
                    </DashboardTextWrapper>
                    <BtnWrap>
                      <BtnLink to='/perusahaan/ubah-password/' onClick={toggleHome} >Ubah Password</BtnLink>
                    </BtnWrap>
                  </DashboardCardWrapper>
                </DashboardCard>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </DashboardRow>
        </DashboardWrapper>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
