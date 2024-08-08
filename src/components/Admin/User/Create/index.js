import React, { useState } from 'react';
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
import { dataServer } from '../../../DataServer';

const CreateAdminPage = ({ userData }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNIK] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${dataServer.href}/api/v1/admin/register`, {
        nama: nama,
        email: email,
        nik: nik,
        role: role,
        namaAdmin: userData.nama,
        userUpdate: userData.nik,
      });

      console.log(response.data);
      setSuccess('Data berhasil disimpan.');
      setTimeout(() => {
        setSuccess('');
        history.push('/admin/dashboard/');
        scroll.scrollToTop();
      }, 2000);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Terjadi kesalahan.');
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
    }

    setLoading(false);
  };

  return (
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleSubmit}>
            <FormLabel htmlFor="nama">Nama</FormLabel>
            <FormInput id="nama" type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <FormLabel htmlFor="nik">NIK</FormLabel>
            <FormInput id="nik" type="text" name="nik" value={nik} onChange={(e) => setNIK(e.target.value)} required />
            <FormLabel htmlFor="role">Role</FormLabel>
            <FormSelect id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <FormOption value="">Pilih Role</FormOption>
              <FormOption value="admin">Admin</FormOption>
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