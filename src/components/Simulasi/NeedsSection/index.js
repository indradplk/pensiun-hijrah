import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HasilInvestasiKebutuhan from '../HasilSimulasiSection/KebutuhanSection';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormInputCustomLeft,
  FormLabel,
  FormButton,
  FormReset,
  FormSelect,
  FormOption,
  FormCardWrapper,
  FormDiv,
  FormRupiahLeft,
  FormSpanLeft,
  FormH2,
  FormH2Error,
  ResultDiv,
  FormH1,
  Text
} from './NeedsElements';
import { animateScroll as scroll } from 'react-scroll';

const NeedsSection = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const [formData, setFormData] = useState({
    tanggal_registrasi: '',
    tanggal_lahir: '',
    usia_pensiun: '',
    paket_investasi: '',
    manfaat_pensiun: ''
  });
  const [paketInvestasi, setPaketInvestasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasilInvestasi, setHasilInvestasi] = useState(null);
  const [errors, setErrors] = useState({});
  const hasilInvestasiRef = useRef(null);

  useEffect(() => {
    const fetchPaketInvestasi = async () => {
      try {
        const paketAResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/parameter/INVESTASI_PAKET_A`);
        const paketBResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/parameter/INVESTASI_PAKET_B`);
        const paketCResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/parameter/INVESTASI_PAKET_C`);

        const paketA = paketAResponse.data.content.NUMERIC_VALUE;
        const paketB = paketBResponse.data.content.NUMERIC_VALUE;
        const paketC = paketCResponse.data.content.NUMERIC_VALUE;

        setPaketInvestasi([
          { id: 'A', name: 'Paket Investasi A', code: paketA },
          { id: 'B', name: 'Paket Investasi B', code: paketB },
          { id: 'C', name: 'Paket Investasi C', code: paketC },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaketInvestasi();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usia_pensiun || formData.usia_pensiun < 55) {
      newErrors.usia_pensiun = 'Usia pensiun harus di atas 55 tahun.';
    }
    if (!formData.manfaat_pensiun || formData.manfaat_pensiun < 0) {
      newErrors.manfaat_pensiun = 'Manfaat pensiun tidak boleh kurang dari Rp 0.';
    }
    if (!formData.tanggal_lahir) {
      newErrors.tanggal_lahir = 'Tanggal lahir tidak boleh kosong.';
    }
    if (!formData.tanggal_registrasi) {
      newErrors.tanggal_registrasi = 'Tanggal registrasi tidak boleh kosong.';
    }
    return newErrors;
  };

  function calculatePMT(rate, periode, fv) {
    return (fv * rate) / (Math.pow(1 + rate, periode) - 1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const {
      tanggal_registrasi,
      tanggal_lahir,
      usia_pensiun,
      paket_investasi, 
      manfaat_pensiun
    } = formData;

    const tahunLahir = parseInt(tanggal_lahir.slice(0, 4));
    const tahunPensiun = tahunLahir + parseInt(usia_pensiun);
    const tanggalPensiun = `${tahunPensiun}-${tanggal_lahir.slice(5, 10)}`;

    const lamaKepesertaan = 
      Math.floor((new Date(tanggalPensiun) - new Date(tanggal_registrasi)) / (1000 * 60 * 60 * 24 * 365));

    const rate = (paket_investasi / 100 - 0.01 / 12) / 12;
    const periode = lamaKepesertaan * 12;
    const fv = manfaat_pensiun * 1.15068086799558;

    const iuranPerBulan = calculatePMT(rate, periode, fv);
    const iuranWithoutRate = manfaat_pensiun / periode;

    setTimeout(() => {
      setHasilInvestasi({
        iuranPerBulan: iuranPerBulan.toFixed(2),
        iuranWithoutRatePerBulan: iuranWithoutRate.toFixed(2),
        tanggalPensiun,
        lamaKepesertaan: lamaKepesertaan.toFixed(0),
      });
      setLoading(false);
      scrollToHasilInvestasi();
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      tanggal_registrasi: '',
      tanggal_lahir: '',
      usia_pensiun: '',
      paket_investasi: '',
      manfaat_pensiun: ''
    });
    setHasilInvestasi(null);
    setErrors({});
  };

  const scrollToHasilInvestasi = () => {
    if (hasilInvestasiRef.current) {
      hasilInvestasiRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <FormH1>Simulasi Berdasarkan Kebutuhan</FormH1>
            <Text to="/simulasi/" onClick={toggleHome}>Simulasi Berdasarkan Iuran →</Text>
            <Form onSubmit={handleSubmit}>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="tanggal_lahir">Tanggal Lahir</FormLabel>
                  <FormInput id="tanggal_lahir" type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
                  {errors.tanggal_lahir && <FormH2Error>{errors.tanggal_lahir}</FormH2Error>}
                  
                  <FormLabel htmlFor="tanggal_registrasi">Tanggal Registrasi</FormLabel>
                  <FormInput id="tanggal_registrasi" type="date" name="tanggal_registrasi" value={formData.tanggal_registrasi} onChange={handleChange} />
                  {errors.tanggal_registrasi && <FormH2Error>{errors.tanggal_registrasi}</FormH2Error>}

                  <FormLabel htmlFor="usia_pensiun">Rencana Usia Pensiun</FormLabel>
                  <FormInput id="usia_pensiun" type="number" name="usia_pensiun" value={formData.usia_pensiun} onChange={handleChange} />
                  {errors.usia_pensiun && <FormH2Error>{errors.usia_pensiun}</FormH2Error>}
                  <FormH2><i>Usia pensiun adalah rentang 55 - 70 tahun.</i></FormH2>

                  <FormLabel htmlFor="manfaat_pensiun">Manfaat Pensiun yang Diinginkan</FormLabel>
                  <FormRupiahLeft>
                    <FormSpanLeft>Rp</FormSpanLeft>
                    <FormInputCustomLeft id="manfaat_pensiun" type="number" name="manfaat_pensiun" value={formData.manfaat_pensiun} onChange={handleChange} />
                  </FormRupiahLeft>
                  {errors.manfaat_pensiun && <FormH2Error>{errors.manfaat_pensiun}</FormH2Error>}
                </FormDiv>
                <FormDiv>
                  <FormLabel htmlFor="paket_investasi">Paket Investasi</FormLabel>
                  <FormSelect id="paket_investasi" name="paket_investasi" value={formData.paket_investasi} onChange={handleChange}>
                    <FormOption value="">Pilih Paket Investasi</FormOption>
                    {paketInvestasi.map((paket) => (
                      <FormOption key={paket.id} value={paket.code}>{paket.name} ({paket.code}%)*</FormOption>
                    ))}
                  </FormSelect>
                  <FormH2><i>*Tiap paket memiliki tingkat investasi yang berbeda. Tingkat investasi dapat berubah sewaktu-waktu.</i></FormH2>

                  <FormLabel htmlFor="biaya_pengelolaan">Biaya Pengelolaan</FormLabel>
                  <FormInput id="biaya_pengelolaan" name="biaya_pengelolaan" value={formData.biaya_pengelolaan} placeholder="Asumsi 1% dari akumulasi dana per tahun" onChange={handleChange} disabled />
                  <FormH2><i>Biaya dapat berubah sewaktu-waktu.</i></FormH2>

                  <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Hitung Simulasi'}</FormButton>
                  <FormReset type="button" onClick={resetForm}>Reset</FormReset>
                </FormDiv>
              </FormCardWrapper>
            </Form>
            <ResultDiv ref={hasilInvestasiRef}>
              {hasilInvestasi && <HasilInvestasiKebutuhan hasilInvestasi={hasilInvestasi} data={hasilInvestasi} />}
            </ResultDiv>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default NeedsSection;