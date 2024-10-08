import React, { useState, useEffect } from 'react';
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

const UbahPaket = ({ userData }) => {
  const [data, setData] = useState({
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

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    fetchData();
  }, [userData.username]);

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/ppip/peserta/${userData.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedData = response.data.content[0];
        setData({
          ...data,
          nama: fetchedData.nama_lengkap,
          kode_paket_lama: fetchedData.kode_paket_investasi,
        });
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + `/master/investasi`)
      .then(response => {
        setPaketInvestasi(response.data.content);
      })
      .catch(error => console.error(error.response.data.message));
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
      const response = await axios
        .post(process.env.REACT_APP_API_BASE_URL + `/mdplk/paket-investasi/${userData.username}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setSuccess('Data berhasil disimpan. Proses perubahan Paket Investasi sedang kami lakukan dengan maksimal 15 hari kerja. Mohon dapat dicek secara berkala.');
      setShowModal(true);
      setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
        console.error(error);
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
    <>
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleSubmit}>
            <FormH1>Data Paket Investasi</FormH1>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                <FormInput type='text' name='no_peserta' value={userData.username} onChange={handleChange} readOnly />
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
