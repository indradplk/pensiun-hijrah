import React, { useState, useEffect } from 'react';
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
  FormOption,
  FormCardWrapper,
  FormDiv,
  FormH3,
  FormH2,
  FormH1,
  FormRupiahLeft
} from './PaketElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import SuccessModal from '../Modal/Sukses';
import { animateScroll as scroll } from 'react-scroll';
import { dataServer } from '../../DataServer';

const UbahPaket = ({ userData }) => {
  const [data, setData] = useState({
    no_peserta: '',
    nama: '',
    kode_paket_lama: '',
    kode_paket_baru: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [paketInvestasi, setPaketInvestasi] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('User ID:', userData.userId);
    fetchData();
  }, [userData.userId]);

  const fetchData = () => {
    axios
      .get(`${dataServer.href}/api/v1/ppip/peserta/${userData.userId}`)
      .then((res) => {
        const fetchedData = res.data[0]; // Assuming the response is an array of objects
        setData({
          ...data,
          no_peserta: fetchedData.no_peserta,
          nama: fetchedData.nama_lengkap,
          kode_paket_lama: fetchedData.kode_paket_investasi,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/investasi`)
      .then(response => {
        setPaketInvestasi(response.data);
      })
      .catch(error => console.error('Error fetching investasi:', error));
  }, []);

  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsCheckboxChecked(checked);
    setShowButton(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/mdplk/paket-investasi`, data);
      console.log(response.data);
      setSuccess('Data berhasil disimpan. Proses perubahan Paket Investasi sedang kami lakukan dengan maksimal 15 hari kerja. Mohon dapat dicek secara berkala.');
      setShowModal(true);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
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
            <FormH1>Data Paket Investasi</FormH1>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                <FormInput type='text' name='no_peserta' value={data.no_peserta} onChange={handleChange} readOnly />
                <FormLabel htmlFor="nama">Nama</FormLabel>
                <FormInput type='text' name='nama' value={data.nama} onChange={handleChange} readOnly />      
              </FormDiv>
              <FormDiv>
                <FormLabel htmlFor="kode_paket_lama">Paket Investasi Saat Ini</FormLabel>
                <FormInput type='text' name='kode_paket_lama' value={data.kode_paket_lama} onChange={handleChange} readOnly />
                <FormLabel htmlFor="kode_paket_baru">Paket Investasi</FormLabel>
                  <FormSelect name="kode_paket_baru" value={data.kode_paket_baru} onChange={handleChange} >
                    {paketInvestasi.map((paket) => (
                      <FormOption key={paket.id} value={paket.value}>{paket.name}</FormOption>
                    ))}
                  </FormSelect>
                  {paketInvestasi.map((paket) => {
                    if (paket.value === data.kode_paket_baru) {
                      return <FormH2 key={paket.id}><i>{paket.description}</i></FormH2>;
                    }
                    return null;
                  })}     
              </FormDiv>
            </FormCardWrapper>

            <FormH1>Pernyataan Peserta</FormH1>
            <FormH3>
              Dengan menekan tombol <b>Simpan</b> atau pernyataan serupa yang tersedia di halaman ini, saya dengan sadar dan tanpa paksaan, telah sepenuhnya membaca dan memahami ketentuan ini. Saya setuju dan menyetujui pengumpulan, penggunaan, pengungkapan, penyimpanan data dan sepenuhnya memahami karakteristik dan risiko dari pilihan penempatan investasi yang telah saya pilih di atas.
            </FormH3>
            <FormDiv>
              <FormRupiahLeft>
                <FormInput type='checkbox' id='checkbox_agree' name='checkbox_agree' checked={isCheckboxChecked} onChange={handleCheckboxChange} />
                <FormLabel htmlFor='checkbox_agree'>Saya telah membaca dan menyetujui ketentuan yang berlaku.</FormLabel>
              </FormRupiahLeft>
              {error && (
                <ErrorCard>
                  <MessageH1><b>Gagal!</b></MessageH1>
                  <MessageH2>{error}</MessageH2>
                </ErrorCard>
              )}
              {success && (
                <SuccessModal show={showModal} onLogin={() => {
                  history.push('/peserta/profil/');
                  scroll.scrollToTop();
                }} message={success} />
              )}
              {showButton && (
                <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Simpan'}</FormButton>
              )}
            </FormDiv>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
    </>
  )

};

export default UbahPaket;
