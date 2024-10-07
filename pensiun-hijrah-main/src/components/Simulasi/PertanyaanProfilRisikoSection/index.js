import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormInputLeft,
  FormLabel,
  FormButton,
  FormReset,
  FormCardWrapper,
  FormDiv,
  FormH2,
  FormH1,
  FormH3,
  FormButtonDiv,
  FormH2Error,
} from './ProfilRisikoElements';
import ResultModal from '../HasilProfilRisikoSection';
import { animateScroll as scroll } from 'react-scroll';

const Questionnaire = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jwb1: '',
    jwb2: '',
    jwb3: '',
    jwb4: '',
    jwb5: '',
    jwb6: '',
    jwb7: '',
    jwb8: '',
    jwb9: '',
    produk: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasilPertanyaan, setHasilPertanyaan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (type === 'checkbox') {
        setFormData((prev) => ({
            ...prev,
            produk: checked ? [...prev.produk, value] : prev.produk.filter((v) => v !== value)
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
  };

  const showStep = (stepToShow, direction) => {
    if (direction === 'next') {
      const currentStep = `jwb${step}`;
      if (!formData[currentStep]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [currentStep]: 'Pertanyaan ini harus diisi sebelum melanjutkan.'
        }));
        return;
      }
    }
    setStep(stepToShow);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['jwb1', 'jwb2', 'jwb3', 'jwb4', 'jwb5', 'jwb6', 'jwb7', 'jwb8', 'jwb9', 'produk'];
    const hasErrors = requiredFields.some((field) => !formData[field]);
    
    if (hasErrors) {
      const newErrors = {};
      requiredFields.forEach((field) => {
        if (!formData[field]) newErrors[field] = 'Pertanyaan ini harus diisi sebelum melanjutkan.';
      });
      setErrors(newErrors);
      return;
    }

    let {
      jwb1, jwb2, jwb3, jwb4, jwb5,
      jwb6, jwb7, jwb8, jwb9, produk
    } = formData;
    
    jwb1 = parseInt(jwb1);
    jwb2 = parseInt(jwb2);
    jwb3 = parseInt(jwb3);
    jwb4 = parseInt(jwb4);
    jwb5 = parseInt(jwb5);
    jwb6 = parseInt(jwb6);
    jwb7 = parseInt(jwb7);
    jwb8 = parseInt(jwb8);
    jwb9 = parseInt(jwb9);

    let jwb10 = produk.reduce((acc, curr) => acc + parseInt(curr), 0) / produk.length;
    let total = jwb1 + jwb2 + jwb3 + jwb4 + jwb5 + jwb6 + jwb7 + jwb8 + jwb9 + Math.round(jwb10);

    let judul = '';
    let paket = '';
    let description = '';
    let img = '';

    if (total <= 20) {
      judul = 'Safety Player';
      paket = 'A';
      img = '/images/safety_player.svg';
      description = `Anda memiliki tipe investasi Safety Player, Paket yang cocok untuk Anda adalah Paket A. Tidak di rekomendasikan memilih selain paket A.					
      Paket A adalah suatu paket investasi yang memiliki tujuan memberikan potensi imbal hasil dan pertumbuhan investasi yang stabil dengan risiko minimal. 
      Investasi dalam Paket A  dilakukan pada instrumen pasar uang syariah seperti deposito syariah, dan pasar modal syariah seperti Sukuk (obligasi syariah) 
      yang jatuh tempo di bawah 1 tahun sesuai dengan Prinsip Syariah dan Kebijakan Investasi Dana Pensiun dan cocok untuk Anda yang menghindari risiko investasi yang tinggi.`;
    } else if (total > 20 && total <= 30) {
        judul = 'Balanced Investor';
        paket = 'B';
        img = '/images/balanced_investor.svg';
        description = `Anda memiliki tipe investasi Balance Investor, Paket yang cocok untuk Anda adalah Paket B. Paket B bertujuan untuk memberikan hasil investasi yang optimal 
        dalam jangka panjang dengan mendiversifikasi portofolio melalui investasi pada instrumen pendapatan tetap syariah yang sesuai dengan prinsip-prinsip Syariah 
        di pasar modal dan kebijakan investasi dana pensiun seperti sukuk negara dan sukuk korporasi yang terdaftar oleh OJK serta deposito syariah.`;
    } else if (total > 30 && total <= 40) {
        judul = 'Risk Taker';
        paket = 'C';
        img = '/images/risk_taker.svg';
        description = `Anda memiliki tipe investasi Risk Taker. Paket yang cocok untuk Anda adalah Paket C tapi anda dapat juga memilih paket A atau B. 
        Paket C bertujuan mendapatkan peningkatan modal/nilai investasi dalam jangka panjang dengan berinvestasi pada saham dengan 
        memerhatikan momentum dan potensi terbaik pada perusahaan yang terdaftar Daftar Efek Syariah di Bursa Efek Indonesia.`;
    }
    
    if (produk.length === 0) {
      setErrors({ ...errors, produk: 'Pilih minimal satu instrumen investasi.' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setHasilPertanyaan({
        judul: judul,
        paket: paket,
        img: img,
        description: description,
      });
      setLoading(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <FormH1>Kuesioner Kriteria</FormH1>
            <Form onSubmit={handleSubmit}>
              <FormDiv>
                <FormH2><b>Pertanyaan di bawah ini merupakan alat bantu bagi Anda untuk mendapatkan rekomendasi instrumen investasi yang sesuai dengan kepribadian dan tujuan investasi Anda.</b></FormH2><br/>
              </FormDiv>
              {step === 1 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb1">Pertanyaan 1 dari 10</FormLabel>
                    <FormH3>
                      <b>Berapa usia Anda saat ini?</b>
                    </FormH3>
                    {errors.jwb1 && <FormH2Error>{errors.jwb1}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb1" type="radio" name="jwb1" value="1" checked={formData.jwb1 === '1'} onChange={handleChange} />
                      <FormH2>Di atas 50 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb1" type="radio" name="jwb1" value="2" checked={formData.jwb1 === '2'} onChange={handleChange} />
                      <FormH2>40-50 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb1" type="radio" name="jwb1" value="3" checked={formData.jwb1 === '3'} onChange={handleChange} />
                      <FormH2>30-40 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb1" type="radio" name="jwb1" value="4" checked={formData.jwb1 === '4'} onChange={handleChange} />
                      <FormH2>Di bawah 30 tahun</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(2, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 2 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb2">Pertanyaan 2 dari 10</FormLabel>
                    <FormH3>
                      <b>Berapa lama Anda ingin berinvestasi di DPLK?</b>
                    </FormH3>
                    {errors.jwb2 && <FormH2Error>{errors.jwb2}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb2" type="radio" name="jwb2" value="1" checked={formData.jwb2 === '1'} onChange={handleChange} />
                      <FormH2>1-5 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb2" type="radio" name="jwb2" value="2" checked={formData.jwb2 === '2'} onChange={handleChange} />
                      <FormH2>5-10 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb2" type="radio" name="jwb2" value="3" checked={formData.jwb2 === '3'} onChange={handleChange} />
                      <FormH2>10-15 tahun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb2" type="radio" name="jwb2" value="4" checked={formData.jwb2 === '4'} onChange={handleChange} />
                      <FormH2>Di atas 15 tahun</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(1, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(3, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 3 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb3">Pertanyaan 3 dari 10</FormLabel>
                    <FormH3>
                      <b>Apakah tujuan utama Anda berinvestasi di DPLK?</b>
                    </FormH3>
                    {errors.jwb3 && <FormH2Error>{errors.jwb3}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb3" type="radio" name="jwb3" value="1" checked={formData.jwb3 === '1'} onChange={handleChange} />
                      <FormH2>Pengembangan dana yang stabil untuk bekal utama di masa pensiun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb3" type="radio" name="jwb3" value="2" checked={formData.jwb3 === '2'} onChange={handleChange} />
                      <FormH2>Pendapatan sampingan <i>(side income)</i> di masa pensiun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb3" type="radio" name="jwb3" value="3" checked={formData.jwb3 === '3'} onChange={handleChange} />
                      <FormH2>Dana cadangan saja di masa pensiun</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb3" type="radio" name="jwb3" value="4" checked={formData.jwb3 === '4'} onChange={handleChange} />
                      <FormH2>Hasil investasi yang tinggi sesuai risiko</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(2, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(4, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 4 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb4">Pertanyaan 4 dari 10</FormLabel>
                    <FormH3>
                      <b>Seberapa besar porsi dari pendapatan Anda yang ingin di investasikan di DPLK?</b>
                    </FormH3>
                    {errors.jwb4 && <FormH2Error>{errors.jwb4}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb4" type="radio" name="jwb4" value="1" checked={formData.jwb4 === '1'} onChange={handleChange} />
                      <FormH2>Kurang dari 5%</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb4" type="radio" name="jwb4" value="2" checked={formData.jwb4 === '2'} onChange={handleChange} />
                      <FormH2>5%-10%</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb4" type="radio" name="jwb4" value="3" checked={formData.jwb4 === '3'} onChange={handleChange} />
                      <FormH2>10%-20%</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb4" type="radio" name="jwb4" value="4" checked={formData.jwb4 === '4'} onChange={handleChange} />
                      <FormH2>Di atas 20%</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(3, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(5, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 5 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb5">Pertanyaan 5 dari 10</FormLabel>
                    <FormH3>
                      <b>Seberapa jauh pengetahuan Anda mengenai risiko untuk setiap jenis investasi?</b>
                    </FormH3>
                    {errors.jwb5 && <FormH2Error>{errors.jwb5}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb5" type="radio" name="jwb5" value="1" checked={formData.jwb5 === '1'} onChange={handleChange} />
                      <FormH2>Tidak tahu sama sekali</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb5" type="radio" name="jwb5" value="2" checked={formData.jwb5 === '2'} onChange={handleChange} />
                      <FormH2>Sedikit mengerti</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb5" type="radio" name="jwb5" value="3" checked={formData.jwb5 === '3'} onChange={handleChange} />
                      <FormH2>Cukup mengerti</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb5" type="radio" name="jwb5" value="4" checked={formData.jwb5 === '4'} onChange={handleChange} />
                      <FormH2>Sangat memahami</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(4, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(6, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 6 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb6">Pertanyaan 6 dari 10</FormLabel>
                    <FormH3>
                      <b>Seberapa jauh pengetahuan Anda mengenai instrumen investasi?</b>
                    </FormH3>
                    {errors.jwb6 && <FormH2Error>{errors.jwb6}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb6" type="radio" name="jwb6" value="1" checked={formData.jwb6 === '1'} onChange={handleChange} />
                      <FormH2>Tidak tahu sama sekali</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb6" type="radio" name="jwb6" value="2" checked={formData.jwb6 === '2'} onChange={handleChange} />
                      <FormH2>Hanya memahami investasi tabungan/deposito di bank</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb6" type="radio" name="jwb6" value="3" checked={formData.jwb6 === '3'} onChange={handleChange} />
                      <FormH2>Memahami investasi tabungan/deposito di bank dan sukuk/obligasi</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb6" type="radio" name="jwb6" value="4" checked={formData.jwb6 === '4'} onChange={handleChange} />
                      <FormH2>Sangat memahami investasi tabungan/deposito, sukuk/obligasi, reksadana, dan saham</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(5, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(7, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 7 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb7">Pertanyaan 7 dari 10</FormLabel>
                    <FormH3>
                      <b>Bagaimana pengalaman investasi Anda?</b>
                    </FormH3>
                    {errors.jwb7 && <FormH2Error>{errors.jwb7}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb7" type="radio" name="jwb7" value="1" checked={formData.jwb7 === '1'} onChange={handleChange} />
                      <FormH2>Tidak berpengalaman investasi sama sekali</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb7" type="radio" name="jwb7" value="2" checked={formData.jwb7 === '2'} onChange={handleChange} />
                      <FormH2>Hanya pernah investasi tabungan/deposito di bank</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb7" type="radio" name="jwb7" value="3" checked={formData.jwb7 === '3'} onChange={handleChange} />
                      <FormH2>Berpengalaman investasi tabungan/deposito di bank dan sukuk</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb7" type="radio" name="jwb7" value="4" checked={formData.jwb7 === '4'} onChange={handleChange} />
                      <FormH2>Berpengalaman investasi tabungan/deposito, sukuk, reksadana, dan saham</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(6, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(8, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 8 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb8">Pertanyaan 8 dari 10</FormLabel>
                    <FormH3>
                      <b>Bagaimana sikap Anda terhadap risiko investasi?</b>
                    </FormH3>
                    {errors.jwb8 && <FormH2Error>{errors.jwb8}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb8" type="radio" name="jwb8" value="1" checked={formData.jwb8 === '1'} onChange={handleChange} />
                      <FormH2>Saya tidak tahu risiko investasi</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb8" type="radio" name="jwb8" value="2" checked={formData.jwb8 === '2'} onChange={handleChange} />
                      <FormH2>Saya tidak menyukai adanya risiko investasi</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb8" type="radio" name="jwb8" value="3" checked={formData.jwb8 === '3'} onChange={handleChange} />
                      <FormH2>Saya mentolerir adanya risiko investasi yang tidak terlalu besar</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb8" type="radio" name="jwb8" value="4" checked={formData.jwb8 === '4'} onChange={handleChange} />
                      <FormH2>Saya menyukai risiko investasi sesuai prinsip <i>high risk-high return</i></FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(7, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(9, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 9 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="jwb9">Pertanyaan 9 dari 10</FormLabel>
                    <FormH3>
                      <b>Menurut Anda, seharusnya investasi itu seperti apa?</b>
                    </FormH3>
                    {errors.jwb9 && <FormH2Error>{errors.jwb9}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="jwb9" type="radio" name="jwb9" value="1" checked={formData.jwb9 === '1'} onChange={handleChange} />
                      <FormH2>Investasi harus untung</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb9" type="radio" name="jwb9" value="2" checked={formData.jwb9 === '2'} onChange={handleChange} />
                      <FormH2>Investasi dapat naik turun tapi tidak bisa sampai rugi</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb9" type="radio" name="jwb9" value="3" checked={formData.jwb9 === '3'} onChange={handleChange} />
                      <FormH2>Investasi bertujuan untuk mencari keuntungan asalkan kerugian tidak signifikan</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="jwb9" type="radio" name="jwb9" value="4" checked={formData.jwb9 === '4'} onChange={handleChange} />
                      <FormH2>Investasi dapat menghasilkan keuntungan maupun kerugian, termasuk kehilangan pokok</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(8, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="button" disabled={loading} onClick={() => showStep(10, 'next')}>{loading ? 'Loading...' : 'Selanjutnya'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
              {step === 10 && (
              <FormCardWrapper>
                <FormDiv>
                    <FormLabel htmlFor="produk">Pertanyaan 10 dari 10</FormLabel>
                    <FormH3>
                      <b>Instrumen investasi apa yang paling Anda sukai termasuk dari sisi risikonya?</b> (<i>Dapat memilih lebih dari satu</i>)
                    </FormH3>
                    {errors.produk && <FormH2Error>{errors.produk}</FormH2Error>}
                    <FormInputLeft>
                      <FormInput id="produk" type="checkbox" name="produk" value="1" checked={formData.produk.includes('1')} onChange={handleChange} />
                      <FormH2>Deposito</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="produk" type="checkbox" name="produk" value="2" checked={formData.produk.includes('2')} onChange={handleChange} />
                      <FormH2>Sukuk/Obligasi</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="produk" type="checkbox" name="produk" value="3" checked={formData.produk.includes('3')} onChange={handleChange} />
                      <FormH2>Reksadana</FormH2>
                    </FormInputLeft>
                    <FormInputLeft>
                      <FormInput id="produk" type="checkbox" name="produk" value="4" checked={formData.produk.includes('4')} onChange={handleChange} />
                      <FormH2>Saham</FormH2>
                    </FormInputLeft>
                    <FormButtonDiv>
                      <FormReset type="button" disabled={loading} onClick={() => showStep(9, 'back')}>{loading ? 'Loading...' : 'Kembali'}</FormReset>
                      <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Kirim'}</FormButton>
                    </FormButtonDiv>
                </FormDiv>
              </FormCardWrapper>
              )}
            </Form>
            <ResultModal
              show={showModal}
              hasilPertanyaan={hasilPertanyaan}
              onRetry={() => { setShowModal(false); setStep(1); setFormData({ jwb1: '', jwb2: '', jwb3: '', jwb4: '', jwb5: '', jwb6: '', jwb7: '', jwb8: '', jwb9: '', produk: [] }); }}
              onProceed={() => {
                history.push('/simulasi/');
                scroll.scrollToTop();
              }}
            />
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Questionnaire;
