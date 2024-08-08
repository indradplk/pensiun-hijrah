import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { dataServer } from '../../../DataServer';

const ResetPasswordPerusahaan = ({ userData }) => {
  const [nama, setNama] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (userData) {
      setNama(userData.nama || '');
      setUserId(userData.userId || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const response = await axios.put(`${dataServer.href}/api/v1/perusahaan/${userData.userId}`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      setSuccess('Data berhasil disimpan.');
      setTimeout(() => {
        setSuccess('');
        history.push('/perusahaan/dashboard/');
        scroll.scrollToTop();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }
    setLoading(false);
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default ResetPasswordPerusahaan;
