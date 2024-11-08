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
  FormLabel,
  FormInput
} from './DashboardElements';
import SuccessModal from '../Modal/Success';

const Visit = ({
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
  const [modalMessage, setModalMessage] = useState('');
  const [keterangan, setKeterangan] = useState('');

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
          setIsModalOpen(true);
        }
      );
    } else {
      setModalMessage('Geolocation is not supported by this browser.');
      setIsModalOpen(true);
    }
  };

  const checkAttendance = async () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/absen/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHasClockedIn(response.data.content.hasClockedIn);
        setHasClockedOut(response.data.content.hasClockedOut);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClockIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!lat || !lon) {
      setModalMessage('Location is missing.');
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    if (!keterangan) {
      setModalMessage('Keterangan is required.');
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    if (userData) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/absen/visit/clock-in`, {
          latitude: lat,
          longitude: lon,
          keterangan
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.content.stabsen === 'T') {
          setModalMessage('Absensi berhasil! Anda datang terlambat!');
        } else if (response.data.content.stabsen === 'H') {
          setModalMessage('Absensi berhasil! Anda datang tepat waktu!');
        } else {
          setModalMessage('Absensi berhasil!');
        }

        setIsModalOpen(true);
        setHasClockedIn(true);
      } catch (error) {
        setModalMessage(error.response.data.message || 'Terjadi kesalahan saat absen.');
        setIsModalOpen(true);
      }
    }
  };

  const handleClockOut = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!lat || !lon) {
      setModalMessage('Location is missing.');
      setIsModalOpen(true);
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

        setModalMessage('Anda telah absen keluar!');
        setIsModalOpen(true);
        setHasClockedOut(true);
      } catch (error) {
        setModalMessage(error.response?.data?.message || 'Terjadi kesalahan saat absen.');
      } finally {
        setIsModalOpen(true);
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
                      <FormLabel>Keterangan Visit</FormLabel>
                      <FormInput 
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                        placeholder="Masukkan keterangan"
                      />
                    </DashboardTextWrapper>
                    {!hasClockedIn ? (
                      <BtnWrap>
                        <BtnLink onClick={handleClockIn} disabled={loading}>
                          {loading ? 'Loading...' : 'Clock In'}
                        </BtnLink>
                      </BtnWrap>
                    ) : !hasClockedOut ? (
                      <BtnWrap>
                        <BtnLink onClick={handleClockOut} disabled={loading}>
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
      </DashboardContainer>
    </>
  );
};

export default Visit;
