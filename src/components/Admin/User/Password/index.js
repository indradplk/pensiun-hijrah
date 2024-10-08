import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormButton,
} from '../PasswordElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import PasswordAdminModal from '../../Modal/PasswordAdmin';

const ResetPasswordAdmin = () => {
  const [nik, setNIK] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const [pesertaData, setPesertaData] = useState({});
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleInputChange = (e) => {
    setNIK(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const response = await axios
        .get(process.env.REACT_APP_API_BASE_URL + `/user/${nik}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

      const data = response.data.content;

      if (data.role !== 'admin') {
        setError('User not found!');
        
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
  
      setPesertaData(data);
      setShowModal(true);
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
              <FormLabel htmlFor="nik">NIK</FormLabel>
              <FormInput id="nik" type="text" name="nik" value={nik} onChange={handleInputChange} />
              {error && (
                <ErrorCard>
                  <MessageH1><b>Gagal!</b></MessageH1>
                  <MessageH2>{error}</MessageH2>
                </ErrorCard>
              )}
              <FormButton type="submit" disabled={loading}>{loading ? 'Mencari...' : 'Cari'}</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
      <PasswordAdminModal
        show={show}
        handleClose={handleCloseModal}
        pesertaData={pesertaData}
      />
    </>
  );
};

export default ResetPasswordAdmin;
