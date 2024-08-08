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
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../MessageElements';
import { animateScroll as scroll } from 'react-scroll';
import { dataServer } from '../../DataServer';

const SignUpSection = () => {
  const [no_peserta, setNoPeserta] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/perusahaan/register`, {
        no_peserta: no_peserta,
        email: email,
        password: password,
      }, { withCredentials: true });
      console.log(response.data);
      setSuccess('Registrasi Akun Anda berhasil! Silakan login!');
      setTimeout(() => {
        setSuccess('');
      }, 2000);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
      setSuccess('');
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={handleSignUp}>
              <FormH1>MyDPLK</FormH1>
              <FormH2>
                Masukkan Nomor Peserta, Email dan Password yang akan Anda gunakan.
              </FormH2>
              <FormLabel htmlFor="for">Nomor Peserta</FormLabel>
              <FormInput htmlFor="no_peserta" type="text" value={no_peserta} onChange={(e) => setNoPeserta(e.target.value)} />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput htmlFor="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Masuk'}</FormButton>
              <Text to="/perusahaan/" onClick={toggleHome}>Sudah punya akun?</Text>
              <FormH3>Bukan peserta perusahaan? <Text to="/peserta/create/" onClick={toggleHome}>Sign Up Individu</Text></FormH3>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignUpSection;
