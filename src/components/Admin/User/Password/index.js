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
} from '../PasswordElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import PasswordAdminModal from '../../Modal/PasswordAdmin';
import { dataServer } from '../../../DataServer';

const ResetPasswordAdmin = ({userData}) => {
  const [nik, setNIK] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const [pesertaData, setPesertaData] = useState({});

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
      const response = await axios.get(`${dataServer.href}/api/v1/admin/${nik}`);

      const data = response.data;
  
      setPesertaData(data);
      setShowModal(true);
      console.log(data);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
    setLoading(false);
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
        userData={userData}
      />
    </>
  );
};

export default ResetPasswordAdmin;
