import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
  FormH1,
  FormH2,
  Text,
  FormH3,
  FormInputRight,
  FormInputCustomRight,
  FormSpanRight,
} from './SignElements';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../MessageElements';
import { animateScroll as scroll } from 'react-scroll';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  // Gunakan useMemo untuk membuat cookies hanya sekali
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    const token = cookies.get('token');
    const role = cookies.get('role');

    if (token && role === 'perusahaan') {
      history.push('/perusahaan/dashboard');
    }
  }, [history, cookies]);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + '/perusahaan/login', {
        username,
        password,
        role: 'perusahaan'
      });

      const { content } = response.data;

      // Simpan token ke cookie
      cookies.set('token', content.token, { path: '/', maxAge: 3600 }); // Token expires in 1 hour

      // Simpan username dan role ke cookie
      cookies.set('username', content.username, { path: '/' });
      cookies.set('role', content.role, { path: '/' });
      cookies.set('id', content.id, { path: '/' });

      // Arahkan ke halaman dashboard setelah login berhasil
      history.push('/perusahaan/dashboard/');
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
              <FormH1>MyDPLK</FormH1>
              <FormH2>
                Masukkan Nomor Peserta dan Password Anda untuk Login ke akun Anda.
              </FormH2>
              {error &&
               <ErrorCard>
                <MessageH1><b>Gagal!</b></MessageH1>
                <MessageH2>{error}</MessageH2>
               </ErrorCard>
               }
              <FormLabel htmlFor="for">Nomor Peserta</FormLabel>
              <FormInput htmlFor="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInputRight>
                <FormInputCustomRight
                  htmlFor="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormSpanRight onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </FormSpanRight>
              </FormInputRight>
              <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Masuk'}</FormButton>
              <Text to="/perusahaan/lupa-password/" onClick={toggleHome}>Lupa Password?</Text>
              <FormH3>Belum punya akun? <Text to="/perusahaan/create/" onClick={toggleHome}>Sign Up</Text></FormH3>
              <FormH3>Bukan peserta perusahaan? <Text to="/peserta/" onClick={toggleHome}>Login Individu</Text></FormH3>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
