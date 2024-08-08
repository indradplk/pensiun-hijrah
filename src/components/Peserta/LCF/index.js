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
  FormInputLeft,
  FormDiv,
  FormH3,
  FormH1,
  FormCardWrapper,
  FormRupiahLeft,
  FormH2Error,
} from './LCFElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import SuccessModal from '../Modal/Sukses';
import { animateScroll as scroll } from 'react-scroll';
import { dataServer } from '../../DataServer';

const LifeCycleFund = ({ userData }) => {
  const [data, setData] = useState({
    no_peserta: '',
    nama: '',
    email: '',
    telepon: '',
    kode_paket_lama: '',
    kode_paket_baru: '',
    pindah: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData.userId) {
      fetchData();
    }
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
          telepon: fetchedData.alamat_telepon,
          email: fetchedData.ALAMAT_EMAIL
        });
      })
      .catch((error) => console.log(error));
  };

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

  const validateForm = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = 'Email harus diisi.';
    }
    if (!data.telepon) {
      newErrors.telepon = 'Nomor Telepon/HP harus diisi.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const { no_peserta, nama, email, telepon, kode_paket_lama, pindah } = data;
    let kode_paket_baru = kode_paket_lama;

    if (pindah === 'T') {
      kode_paket_baru = 'A';
    }

    try {
      await axios.post(`${dataServer.href}/api/v1/mdplk/life-cycle-fund`, {
        no_peserta, nama, email, telepon, kode_paket_lama, kode_paket_baru, pindah
      });

      if (pindah === 'T') {
        await axios.post(`${dataServer.href}/api/v1/ppip/life-cycle-fund/${no_peserta}`);
      }

      setSuccess('Data paket investasi berhasil diperbarui.');
      setShowModal(true);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message || 'Gagal memperbarui data');
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleSubmit}>
            <FormH1>Surat Pernyataan Life Cycle Fund</FormH1>
            <FormH3>
              Berdasarkan Peraturan Otoritas Jasa Keuangan Nomor 27 Tahun 2023 tentang Penyelenggaraan Usaha Dana Pensiun – Pasal 67 ayat (2) mengenai Life Cycle Fund, DPLK mengelola aset sesuai kelompok Peserta atau berdasarkan pilihan Peserta dengan ketentuan.
            </FormH3>
            <FormH3>
              Bagi Peserta yang telah mencapai usia paling lama 5 (lima) tahun dan paling singkat 2 (dua) tahun sebelum Usia Pensiun Normal, harus ditempatkan pada <b>Paket A (Deposito di Bank Syariah Maks 100% dan/atau instrumen Pasar Uang Syariah Maks 80%).</b>
            </FormH3>
            <FormH3>
              Sesuai dengan penjelasan diatas, Saya menyatakan bahwa saya:
            </FormH3>
            <FormDiv>
              <FormInputLeft>
                <FormInput id="pindahT" type="radio" name="pindah" value="T" checked={data.pindah === 'T'} onChange={handleChange} />
                <FormH3>Bersedia melakukan perubahan paket investasi saya menjadi Paket A (Deposito di Bank Syariah Maks 100% dan/atau instrumen Pasar Uang Syariah Maks 80%)</FormH3>
              </FormInputLeft>
            </FormDiv>
            <FormDiv>
              <FormInputLeft>
                <FormInput id="pindahF" type="radio" name="pindah" value="F" checked={data.pindah === 'F'} onChange={handleChange} />
                <FormH3>Tidak bersedia melakukan perubahan paket investasi saya menjadi Paket A (Deposito di Bank Syariah Maks 100% dan/atau instrumen Pasar Uang Syariah Maks 80%)</FormH3>
              </FormInputLeft>
            </FormDiv>
            <FormCardWrapper>
            </FormCardWrapper>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                <FormInput type='text' name='no_peserta' value={data.no_peserta} onChange={handleChange} readOnly />
                <FormLabel htmlFor="nama">Nama</FormLabel>
                <FormInput type='text' name='nama' value={data.nama} onChange={handleChange} readOnly />
                <FormLabel htmlFor="kode_paket_lama">Paket Investasi Saat Ini</FormLabel>
                <FormInput type='text' name='kode_paket_lama' value={data.kode_paket_lama} onChange={handleChange} readOnly />  
              </FormDiv>
              <FormDiv> 
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput type='text' name='email' value={data.email} onChange={handleChange} />
                {errors.email && <FormH2Error>{errors.email}</FormH2Error>}
                <FormLabel htmlFor="telepon">Nomor Telepon/HP</FormLabel>
                <FormInput type='text' name='telepon' value={data.telepon} onChange={handleChange} />  
                {errors.telepon && <FormH2Error>{errors.telepon}</FormH2Error>} 
              </FormDiv>
            </FormCardWrapper>

            <FormH3>
              Demikian dengan menekan tombol <b>Simpan</b> atau pernyataan serupa yang tersedia di halaman ini, saya dengan sadar dan tanpa paksaaan, telah sepenuhnya membaca dan memahami ketentuan ini. Saya setuju dan menyetujui pengumpulan, penggunaan, pengungkapan, penyimpanan data dan sepenuhnya memahami karakteristik dan risiko dari pilihan penempatan investasi yang telah saya pilih di atas.
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
  );
};

export default LifeCycleFund;
