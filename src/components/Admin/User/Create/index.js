import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
  FormSelect,
  FormOption
} from '../PasswordElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import { animateScroll as scroll } from 'react-scroll';

const CreateAdminPage = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNIK] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/admin/register', 
        {
          nama: nama,
          username: nik,
          email: email,
          role: role
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { message } = response.data;
      setSuccess(message);

      setTimeout(() => {
        setSuccess('');
        history.push('/admin/dashboard/');
        scroll.scrollToTop();
      }, 3000);

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
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleSubmit}>
            <FormLabel htmlFor="nama">Nama</FormLabel>
            <FormInput id="nama" type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormLabel htmlFor="nik">Username (NIK)</FormLabel>
            <FormInput id="nik" type="text" name="nik" value={nik} onChange={(e) => setNIK(e.target.value)} />
            <FormLabel htmlFor="role">Role</FormLabel>
            <FormSelect id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} >
              <FormOption value="">Pilih Role</FormOption>
              <FormOption value="administrator">Administrator</FormOption>
              <FormOption value="supervisor">Supervisor</FormOption>
              <FormOption value="operator">Operator</FormOption>
            </FormSelect>
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
  );
};

export default CreateAdminPage;