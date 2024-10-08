import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
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
  lightBg, id, imgStart, lightText, headline, darkText, alt, img, userData,
}) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const [dataUser, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, [userData.username]);  

  const fetchData = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/user/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.content);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          console.error(error.response.data.message);
        } else {
          console.error('Terjadi kesalahan. Silakan coba lagi.');
        }
      });
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
                      <Title darkText={darkText}>{dataUser.username}</Title>
                      <Subtitle darkText={darkText}>{dataUser.pesertaEmail}</Subtitle>
                    </DashboardTextWrapper>
                    <BtnWrap>
                      <BtnLink to='/peserta/ubah-password/' onClick={toggleHome} >Ubah Password</BtnLink>
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
