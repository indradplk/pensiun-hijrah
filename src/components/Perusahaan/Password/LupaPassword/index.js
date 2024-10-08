import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
} from './LupaPasswordElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';

const LupaPasswordPerusahaan = () => {
  const [no_peserta, setNoPeserta] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/mail/forgot-password/perusahaan`, {
        no_peserta,
        email,
      });

      const { message } = response.data;
      setSuccess(message);
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
            <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
              <FormInput id="no_peserta" type="text" name="no_peserta" value={no_peserta} onChange={(e) => setNoPeserta(e.target.value)} />
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <FormButton type="submit" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim'}</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default LupaPasswordPerusahaan;
