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
  FormInputWrapper,
  FormInputDiv,
  FormText,
  FormRupiahLeft
} from './PengkinianElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import SuccessModal from '../Modal/Sukses';
import { animateScroll as scroll } from 'react-scroll';
import { dataServer } from '../../DataServer';

const Pengkinian = ({ userData }) => {
  const [data, setData] = useState({
    no_peserta: '',
    nama: '',
    tgl_lahir: '',
    tmp_lahir: '',
    noktp: '',
    npwp: '',
    jenis_kelamin: '',
    ibu_kandung: '',
    hp: '',
    alamat_jalan: '', 
    alamat_rtrw: '',
    alamat_kelurahan: '',
    alamat_kecamatan: '',
    alamat_kota: '',
    alamat_propinsi: '',
    alamat_kode_pos: '', 
    email: '',
    pekerjaan: '',
    pemilikan: '',
    nama_perusahaan: '',
    bidangpekerjaan: '',
    penghasilantetap: '',
    penghasilantidaktetap: '',
    gambar_ktp: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [provinces, setProvinces] = useState([]);
  const [districts, setKota] = useState([]);
  const [subdistricts, setKecamatan] = useState([]);
  const [villages, setKelurahan] = useState([]);
  const [pekerjaanData, setPekerjaan] = useState([]);
  const [pemilikanData, setPemilikan] = useState([]);
  const [usahaData, setUsaha] = useState([]);
  const [penghasilanData, setPenghasilan] = useState([]);
  const [penghasilanTidakTetapData, setPenghasilanTidakTetap] = useState([]);
  const [gambarKtp, setGambarKtp] = useState(null);
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
          tgl_lahir: fetchedData.tanggal_lahir,
          tmp_lahir: fetchedData.tempat_lahir,
          noktp: fetchedData.NO_IDENTITAS_DIRI,
          npwp: fetchedData.NPWP,
          jenis_kelamin: fetchedData.JENIS_KELAMIN,
          ibu_kandung: fetchedData.ibu_kandung,
          hp: fetchedData.alamat_telepon,
          alamat_jalan: fetchedData.alamat_jalan,
          alamat_rtrw: fetchedData.alamat_rtrw,
          alamat_kelurahan: fetchedData.alamat_kelurahan,
          alamat_kecamatan: fetchedData.alamat_kecamatan,
          alamat_kota: fetchedData.alamat_kota,
          alamat_propinsi: fetchedData.alamat_propinsi,
          alamat_kode_pos: fetchedData.alamat_kode_pos,
          email: fetchedData.ALAMAT_EMAIL,
          pekerjaan: fetchedData.pekerjaan,
          pemilikan: fetchedData.kode_pemilikan,
          nama_perusahaan: fetchedData.nama_perusahaan,
          bidangpekerjaan: fetchedData.kode_jenis_usaha,
          penghasilantetap: fetchedData.penghasilan_tetap,
          penghasilantidaktetap: fetchedData.penghasilan_tidak_tetap,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/pekerjaan`)
      .then(response => {
        setPekerjaan(response.data);
      })
      .catch(error => console.error('Error fetching pekerjaan:', error));
  }, []);

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/kepemilikan`)
      .then(response => {
        setPemilikan(response.data);
      })
      .catch(error => console.error('Error fetching kepemilikan:', error));
  }, []);

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/usaha`)
      .then(response => {
        setUsaha(response.data);
      })
      .catch(error => console.error('Error fetching jenis usaha:', error));
  }, []);

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/penghasilan`)
      .then(response => {
        setPenghasilan(response.data);
      })
      .catch(error => console.error('Error fetching penghasilan:', error));
  }, []);

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/master/penghasilan`)
      .then(response => {
        setPenghasilanTidakTetap(response.data);
      })
      .catch(error => console.error('Error fetching penghasilan:', error));
  }, []);

  useEffect(() => {
    axios.get(`${dataServer.href}/api/v1/wilayah/province`)
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  const handleProvinsiChange = (event) => {
    const selectedProvinsi = provinces.find(provinsi => provinsi.name === event.target.value);
    if (!selectedProvinsi) {
      console.error('Provinsi not found:', event.target.value);
      return;
    }
    setData(prevState => ({
      ...prevState,
      alamat_propinsi: selectedProvinsi.name,
    }));
  
    axios.get(`${dataServer.href}/api/v1/wilayah/district?provinsi_id=${selectedProvinsi.id}`)
      .then(response => {
        setKota(response.data);
      })
      .catch(error => console.error('Error fetching cities:', error));
  };

  const handleKotaChange = (event) => {
    const selectedKota = districts.find(kota => kota.name === event.target.value);
    if (!selectedKota) {
      console.error('Kota not found:', event.target.value);
      return;
    }
    setData(prevState => ({
      ...prevState,
      alamat_kota: selectedKota.name,
    }));
  
    axios.get(`${dataServer.href}/api/v1/wilayah/subdistrict?kabupaten_id=${selectedKota.id}`)
      .then(response => {
        setKecamatan(response.data);
      })
      .catch(error => console.error('Error fetching sub-cities:', error));
  };

  const handleKecamatanChange = (event) => {
    const selectedKecamatan = subdistricts.find(kecamatan => kecamatan.name === event.target.value);
    if (!selectedKecamatan) {
      console.error('Kecamatan not found:', event.target.value);
      return;
    }
    setData(prevState => ({
      ...prevState,
      alamat_kecamatan: selectedKecamatan.name,
    }));
  
    axios.get(`${dataServer.href}/api/v1/wilayah/village?kecamatan_id=${selectedKecamatan.id}`)
      .then(response => {
        setKelurahan(response.data);
      })
      .catch(error => console.error('Error fetching villages:', error));
  };

  const handleKelurahanChange = (event) => {
    setData(prevState => ({
      ...prevState,
      alamat_kelurahan: event.target.value,
    }));
  };

  const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambarKtp(file);
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsCheckboxChecked(checked);
    setShowButton(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('gambar_ktp', gambarKtp);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(data);
    try {
      const response = await axios.post(`${dataServer.href}/api/v1/mdplk/pengkinian-data`, formData);
      console.log(response.data);
      setSuccess('Data berhasil disimpan. Akan kami lakukan verifikasi terlebih dahulu. Mohon dapat dicek secara berkala.');
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
            <FormH1>Data Peserta</FormH1>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                <FormInput type='text' name='no_peserta' value={data.no_peserta} onChange={handleChange} readOnly />
                <FormLabel htmlFor="nama">Nama</FormLabel>
                <FormInput type='text' name='nama' value={data.nama} onChange={handleChange} />
                <FormH2><i>Nama sesuai yang tertera di kartu identitas.</i></FormH2>
                <FormLabel htmlFor="alamat_jalan">Alamat</FormLabel>
                <FormText id="alamat_jalan" name="alamat_jalan" value={data.alamat_jalan} onChange={handleChange} />
                <FormH2><i>Alamat sesuai yang tertera di kartu identitas.</i></FormH2>
                <FormInputWrapper>
                  <FormInputDiv>
                    <FormLabel htmlFor="alamat_rtrw">RT/RW</FormLabel>
                    <FormInput id="alamat_rtrw" type="text" name="alamat_rtrw" value={data.alamat_rtrw} onChange={handleChange} />
                  </FormInputDiv>
                  <FormInputDiv>
                    <FormLabel htmlFor="alamat_kode_pos">Kode Pos</FormLabel>
                    <FormInput id="alamat_kode_pos" type="text" name="alamat_kode_pos" value={data.alamat_kode_pos} onChange={handleChange} />
                  </FormInputDiv>
                </FormInputWrapper>
                <FormLabel htmlFor="alamat_propinsi">Provinsi</FormLabel>
                <FormSelect id="alamat_propinsi" name="alamat_propinsi" onChange={handleProvinsiChange} value={data.alamat_propinsi}>
                  {provinces.map(province => (
                    <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="alamat_kota">Kabupaten/Kota</FormLabel>
                <FormSelect id="alamat_kota" name="alamat_kota" onChange={handleKotaChange} value={data.alamat_kota}>
                  {districts.map(city => (
                    <FormOption key={city.id} value={`${city.name}`}>{`${city.type} ${city.name}`}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="alamat_kecamatan">Kecamatan</FormLabel>
                <FormSelect id="alamat_kecamatan" name="alamat_kecamatan" onChange={handleKecamatanChange} value={data.alamat_kecamatan}>
                  {subdistricts.map(kecamatan => (
                    <FormOption key={kecamatan.id} value={kecamatan.name}>{kecamatan.name}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="alamat_kelurahan">Desa/Kelurahan</FormLabel>
                <FormSelect id="alamat_kelurahan" name="alamat_kelurahan" onChange={handleKelurahanChange} value={data.alamat_kelurahan}>
                  {villages.map(kelurahan => (
                    <FormOption key={kelurahan.id} value={kelurahan.name}>{kelurahan.name}</FormOption>
                  ))}
                </FormSelect>        
              </FormDiv>
              <FormDiv>
                <FormInputWrapper>
                  <FormInputDiv>
                    <FormLabel htmlFor="tmp_lahir">Tempat Lahir</FormLabel>
                    <FormInput id="tmp_lahir" type="text" name="tmp_lahir" value={data.tmp_lahir} onChange={handleChange} />
                  </FormInputDiv>
                  <FormInputDiv>
                    <FormLabel htmlFor="tgl_lahir">Tanggal Lahir</FormLabel>
                    <FormInput id="tgl_lahir" type="date" name="tgl_lahir" value={data.tgl_lahir} onChange={handleChange} />
                  </FormInputDiv>
                </FormInputWrapper>
                <FormInputWrapper>
                  <FormInputDiv>
                    <FormLabel htmlFor="noktp">Nomor Identitas</FormLabel>
                    <FormInput id="noktp" type="text" name="noktp" value={data.noktp} onChange={handleChange} />
                  </FormInputDiv>
                  <FormInputDiv>
                    <FormLabel htmlFor="npwp">NPWP</FormLabel>
                    <FormInput id="npwp" type="text" name="npwp" value={data.npwp} onChange={handleChange} />
                  </FormInputDiv>
                </FormInputWrapper>
                <FormLabel htmlFor="jenis_kelamin">Jenis Kelamin</FormLabel>
                <FormSelect id="jenis_kelamin" name="jenis_kelamin" value={data.jenis_kelamin} onChange={handleChange}>
                  <FormOption value="">Jenis Kelamin</FormOption>
                  <FormOption value="P">Pria</FormOption>
                  <FormOption value="W">Wanita</FormOption>
                </FormSelect>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput id="email" type="text" name="email" value={data.email} onChange={handleChange} />
                <FormLabel htmlFor="hp">Nomor Telepon Genggam</FormLabel>
                <FormInput id="hp" type="text" name="hp" value={data.hp} onChange={handleChange} />
                <FormLabel htmlFor="ibu_kandung">Nama Gadis Ibu Kandung</FormLabel>
                <FormInput id="ibu_kandung" type="text" name="ibu_kandung" value={data.ibu_kandung} onChange={handleChange} />
                <FormH2><i>Nama sesuai yang tertera di kartu keluarga.</i></FormH2>
                <FormLabel htmlFor="gambar_ktp">Upload Foto Kartu Identitas</FormLabel>
                <FormInput id="gambar_ktp" type="file" name="gambar_ktp" onChange={handleFileChange} />
                <FormH2><i>Unggah dalam format JPG, JPEG atau PNG.</i></FormH2>
              </FormDiv>
            </FormCardWrapper>
            
            <FormH1>Data Pekerjaan</FormH1>
            <FormCardWrapper>
              <FormDiv>
                <FormLabel htmlFor="pekerjaan">Pekerjaan</FormLabel>
                <FormSelect id="pekerjaan" name="pekerjaan" value={data.pekerjaan} onChange={handleChange}>
                  {pekerjaanData && pekerjaanData.map((pekerjaan) => (
                    <FormOption key={pekerjaan.id} value={pekerjaan.code}>{pekerjaan.name}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="pemilikan">Kepemilikan</FormLabel>
                <FormSelect id="pemilikan" name="pemilikan" value={data.pemilikan} onChange={handleChange}>
                  {pemilikanData && pemilikanData.map((pemilikan) => (
                    <FormOption key={pemilikan.id} value={pemilikan.code}>{pemilikan.name}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="bidangpekerjaan">Bidang Pekerjaan</FormLabel>
                <FormSelect id="bidangpekerjaan" name="bidangpekerjaan" value={data.bidangpekerjaan} onChange={handleChange}>
                  {usahaData && usahaData.map((usaha) => (
                    <FormOption key={usaha.id} value={usaha.code}>{usaha.nama}</FormOption>
                  ))}
                </FormSelect>
              </FormDiv>
              <FormDiv>
                <FormLabel htmlFor="nama_perusahaan">Nama Perusahaan</FormLabel>
                <FormInput id="nama_perusahaan" type="text" name="nama_perusahaan" value={data.nama_perusahaan} onChange={handleChange} />
                <FormLabel htmlFor="penghasilantetap">Penghasilan Tetap (Bulan)</FormLabel>
                <FormSelect id="penghasilantetap" name="penghasilantetap" value={data.penghasilantetap} onChange={handleChange}>
                  {penghasilanData && penghasilanData.map((penghasilan) => (
                    <FormOption key={penghasilan.id} value={penghasilan.code}>{penghasilan.name}</FormOption>
                  ))}
                </FormSelect>
                <FormLabel htmlFor="penghasilantidaktetap">Penghasilan Tidak Tetap (Bulan)</FormLabel>
                <FormSelect id="penghasilantidaktetap" name="penghasilantidaktetap" value={data.penghasilantidaktetap} onChange={handleChange}>
                  {penghasilanTidakTetapData && penghasilanTidakTetapData.map((penghasilan) => (
                    <FormOption key={penghasilan.id} value={penghasilan.code}>{penghasilan.name}</FormOption>
                  ))}
                </FormSelect>
              </FormDiv>
            </FormCardWrapper>

            <FormH1>Pernyataan Peserta</FormH1>
            <FormH3>
              Dengan menekan tombol <b>Simpan</b> atau pernyataan serupa yang tersedia di halaman ini, saya dengan sadar dan tanpa paksaan, setuju dan menyetujui:
              <ol>
                <li>Bahwa data yang saya berikan adalah benar dan lengkap.</li>
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

export default Pengkinian;
