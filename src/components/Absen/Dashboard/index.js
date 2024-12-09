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
import SuccessModal from '../Modal/Success';
import ErrorModal from '../Modal/Error';

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
  const cookies = new Cookies();
  const token = cookies.get('token');
  
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error(error);
          setModalMessage('Geolocation failed. Please allow location access.');
          setIsErrorModalOpen(true);
        }
      );
    } else {
      setModalMessage('Geolocation is not supported by this browser.');
      setIsErrorModalOpen(true);
    }
  };

  const checkAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `/absen/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setHasClockedIn(response.data.content.hasClockedIn);
      setHasClockedOut(response.data.content.hasClockedOut);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!lat || !lon) {
      setModalMessage('Location not found.');
      setIsErrorModalOpen(true);
      setLoading(false);
      return;
    }

    if (userData) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/absen/clock-in`, {
          latitude: lat,
          longitude: lon
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.content.stabsen === 'T') {
          setModalMessage('Absensi berhasil! Astagfirullah, Anda datang terlambat!');
        } else if (response.data.content.stabsen === 'H') {
          setModalMessage('Absensi berhasil! Alhamdulillah, Anda datang tepat waktu!');
        } else {
          setModalMessage('Absensi berhasil!');
        }

        setIsModalOpen(true);
        setHasClockedIn(true);
      } catch (error) {
        setModalMessage(error.response?.data?.message || 'Terjadi kesalahan saat absen.');
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClockOut = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!lat || !lon) {
      setModalMessage('Location not found.');
      setIsErrorModalOpen(true);
      setLoading(false);
      return;
    }

    if (userData) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/absen/clock-out`, {
          latitude: lat,
          longitude: lon
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setModalMessage('Anda telah absen keluar! Hati-hati di jalan ya!');
        setIsModalOpen(true);
        setHasClockedOut(true);
      } catch (error) {
        setModalMessage(error.response?.data?.message || 'Terjadi kesalahan saat absen.');
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkAttendance();
    getLocation();
  }, [userData.username]);  

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
                      <Subtitle darkText={darkText}>{userData.username}</Subtitle>
                    </DashboardTextWrapper>
                    {!hasClockedIn ? (
                      <BtnWrap>
                        <BtnLink onClick={handleClockIn} disabled={loading || hasClockedIn}>
                          {loading ? 'Loading...' : 'Clock In'}
                        </BtnLink>
                      </BtnWrap>
                    ) : !hasClockedOut ? (
                      <BtnWrap>
                        <BtnLink onClick={handleClockOut} disabled={loading || hasClockedOut}>
                          {loading ? 'Loading...' : 'Clock Out'}
                        </BtnLink>
                      </BtnWrap>
                    ) : null}
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
        <SuccessModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          message={modalMessage}
        />
        <ErrorModal
          show={isErrorModalOpen}
          onHide={() => setIsErrorModalOpen(false)}
          message={modalMessage}
        />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
