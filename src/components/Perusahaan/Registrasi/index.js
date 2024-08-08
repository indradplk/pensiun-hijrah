import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  FormCardWrapper,
  FormDiv,
  FormH3,
  FormH2,
  FormH1,
  FormInputWrapper,
  FormInputDiv,
  FormText,
  FormRupiahLeft,
  FormSpanLeft,
  FormInputCustomLeft,
  FormAgreeLeft
} from './RegistrasiElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import SuccessModal from '../Modal/Sukses';
import { dataServer } from '../../DataServer';

const Registrasi = () => {
  const [formData, setFormData] = useState({
    nama: '',
    pic: '', 
    jabatan: '', 
    no_telepon: '',
    email: ''
  });
  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      const response = await axios.post(`${dataServer.href}/api/v1/mail/registrasi-perusahaan`, {
        nama: formData.nama,
        pic: formData.pic,
        jabatan: formData.jabatan,
        no_telepon: formData.no_telepon,
        email: formData.email,
      });
      console.log(response.data);
      setSuccess('Registrasi Perusahaan berhasil diproses! Tunggu balasan kami melalui email Anda.');
      setShowModal(true);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Gagal melakukan registrasi. Silakan coba lagi.');
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
              <FormH1>Data Perusahaan</FormH1>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="nama">Nama Perusahaan</FormLabel>
                  <FormInput id="nama" type="text" name="nama" value={formData.nama} onChange={handleChange} />
                  <FormLabel htmlFor="pic">Nama Penanggung Jawab</FormLabel>
                  <FormInput id="pic" type="text" name="pic" value={formData.pic} onChange={handleChange} />
                  <FormLabel htmlFor="jabatan">Jabatan Penanggung Jawab</FormLabel>
                  <FormInput id="jabatan" type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} />
                </FormDiv>
                <FormDiv>
                  <FormLabel htmlFor="email">Email Penanggung Jawab</FormLabel>
                  <FormInput id="email" type="text" name="email" value={formData.email} onChange={handleChange} />
                  <FormLabel htmlFor="no_telepon">Kontak Penanggung Jawab</FormLabel>
                  <FormInput id="no_telepon" type="text" name="no_telepon" value={formData.no_telepon} onChange={handleChange} />
                </FormDiv>
              </FormCardWrapper>
              <FormDiv>
                {error && (
                  <ErrorCard>
                    <MessageH1><b>Gagal!</b></MessageH1>
                    <MessageH2>{error}</MessageH2>
                  </ErrorCard>
                )}
                {success && (
                  <SuccessModal show={showModal} onLogin={() => history.push('/')} message={success} />
                )}
                <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Kirim'}</FormButton>
              </FormDiv>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Registrasi;
