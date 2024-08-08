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
import { dataServer } from '../../../DataServer';

const LupaPasswordPeserta = () => {
  const [formData, setFormData] = useState({
    email: '',
    no_peserta: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/mail/forgot-password/peserta`, {
        no_peserta: formData.no_peserta,
        email: formData.email,
      });
      console.log(response.data);
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Masukkan Nomor Peserta dan Email yang terdaftar!');
      setTimeout(() => {
        setError('');
      }, 3000);
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
              <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
              <FormInput id="no_peserta" type="text" name="no_peserta" value={formData.no_peserta} onChange={handleChange} />
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
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

export default LupaPasswordPeserta;
