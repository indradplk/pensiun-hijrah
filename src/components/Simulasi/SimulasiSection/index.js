import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HasilInvestasi from '../HasilSimulasiSection';
import GrafikInvestasi from '../GrafikSimulasiSection';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormInputCustomLeft,
  FormInputCustomRight,
  FormLabel,
  FormButton,
  FormReset,
  FormSelect,
  FormOption,
  FormCardWrapper,
  FormDiv,
  FormRupiahLeft,
  FormRupiahRight,
  FormSpanLeft,
  FormSpanRight,
  FormSpanDisabled,
  FormH2,
  FormH2Error,
  ResultDiv
} from './SimulasiElements';
import { dataServer } from '../../DataServer';

const SimulasiSection = () => {
  const [formData, setFormData] = useState({
    usia: '',
    usia_pensiun: '',
    dana_awal: '',
    iuran: '',
    kenaikan_iuran: '',
    paket_investasi: '',
    biaya_administrasi: '2000',
    biaya_pengelolaan: ''
  });
  const [paketInvestasi, setPaketInvestasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasilInvestasi, setHasilInvestasi] = useState(null);
  const [dataGrafik, setDataGrafik] = useState([]);
  const [errors, setErrors] = useState({});
  const hasilInvestasiRef = useRef(null);

  useEffect(() => {
    const fetchPaketInvestasi = async () => {
      try {
        const paketA = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_A`);
        const paketB = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_B`);
        const paketC = await axios.get(`${dataServer.href}/api/v1/ppip/parameter/INVESTASI_PAKET_C`);

        setPaketInvestasi([
          { id: 'A', name: 'Paket Investasi A', code: paketA.data[0].NUMERIC_VALUE },
          { id: 'B', name: 'Paket Investasi B', code: paketB.data[0].NUMERIC_VALUE },
          { id: 'C', name: 'Paket Investasi C', code: paketC.data[0].NUMERIC_VALUE },
        ]);
      } catch (error) {
        console.error('Error fetching investasi:', error);
      }
    };

    fetchPaketInvestasi();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usia || formData.usia < 17) {
      newErrors.usia = 'Usia di bawah 17 tahun.';
    }
    if (!formData.usia_pensiun || formData.usia_pensiun < 55 || formData.usia_pensiun > 70) {
      newErrors.usia_pensiun = 'Usia pensiun harus antara 55 dan 70 tahun.';
    }
    if (!formData.iuran || formData.iuran < 100000) {
      newErrors.iuran = 'Iuran per bulan minimum sebesar Rp 100.000.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const {
      usia,
      usia_pensiun,
      dana_awal,
      iuran,
      kenaikan_iuran,
      paket_investasi,
      biaya_administrasi,
    } = formData;

    const years = usia_pensiun - usia + 1;
    const monthlyRate = paket_investasi / 100 / 12;
    let totalDana = parseFloat(dana_awal) || 0;
    let totalDanaSebelum = parseFloat(dana_awal) || 0;
    let monthlyContribution = parseFloat(iuran) || 0;
    const annualIncrease = parseFloat(kenaikan_iuran) / 100 || 0;
    const adminFee = parseFloat(biaya_administrasi) || 0;
    const managementFeeRate1 = 0.01 / 12;
    const managementFeeRate2 = 0.0125 / 12;

    let akumulasiIuran = 0;
    let hasilPengembangan = 0;
    let hasilPengembanganSebelumFee = 0;
    let pengembangan_sebelum_fee = 0;
    let pengembangan_setelah_fee = 0;
    let pajak = 0;

    const grafikData = [];

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        totalDana += monthlyContribution;
        totalDanaSebelum += monthlyContribution;
        akumulasiIuran += monthlyContribution;
        pengembangan_sebelum_fee = totalDana * monthlyRate;
        pengembangan_setelah_fee = totalDana * monthlyRate;
        const managementFeeRate = totalDana >= 100000000 ? managementFeeRate1 : managementFeeRate2;
        pengembangan_setelah_fee -= managementFeeRate; // Potongan biaya pengelolaan bulanan
        pengembangan_setelah_fee -= adminFee; // Potongan biaya administrasi bulanan
        hasilPengembangan += pengembangan_setelah_fee;
        hasilPengembanganSebelumFee += pengembangan_sebelum_fee;
        totalDana += pengembangan_setelah_fee;
        totalDanaSebelum += pengembangan_sebelum_fee;
      }
      monthlyContribution += monthlyContribution * annualIncrease;

      grafikData.push({
        usia: parseInt(usia) + year - 1,
        iuran: akumulasiIuran.toFixed(2),
        pengembanganAwal: hasilPengembanganSebelumFee.toFixed(2),
        pengembangan: hasilPengembangan.toFixed(2),
        saldoAkhir: totalDana.toFixed(2),
        saldoAkhirSebelum: totalDanaSebelum.toFixed(2),
      });
    }

    if (totalDana <= 50000000) {
      pajak = 0
    } else {
      pajak = (totalDana - 50000000) * 0.05
    }

    let totalDanaPajak = totalDana - pajak;

    setTimeout(() => {
      setHasilInvestasi({
        akumulasiIuran: akumulasiIuran.toFixed(2),
        hasilPengembangan: hasilPengembangan.toFixed(2),
        totalDana: totalDana.toFixed(2),
        pajak: pajak.toFixed(2),
        totalDanaPajak: totalDanaPajak.toFixed(2),
      });
      setDataGrafik(grafikData);
      setLoading(false);
      scrollToHasilInvestasi();
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      usia: '',
      usia_pensiun: '',
      dana_awal: '',
      iuran: '',
      kenaikan_iuran: '',
      paket_investasi: '',
      biaya_administrasi: '2000',
      biaya_pengelolaan: ''
    });
    setHasilInvestasi(null);
    setDataGrafik([]);
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
            <Form onSubmit={handleSubmit}>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="usia">Usia</FormLabel>
                  <FormInput id="usia" type="number" name="usia" value={formData.usia} onChange={handleChange} />
                  {errors.usia && <FormH2Error>{errors.usia}</FormH2Error>}
                  <FormH2><i>Usia minimum adalah 17 tahun.</i></FormH2>

                  <FormLabel htmlFor="usia_pensiun">Rencana Usia Pensiun</FormLabel>
                  <FormInput id="usia_pensiun" type="number" name="usia_pensiun" value={formData.usia_pensiun} onChange={handleChange} />
                  {errors.usia_pensiun && <FormH2Error>{errors.usia_pensiun}</FormH2Error>}
                  <FormH2><i>Usia pensiun adalah rentang 55 - 70 tahun.</i></FormH2>

                  <FormLabel htmlFor="dana_awal">Dana Awal/Dana Pengalihan</FormLabel>
                  <FormRupiahLeft>
                    <FormSpanLeft>Rp</FormSpanLeft>
                    <FormInputCustomLeft id="dana_awal" type="number" name="dana_awal" value={formData.dana_awal} onChange={handleChange} />
                  </FormRupiahLeft>
                  <FormH2><i>Isi dengan 0 jika tidak ada Dana Awal/Dana Pengalihan.</i></FormH2>

                  <FormLabel htmlFor="iuran">Iuran Per Bulan</FormLabel>
                  <FormRupiahLeft>
                    <FormSpanLeft>Rp</FormSpanLeft>
                    <FormInputCustomLeft id="iuran" type="number" name="iuran" value={formData.iuran} onChange={handleChange} />
                  </FormRupiahLeft>
                  {errors.iuran && <FormH2Error>{errors.iuran}</FormH2Error>}

                  <FormLabel htmlFor="kenaikan_iuran">Kenaikan Iuran Per Tahun</FormLabel>
                  <FormRupiahRight>
                    <FormInputCustomRight id="kenaikan_iuran" type="number" name="kenaikan_iuran" value={formData.kenaikan_iuran} onChange={handleChange} />
                    <FormSpanRight>%</FormSpanRight>
                  </FormRupiahRight>
                  <FormH2><i>Isi dengan 0 jika tidak ingin ada kenaikan iuran.</i></FormH2>
                </FormDiv>
                <FormDiv>
                  <FormLabel htmlFor="paket_investasi">Paket Investasi</FormLabel>
                  <FormSelect id="paket_investasi" name="paket_investasi" value={formData.paket_investasi} onChange={handleChange}>
                    {paketInvestasi.map((paket) => (
                      <FormOption key={paket.id} value={paket.code}>{paket.name} ({paket.code}%)</FormOption>
                    ))}
                  </FormSelect>
                  <FormH2><i>Tiap paket memiliki tingkat investasi yang berbeda. Tingkat investasi dapat berubah sewaktu-waktu.</i></FormH2>

                  <FormLabel htmlFor="biaya_administrasi">Biaya Administrasi (Per Bulan)</FormLabel>
                  <FormRupiahLeft>
                    <FormSpanDisabled>Rp</FormSpanDisabled>
                    <FormInputCustomLeft id="biaya_administrasi" name="biaya_administrasi" value={formData.biaya_administrasi} onChange={handleChange} disabled />
                  </FormRupiahLeft>
                  <FormH2><i>Biaya administrasi dapat berubah sewaktu-waktu.</i></FormH2>

                  <FormLabel htmlFor="biaya_pengelolaan">Biaya Pengelolaan</FormLabel>
                  <FormInput id="biaya_pengelolaan" name="biaya_pengelolaan" value={formData.biaya_pengelolaan} placeholder="1% - 1.25% dari akumulasi dana per tahun" onChange={handleChange} disabled />
                  <FormH2><i>Biaya pengelolaan 1% jika Total Dana sebesar 100 juta rupiah atau lebih. Biaya pengelolaan 1.25% jika Total Dana kurang dari 100 juta rupiah. Biaya dapat berubah sewaktu-waktu.</i></FormH2>

                  <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Hitung Simulasi'}</FormButton>
                  <FormReset type="button" onClick={resetForm}>Reset</FormReset>
                </FormDiv>
              </FormCardWrapper>
            </Form>
            <ResultDiv ref={hasilInvestasiRef}>
              {dataGrafik.length > 0 && <GrafikInvestasi data={dataGrafik} />}
              {hasilInvestasi && <HasilInvestasi hasilInvestasi={hasilInvestasi} data={dataGrafik} />}
            </ResultDiv>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SimulasiSection;