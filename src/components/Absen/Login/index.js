import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from '../../../assets/images/LogoDPLKSyariah.png';
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
  NavIcon,
} from './SigninElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../MessageElements';

const SignInAbsen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  // Gunakan useMemo untuk membuat cookies hanya sekali
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    const token = cookies.get('token');
    const role = cookies.get('role');

    if (token && (role === 'Staff' || role === 'Supervisor' || role === 'Manager')) {
      history.push('/absen/dashboard');
    }
  }, [history, cookies]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/hris/login', {
        username,
        password
      });

      const { content } = response.data;

      // Simpan token ke cookie
      cookies.set('token', content.token, { path: '/', maxAge: 3600 }); // Token expires in 1 hour

      // Simpan username dan role ke cookie
      cookies.set('username', content.username, { path: '/' });
      cookies.set('role', content.role, { path: '/' });
      cookies.set('nama', content.nama, { path: '/' });
      cookies.set('lokasi', content.lokasi, { path: '/' });

      // Arahkan ke halaman dashboard setelah login berhasil
      history.push('/absen/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={handleSignIn}>
              <Icon to="/"><NavIcon src={Logo} /></Icon>
              {error &&
               <ErrorCard>
                <MessageH1><b>Gagal!</b></MessageH1>
                <MessageH2>{error}</MessageH2>
               </ErrorCard>
               }
              <FormLabel htmlFor="for">Username</FormLabel>
              <FormInput htmlFor="username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput htmlFor="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Masuk'}</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignInAbsen;
