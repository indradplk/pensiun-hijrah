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
  FormSelect,
  FormOption,
  FormText,
  FormH1,
  FormH2,
} from './MailElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import { dataServer } from '../../DataServer';

const Mail = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
    no_telp: ''
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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/mail/tanya-dplk`, {
        name: formData.name,
        subject: formData.topic,
        email: formData.email,
        text: formData.description,
        no_telp: formData.no_telp
      });
      console.log(response.data);
      setSuccess('Pesan berhasil terkirim! Tunggu balasan kami melalui email Anda.');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Gagal mengirim pesan. Silakan coba lagi.');
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
            <FormH1>Tanya DPLK</FormH1>
            <FormH2>
              Kami dengan senang hati menjawab setiap pertanyaan yang Anda miliki, cukup kirimkan pesan melalui formulir di bawah ini atau hubungi kami.
            </FormH2>
            <Form onSubmit={handleSubmit}>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <FormInput id="name" type="text" name="name" value={formData.name} onChange={handleChange} />

              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput id="email" type="email" name="email" value={formData.email} onChange={handleChange} />

              <FormLabel htmlFor="no_telp">Nomor Telepon/HP</FormLabel>
              <FormInput id="no_telp" type="text" name="no_telp" value={formData.no_telp} onChange={handleChange} />

              <FormLabel htmlFor="topic">Topik</FormLabel>
              <FormSelect id="topic" name="topic" value={formData.topic} onChange={handleChange}>
                <FormOption value="Tanya DPLK - Pertanyaan Umum">Pertanyaan Umum</FormOption>
                <FormOption value="Tanya DPLK - Informasi Produk">Informasi Produk</FormOption>
                <FormOption value="Tanya DPLK - Kendala Teknis di Website">Kendala Teknis di Website</FormOption>
                <FormOption value="Tanya DPLK - Transaksi">Transaksi</FormOption>
                <FormOption value="Tanya DPLK - MDIN">Muamalat DIN</FormOption>
              </FormSelect>

              <FormLabel htmlFor="description">Deskripsi</FormLabel>
              <FormText id="description" name="description" value={formData.description} onChange={handleChange} />
              
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

              <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Kirim'}</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Mail;
