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
  FormCardWrapper,
  FormDiv,
  FormH3,
  FormH2,
  FormH1,
  FormRupiahLeft,
  FormH2Error
} from './UsiaElements';
import {
  ErrorCard,
  SuccessCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { animateScroll as scroll } from 'react-scroll';
import SuccessModal from '../Modal/Sukses';
import { dataServer } from '../../DataServer';

const UbahUsia = ({ userData }) => {
  const [data, setData] = useState({
    no_peserta: '',
    nama: '',
    usia: '',
    usia_lama: '',
    usia_baru: '',
    tgl_registrasi: '',
    tgl_pensiun: '',
    tgl_pensiun_dipercepat: '',
    tgl_pensiun_baru: '',
    tgl_pensiun_dipercepat_baru: '',
    tanggal_lahir: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [registrationNote, setRegistrationNote] = useState('');

  useEffect(() => {
    console.log('User ID:', userData.userId);
    fetchData();
  }, [userData.userId]);

  const fetchData = () => {
    axios
      .get(`${dataServer.href}/api/v1/ppip/usia-pensiun/${userData.userId}`)
      .then((res) => {
        const fetchedData = res.data[0]; // Assuming the response is an array of objects
        const registrationDate = new Date(fetchedData.tgl_registrasi);
        const thresholdDate = new Date('2023-01-12');
        
        if (registrationDate < thresholdDate) {
          setRegistrationNote('Anda merupakan Peserta Lama (Peserta DPLK sebelum UU PPSK diberlakukan sejak 12 Januari 2023 dimana Usia Pensiun Dipercepat 10 tahun lebih cepat dari Usia Pensiun Normal)');
        } else {
          setRegistrationNote('Anda merupakan Peserta Baru (Peserta DPLK setelah UU PPSK diberlakukan sejak 12 Januari 2023 dimana Usia Pensiun Dipercepat 5 tahun lebih cepat dari Usia Pensiun Normal)');
        }

        setData({
          ...data,
          no_peserta: fetchedData.no_peserta,
          nama: fetchedData.nama_lengkap,
          tanggal_lahir: new Date(fetchedData.tanggal_lahir).toLocaleDateString('en-US'),
          tgl_registrasi: new Date(fetchedData.tgl_registrasi).toLocaleDateString('en-US'),
          tgl_pensiun: new Date(fetchedData.tgl_pensiun).toLocaleDateString('en-US'),
          tgl_pensiun_dipercepat: new Date(fetchedData.tgl_pensiun_dipercepat).toLocaleDateString('en-US'),
          usia_lama: fetchedData.usia_pensiun,
          usia: fetchedData.usia_tahun_ini,
        });
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateParts = dateString.split('/');
    const year = dateParts[2];
    const month = dateParts[0];
    const day = dateParts[1];
    try {
      return format(new Date(year, month - 1, day), 'dd MMMM yyyy', { locale: id });
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return '';
    }
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

  const calculatePensionDates = (tanggalLahir, usiaBaru, tglRegistrasi) => {
    const birthDate = new Date(tanggalLahir);
    const pensionDate = new Date(birthDate);
    pensionDate.setFullYear(pensionDate.getFullYear() + parseInt(usiaBaru));
    pensionDate.setDate(pensionDate.getDate() + 1);

    const registrationDate = new Date(tglRegistrasi);
    const thresholdDate = new Date('2023-01-12');
    let earlyPensionYears = 5;
    
    if (registrationDate < thresholdDate) {
      earlyPensionYears = 10;
    }
    
    const earlyPensionDate = new Date(pensionDate);
    earlyPensionDate.setFullYear(earlyPensionDate.getFullYear() - earlyPensionYears);
    earlyPensionDate.setDate(earlyPensionDate.getDate());

    return {
      tgl_pensiun_baru: pensionDate.toISOString().split('T')[0],
      tgl_pensiun_dipercepat_baru: earlyPensionDate.toISOString().split('T')[0]
    };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.usia_baru) {
      newErrors.usia_baru = 'Usia pensiun baru harus diisi.';
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

    const { no_peserta, nama, usia_lama, usia, usia_baru, tanggal_lahir, tgl_registrasi } = data;
    const { tgl_pensiun_baru, tgl_pensiun_dipercepat_baru } = calculatePensionDates(tanggal_lahir, usia_baru, tgl_registrasi);

    try {
      await axios.post(`${dataServer.href}/api/v1/mdplk/usia-pensiun`, {
        no_peserta,
        nama,
        usia_lama,
        usia,
        usia_baru
      });

      await axios.put(`${dataServer.href}/api/v1/ppip/usia-pensiun/${no_peserta}`, {
        usia_baru,
        tgl_pensiun_baru,
        tgl_pensiun_dipercepat_baru
      });

      setSuccess('Data usia pensiun berhasil diperbarui.');
      setShowModal(true);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
      setSuccess('');
      setLoading(false);
    }
  };

  return (
    <>
    <Container>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleSubmit}>
            <FormH1>Data Usia Pensiun</FormH1>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                <FormInput type='text' name='no_peserta' value={data.no_peserta} onChange={handleChange} readOnly />
                <FormLabel htmlFor="nama">Nama</FormLabel>
                <FormInput type='text' name='nama' value={data.nama} onChange={handleChange} readOnly /> 
                <FormLabel htmlFor="tgl_registrasi">Tanggal Registrasi</FormLabel>
                <FormInput type='text' name='tgl_registrasi' value={formatDate(data.tgl_registrasi)} onChange={handleChange} readOnly /> 
                {registrationNote &&
                  <FormH2><i>{registrationNote}</i></FormH2>
                }  
              </FormDiv>
              <FormDiv>
                <FormLabel htmlFor="usia">Usia di Tahun Ini</FormLabel>
                <FormInput type='text' name='usia' value={data.usia} onChange={handleChange} readOnly /> 
                <FormLabel htmlFor="usia_lama">Usia Pensiun Saat ini</FormLabel>
                <FormInput type='text' name='usia_lama' value={data.usia_lama} onChange={handleChange} readOnly />  
                <FormLabel htmlFor="usia_baru">Usia Pensiun Baru</FormLabel>
                <FormInput type='number' name='usia_baru' value={data.usia_baru} onChange={handleChange} /> 
                {errors.usia_baru && <FormH2Error>{errors.usia_baru}</FormH2Error>} 
              </FormDiv>
            </FormCardWrapper>

            <FormH1>Pernyataan Peserta</FormH1>
            <FormH3>
              Dengan menekan tombol <b>Simpan</b> atau pernyataan serupa yang tersedia di halaman ini, saya dengan sadar dan tanpa paksaan, setuju dan menyetujui:
              <ol>
                <li>Bahwa data yang saya berikan adalah benar.</li>
                <li>Bahwa DPLK Syariah Muamalat terlepas dari segala tanggung jawab atas kesalahan terkait data yang diberikan peserta.</li>
                <li>Bahwa DPLK Syariah Muamalat memiliki izin sepenuhnya, apabila diperlukan, untuk mengungkapkan data nasabah kepada pihak lain di dalam atau di luar negeri yang terikat dengan DPLK Syariah Muamalat dengan tetap memperhatikan ketentuan hukum yang berlaku mengenai kerahasiaan data nasabah.</li>
                <li>Bahwa saya mematuhi, tunduk dan taat kepada seluruh ketentuan perundang-undangan yang berlaku di sektor jasa keuangan.</li>
              </ol>
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

export default UbahUsia;
