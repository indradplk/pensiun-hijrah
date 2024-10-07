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
} from '../BlockElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import UnblockPesertaModal from '../../Modal/BlockPeserta';

const UnblockPeserta = ({userData}) => {
  const [no_peserta, setNoPeserta] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const [pesertaData, setPesertaData] = useState({});

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleInputChange = (e) => {
    setNoPeserta(e.target.value);
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
      const response1 = await axios
        .get(process.env.REACT_APP_API_BASE_URL + `/user/${no_peserta}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const response2 = await axios
        .get(process.env.REACT_APP_API_BASE_URL + `/ppip/peserta/${no_peserta}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      const data1 = response1.data.content;
      const data2 = response2.data.content;
      
      const combinedData = {
        no_peserta: data1.username,
        email: data1.pesertaEmail,
        nama_lengkap: data2[0].nama_lengkap,
        block_count: data1.block_count,
        status: data1.status ? 'Aktif' : 'Nonaktif'
      };
  
      setPesertaData(combinedData);
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
              <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
              <FormInput id="no_peserta" type="text" name="no_peserta" value={no_peserta} onChange={handleInputChange} />
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
      <UnblockPesertaModal
        show={show}
        handleClose={handleCloseModal}
        pesertaData={pesertaData}
      />
    </>
  );
};

export default UnblockPeserta;
