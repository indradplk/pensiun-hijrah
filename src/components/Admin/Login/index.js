import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
import { dataServer } from '../../DataServer';

const SignInAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.post(`${dataServer.href}/api/v1/admin/auth`, {}, { withCredentials: true });
        if (response.data.adminId) {
          history.push('/admin/dashboard/');
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkSession();
  }, [history]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/admin/login`, {
        email: email,
        password: password,
      }, { withCredentials: true });
      console.log(response.data);
      history.push('/admin/dashboard/');
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
              <Icon to="/"><NavIcon src={Logo} /></Icon>
              {error &&
               <ErrorCard>
                <MessageH1><b>Gagal!</b></MessageH1>
                <MessageH2>{error}</MessageH2>
               </ErrorCard>
               }
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput htmlFor="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default SignInAdmin;
