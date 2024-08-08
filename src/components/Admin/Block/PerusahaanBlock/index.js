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
} from '../BlockElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from '../../MessageElements';
import UnblockPerusahaanModal from '../../Modal/BlockPerusahaan';
import { dataServer } from '../../../DataServer';

const UnblockPerusahaan = ({userData}) => {
  const [no_peserta, setNoPeserta] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const [perusahaanData, setPerusahaanData] = useState({});

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
      const response1 = await axios.get(`${dataServer.href}/api/v1/perusahaan/${no_peserta}`);
      const response2 = await axios.get(`${dataServer.href}/api/v1/ppukp/peserta/${no_peserta}`);

      const data1 = response1.data;
      const data2 = response2.data;
      
      const combinedData = {
        no_peserta: data1.no_peserta,
        email: data1.email,
        nama_lengkap: data2[0].nama_lengkap,
        block_count: data1.block_count,
        status: data1.status ? 'Aktif' : 'Nonaktif'
      };
  
      setPerusahaanData(combinedData);
      setShowModal(true);
      console.log(combinedData);
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
      <UnblockPerusahaanModal
        show={show}
        handleClose={handleCloseModal}
        perusahaanData={perusahaanData}
        userData={userData}
      />
    </>
  );
};

export default UnblockPerusahaan;
