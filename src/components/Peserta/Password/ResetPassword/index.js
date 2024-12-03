import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
} from './ResetPasswordElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import { animateScroll as scroll } from 'react-scroll';

const ResetPasswordPeserta = ({ userData }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, [userData.username]);

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/ppip/peserta/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNama(response.data.content[0].nama_lengkap);
        setUserId(response.data.content[0].no_peserta);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUserData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/user/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmail(response.data.content.pesertaEmail);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + `/peserta/${userData.username}`,
        {
          email: email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { message } = response.data;
      setSuccess(message);

      setTimeout(() => {
        setSuccess('');
        history.push('/peserta/dashboard');
        scroll.scrollToTop();
      }, 3000);

      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }

      setTimeout(() => {
        setError('');
      }, 3000);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormLabel htmlFor="nama">Nama</FormLabel>
              <FormInput id="nama" type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} disabled />
              <FormLabel htmlFor="userId">Nomor Peserta</FormLabel>
              <FormInput id="userId" type="text" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} disabled />
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <FormLabel htmlFor="currentPassword">Password Saat Ini</FormLabel>
              <FormInput id="currentPassword" type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <FormLabel htmlFor="newPassword">Password Baru</FormLabel>
              <FormInput id="newPassword" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              {error && (
                <ErrorCard>
                  <MessageH1><b>Gagal!</b></MessageH1>
                  <MessageH2>{error}</MessageH2>
                </ErrorCard>
              )}
              {success && (
                <SuccessCard>
                  <MessageH1><b>Berhasil!</b></MessageH1>
                  <MessageH2>{success}</MessageH2>
                </SuccessCard>
              )}
              <FormButton type="submit" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ResetPasswordPeserta;
