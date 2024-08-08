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
import { dataServer } from '../../DataServer';

const SignIn = () => {
  const [no_peserta, setNoPeserta] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.post(`${dataServer.href}/api/v1/perusahaan/auth`, {}, { withCredentials: true });
        if (response.data.userId) {
          history.push('/perusahaan/dashboard/');
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkSession();
  }, [history]);

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
      const response = await axios.post(`${dataServer.href}/api/v1/perusahaan/login`, {
        no_peserta: no_peserta,
        password: password,
      }, { withCredentials: true });
      console.log(response.data);
      history.push('/perusahaan/dashboard/');
      scroll.scrollToTop();
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
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
              <FormInput htmlFor="no_peserta" type="text" value={no_peserta} onChange={(e) => setNoPeserta(e.target.value)} />
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
