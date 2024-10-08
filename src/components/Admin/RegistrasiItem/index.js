import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format, isValid } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormLabel,
  FormCardWrapper,
  FormDiv,
  FormH2,
  FormH1,
  FormInputWrapper,
  FormInputDiv,
  FormText,
  FormRupiahLeft,
  FormSpanLeft,
  FormInputCustomLeft,
  FormButton
} from './RegistrasiElements';

const RegistrasiItemSection = () => {
  const { id } = useParams();
  const [agama, setAgama] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const [pekerjaan, setPekerjaan] = useState([]);
  const [pemilikan, setPemilikan] = useState([]);
  const [usaha, setUsaha] = useState([]);
  const [penghasilan, setPenghasilan] = useState([]);
  const [sampingan, setSampingan] = useState([]);
  const [investasi, setPaketInvestasi] = useState([]);
  const [dana, setDana] = useState([]);
  const [RegistrasiItem, setRegistrasiItem] = useState(null);

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(process.env.REACT_APP_API_BASE_URL + `/registrasi/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        const formattedData = {
          ...response.data.content,
          jenis_identitas: convertJenisIdentitas(response.data.content.jenis_identitas),
          warganegara: convertWarganegara(response.data.content.warganegara),
          tanggal_lahir: isValid(new Date(response.data.content.tanggal_lahir)) ? format(new Date(response.data.content.tanggal_lahir), 'dd MMMM yyyy', { locale: localeID }) : '',
          tanggal_lahir_ahli_waris_1: isValid(new Date(response.data.content.tanggal_lahir_ahli_waris_1)) ? format(new Date(response.data.content.tanggal_lahir_ahli_waris_1), 'dd MMMM yyyy', { locale: localeID }) : '',
          tanggal_lahir_ahli_waris_2: isValid(new Date(response.data.content.tanggal_lahir_ahli_waris_2)) ? format(new Date(response.data.content.tanggal_lahir_ahli_waris_2), 'dd MMMM yyyy', { locale: localeID }) : '',
          tanggal_lahir_ahli_waris_3: isValid(new Date(response.data.content.tanggal_lahir_ahli_waris_3)) ? format(new Date(response.data.content.tanggal_lahir_ahli_waris_3), 'dd MMMM yyyy', { locale: localeID }) : '',
          jenis_kelamin: convertJenisKelamin(response.data.content.jenis_kelamin),
          jenis_kelamin_ahli_waris_1: convertJenisKelamin(response.data.content.jenis_kelamin_ahli_waris_1),
          jenis_kelamin_ahli_waris_2: convertJenisKelamin(response.data.content.jenis_kelamin_ahli_waris_2),
          jenis_kelamin_ahli_waris_3: convertJenisKelamin(response.data.content.jenis_kelamin_ahli_waris_3),
          perkawinan: convertPerkawinan(response.data.content.perkawinan),
          peserta_pengalihan: response.data.content.peserta_pengalihan ? 'Ya' : 'Tidak',
          peserta_dapen: response.data.content.peserta_dapen ? 'Ya' : 'Tidak',
          pembayaran_iuran: convertBayar(response.data.content.pembayaran_iuran)
        };
        setRegistrasiItem(formattedData);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  const convertJenisIdentitas = (jenis_identitas) => {
    switch (jenis_identitas) {
      case 'ktp':
        return 'KTP';
      case 'sim':
        return 'SIM';
      case 'paspor':
        return 'Paspor';
      case 'kitas':
        return 'KIM/KITAS';
      default:
        return jenis_identitas;
    }
  };

  const convertWarganegara = (warganegara) => {
    switch (warganegara) {
      case '1':
        return 'Warga Negara Indonesia';
      case '2':
        return 'Warga Negara Asing';
      default:
        return warganegara;
    }
  };

  const convertJenisKelamin = (jenis_kelamin) => {
    switch (jenis_kelamin) {
      case 'P':
        return 'Pria';
      case 'W':
        return 'Wanita';
      default:
        return jenis_kelamin;
    }
  };

  const convertPerkawinan = (perkawinan) => {
    switch (perkawinan) {
      case '1':
        return 'Belum Menikah';
      case '2':
        return 'Menikah';
        case '3':
        return 'Janda/Duda';
      default:
        return perkawinan;
    }                
  };

  const convertBayar = (pembayaran_iuran) => {
    switch (pembayaran_iuran) {
      case '1':
        return 'Tunai';
      case '2':
        return 'Transfer';
        case '3':
        return 'Autodebet rekening Bank Muamalat';
      default:
        return pembayaran_iuran;
    }
  }

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/agama`)
      .then(response => {
        setAgama(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaAgama = (code) => {
    const agamaItem = agama.find(item => item.code === code);
    return agamaItem ? agamaItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/pendidikan`)
      .then(response => {
        setPendidikan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaPendidikan = (code) => {
      const pendidikanItem = pendidikan.find(item => item.code === code);
      return pendidikanItem ? pendidikanItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/pekerjaan`)
      .then(response => {
        setPekerjaan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaPekerjaan = (code) => {
      const pekerjaanItem = pekerjaan.find(item => item.code === code);
      return pekerjaanItem ? pekerjaanItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/kepemilikan`)
      .then(response => {
        setPemilikan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaPemilikan = (code) => {
      const pemilikanItem = pemilikan.find(item => item.code === code);
      return pemilikanItem ? pemilikanItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/usaha`)
      .then(response => {
        setUsaha(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaUsaha = (code) => {
      const usahaItem = usaha.find(item => item.code === code);
      return usahaItem ? usahaItem.nama : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/penghasilan`)
      .then(response => {
        setPenghasilan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaPenghasilan = (code) => {
      const penghasilanItem = penghasilan.find(item => item.code === code);
      return penghasilanItem ? penghasilanItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/sampingan`)
      .then(response => {
        setSampingan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaSampingan = (code) => {
      const sampinganItem = sampingan.find(item => item.code === code);
      return sampinganItem ? sampinganItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/investasi`)
      .then(response => {
        setPaketInvestasi(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaInvestasi = (value) => {
      const investasiItem = investasi.find(item => item.value === value);
      return investasiItem ? investasiItem.name : '';
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/dana`)
      .then(response => {
        setDana(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const getNamaDana = (code) => {
      const danaItem = dana.find(item => item.code === code);
      return danaItem ? danaItem.name : '';
  };

  const handleDownload = (path) => {
    window.open(`/registrasi-peserta/${path}`, '_blank');
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form>
              <FormH1>Identitas Peserta</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="nama">Nama</FormLabel>
                  <FormInput id="nama" type="text" name="nama" value={RegistrasiItem.nama} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_identitas">Jenis Identitas</FormLabel>
                      <FormInput id="jenis_identitas" name="jenis_identitas" value={RegistrasiItem.jenis_identitas} type="text" readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_identitas">Nomor Identitas</FormLabel>
                      <FormInput id="no_identitas" type="text" name="no_identitas" value={RegistrasiItem.no_identitas} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="alamat">Alamat</FormLabel>
                  <FormText id="alamat" name="alamat" value={RegistrasiItem.alamat} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw">RT/RW</FormLabel>
                      <FormInput id="rtrw" type="text" name="rtrw" value={RegistrasiItem.rtrw} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos">Kode Pos</FormLabel>
                      <FormInput id="kodepos" type="text" name="kodepos" value={RegistrasiItem.kodepos} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
                  <FormInput id="provinsi" type="text" name="provinsi" value={RegistrasiItem.provinsi} readOnly />
                  <FormLabel htmlFor="kota">Kabupaten/Kota</FormLabel>
                  <FormInput id="kota" type="text" name="kota" value={RegistrasiItem.kota} readOnly />
                  <FormLabel htmlFor="kecamatan">Kecamatan</FormLabel>
                  <FormInput id="kecamatan" type="text" name="kecamatan" value={RegistrasiItem.kecamatan} readOnly />
                  <FormLabel htmlFor="kelurahan">Desa/Kelurahan</FormLabel>
                  <FormInput id="kelurahan" type="text" name="kelurahan" value={RegistrasiItem.kelurahan} readOnly />
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="tempat_lahir">Tempat Lahir</FormLabel>
                      <FormInput id="tempat_lahir" type="text" name="tempat_lahir" value={RegistrasiItem.tempat_lahir} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir" type="text" name="tanggal_lahir" value={RegistrasiItem.tanggal_lahir} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="warganegara">Kewarganegaraan</FormLabel>
                  <FormInput id="warganegara" type="text" name="warganegara" value={RegistrasiItem.warganegara} readOnly />
                  <FormLabel htmlFor="jenis_kelamin">Jenis Kelamin</FormLabel>
                  <FormInput id="jenis_kelamin" type="text" name="jenis_kelamin" value={RegistrasiItem.jenis_kelamin} readOnly />
                  <FormLabel htmlFor="agama">Agama</FormLabel>
                  <FormInput id="agama" type="text" name="agama" value={getNamaAgama(RegistrasiItem.agama)} readOnly />
                  <FormLabel htmlFor="ibu_kandung">Nama Gadis Ibu Kandung</FormLabel>
                  <FormInput id="ibu_kandung" type="text" name="ibu_kandung" value={RegistrasiItem.ibu_kandung} readOnly />
                  <FormLabel htmlFor="no_referensi">Nomor Referensi</FormLabel>
                  <FormInput id="no_referensi" type="text" name="no_referensi" value={RegistrasiItem.no_referensi} readOnly />
                  <FormButton to="#" onClick={() => handleDownload(RegistrasiItem.foto_ktp)}>Foto Kartu Identitas</FormButton>
                  <FormButton to="#" onClick={() => handleDownload(RegistrasiItem.foto_kk)}>Foto Kartu Keluarga</FormButton>
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Data Peserta</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="alamat_rumah">Alamat Rumah</FormLabel>
                  <FormText id="alamat_rumah" name="alamat_rumah" value={RegistrasiItem.alamat_rumah} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw_rumah">RT/RW</FormLabel>
                      <FormInput id="rtrw_rumah" type="text" name="rtrw_rumah" value={RegistrasiItem.rtrw_rumah} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos_rumah">Kode Pos</FormLabel>
                      <FormInput id="kodepos_rumah" type="text" name="kodepos_rumah" value={RegistrasiItem.kodepos_rumah} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="provinsi_rumah">Provinsi</FormLabel>
                  <FormInput id="provinsi_rumah" type="text" name="provinsi_rumah" value={RegistrasiItem.provinsi_rumah} readOnly />
                  <FormLabel htmlFor="kota_rumah">Kabupaten/Kota</FormLabel>
                  <FormInput id="kota_rumah" type="text" name="kota_rumah" value={RegistrasiItem.kota_rumah} readOnly />
                  <FormLabel htmlFor="kecamatan_rumah">Kecamatan</FormLabel>
                  <FormInput id="kecamatan_rumah" type="text" name="kecamatan_rumah" value={RegistrasiItem.kecamatan_rumah} readOnly />
                  <FormLabel htmlFor="kelurahan_rumah">Desa/Kelurahan</FormLabel>
                  <FormInput id="kelurahan_rumah" type="text" name="kelurahan_rumah" value={RegistrasiItem.kelurahan_rumah} readOnly />
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="pendidikan">Pendidikan Terakhir</FormLabel>
                  <FormInput id="pendidikan" name="pendidikan" type="text" value={getNamaPendidikan(RegistrasiItem.pendidikan)} readOnly />
                  <FormLabel htmlFor="perkawinan">Status Perkawinan</FormLabel>
                  <FormInput id="perkawinan" name="perkawinan" type="text" value={RegistrasiItem.perkawinan} readOnly />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" type="text" name="email" value={RegistrasiItem.email} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_hp">Nomor Telepon Genggam</FormLabel>
                      <FormInput id="no_hp" type="text" name="no_hp" value={RegistrasiItem.no_hp} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_telp">Nomor Telepon Rumah</FormLabel>
                      <FormInput id="no_telp" type="text" name="no_telp" value={RegistrasiItem.no_telp} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="npwp">NPWP</FormLabel>
                  <FormInput id="npwp" type="text" name="npwp" value={RegistrasiItem.npwp} readOnly />
                  <FormButton to="#" onClick={() => handleDownload(RegistrasiItem.foto_npwp)}>Foto NPWP</FormButton>
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Data Pekerjaan</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="pekerjaan">Pekerjaan</FormLabel>
                  <FormInput id="pekerjaan" type="text" name="pekerjaan" value={getNamaPekerjaan(RegistrasiItem.pekerjaan)} readOnly />
                  <FormLabel htmlFor="perusahaan">Nama Perusahaan</FormLabel>
                  <FormInput id="perusahaan" type="text" name="perusahaan" value={RegistrasiItem.perusahaan} readOnly />
                  <FormLabel htmlFor="pemilikan">Kepemilikan</FormLabel>
                  <FormInput id="pemilikan" type="text" name="pemilikan" value={getNamaPemilikan(RegistrasiItem.pemilikan)} readOnly />
                  <FormLabel htmlFor="bidang_pekerjaan">Bidang Pekerjaan</FormLabel>
                  <FormInput id="bidang_pekerjaan" type="text" name="bidang_pekerjaan" value={getNamaUsaha(RegistrasiItem.bidang_pekerjaan)} readOnly />
                  <FormLabel htmlFor="alamat_kantor">Alamat Perusahaan</FormLabel>
                  <FormText id="alamat_kantor" name="alamat_kantor" value={RegistrasiItem.alamat_kantor} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw_kantor">RT/RW</FormLabel>
                      <FormInput id="rtrw_kantor" type="text" name="rtrw_kantor" value={RegistrasiItem.rtrw_kantor} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos_kantor">Kode Pos</FormLabel>
                      <FormInput id="kodepos_kantor" type="text" name="kodepos_kantor" value={RegistrasiItem.kodepos_kantor} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="provinsi_kantor">Provinsi</FormLabel>
                  <FormInput id="provinsi_kantor" type="text" name="provinsi_kantor" value={RegistrasiItem.provinsi_kantor} readOnly />
                  <FormLabel htmlFor="kota_kantor">Kabupaten/Kota</FormLabel>
                  <FormInput id="kota_kantor" type="text" name="kota_kantor" value={RegistrasiItem.kota_kantor} readOnly />
                  <FormLabel htmlFor="kecamatan_kantor">Kecamatan</FormLabel>
                  <FormInput id="kecamatan_kantor" type="text" name="kecamatan_kantor" value={RegistrasiItem.kecamatan_kantor} readOnly />
                  <FormLabel htmlFor="kelurahan_kantor">Desa/Kelurahan</FormLabel>
                  <FormInput id="kelurahan_kantor" type="text" name="kelurahan_kantor" value={RegistrasiItem.kelurahan_kantor} readOnly />
                  <FormLabel htmlFor="penghasilan_tetap">Penghasilan Tetap (Bulan)</FormLabel>
                  <FormInput id="penghasilan_tetap" type="text" name="penghasilan_tetap" value={getNamaPenghasilan(RegistrasiItem.penghasilan_tetap)} readOnly />
                  <FormLabel htmlFor="penghasilan_tidak_tetap">Penghasilan Tidak Tetap (Bulan)</FormLabel>
                  <FormInput id="penghasilan_tidak_tetap" type="text" name="penghasilan_tidak_tetap" value={getNamaPenghasilan(RegistrasiItem.penghasilan_tidak_tetap)} readOnly />
                  <FormLabel htmlFor="penghasilan_tambahan">Penghasilan Tambahan</FormLabel>
                  <FormInput id="penghasilan_tambahan" type="text" name="penghasilan_tambahan" value={getNamaSampingan(RegistrasiItem.penghasilan_tambahan)} readOnly />
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Data Kepesertaan</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="usia_pensiun">Usia Pensiun</FormLabel>
                  <FormInput id="usia_pensiun" type="text" name="usia_pensiun" value={RegistrasiItem.usia_pensiun} readOnly />
                  <FormH2><i>Usia pensiun minimal 55 tahun.</i></FormH2>
                  <FormLabel htmlFor="iuran">Iuran</FormLabel>
                  <FormRupiahLeft>
                    <FormSpanLeft>Rp</FormSpanLeft>
                    <FormInputCustomLeft id="iuran" type="text" name="iuran" value={RegistrasiItem.iuran} readOnly />
                  </FormRupiahLeft>
                  <FormH2><i>Iuran pensiun per bulan.</i></FormH2>
                  <FormLabel htmlFor="pembayaran_iuran">Sistem Pembayaran Iuran</FormLabel>
                  <FormInput id="pembayaran_iuran" type="text" name="pembayaran_iuran" value={RegistrasiItem.pembayaran_iuran} readOnly />
                  <FormLabel htmlFor="paket_investasi">Paket Investasi</FormLabel>
                  <FormInput id="paket_investasi" type="text" name="paket_investasi" value={RegistrasiItem.paket_investasi} readOnly />
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="peserta_pengalihan">Peserta Pengalihan</FormLabel>
                      <FormInput id="peserta_pengalihan" type="text" name="peserta_pengalihan" value={RegistrasiItem.peserta_pengalihan} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_pengalihan">Nama Dana Pensiun</FormLabel>
                      <FormInput id="nama_pengalihan" type="text" name="nama_pengalihan" value={RegistrasiItem.nama_pengalihan} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="peserta_dapen">Peserta Dana Pensiun Lain</FormLabel>
                      <FormInput id="peserta_dapen" type="text" name="peserta_dapen" value={RegistrasiItem.peserta_dapen} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_dapen">Nama Dana Pensiun</FormLabel>
                      <FormInput id="nama_dapen" type="text" name="nama_dapen" value={RegistrasiItem.nama_dapen} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="dana_rekening">Sumber Dana Rekening</FormLabel>
                  <FormInput id="dana_rekening" type="text" name="dana_rekening" value={RegistrasiItem.dana_rekening} readOnly />
                  <FormLabel htmlFor="dana_iuran">Sumber Dana Iuran</FormLabel>
                  <FormInput id="dana_iuran" type="text" name="dana_iuran" value={RegistrasiItem.dana_iuran} readOnly />
                  <FormLabel htmlFor="kode_cab_daftar">Kode Cabang Daftar</FormLabel>
                  <FormInput id="kode_cab_daftar" type="text" name="kode_cab_daftar" value={RegistrasiItem.kode_cab_daftar} readOnly />
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Kepemilikan Rekening</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="rekening_muamalat">Nama Bank (Muamalat)</FormLabel>
                  <FormInput id="rekening_muamalat" type="text" name="rekening_muamalat" value={RegistrasiItem.rekening_muamalat} readOnly />
                  <FormLabel htmlFor="rekening_1">Nama Bank</FormLabel>
                  <FormInput id="rekening_1" type="text" name="rekening_1" value={RegistrasiItem.rekening_1} readOnly />
                  <FormLabel htmlFor="rekening_2">Nama Bank</FormLabel>
                  <FormInput id="rekening_2" type="text" name="rekening_2" value={RegistrasiItem.rekening_2} readOnly />
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormLabel htmlFor="no_rekening_muamalat">Nomor Rekening (Muamalat)</FormLabel>
                  <FormInput id="no_rekening_muamalat" type="text" name="no_rekening_muamalat" value={RegistrasiItem.no_rekening_muamalat} readOnly />
                  <FormLabel htmlFor="no_rekening_1">Nomor Rekening</FormLabel>
                  <FormInput id="no_rekening_1" type="text" name="no_rekening_1" value={RegistrasiItem.no_rekening_1} readOnly />
                  <FormLabel htmlFor="no_rekening_2">Nomor Rekening</FormLabel>
                  <FormInput id="no_rekening_2" type="text" name="no_rekening_2" value={RegistrasiItem.no_rekening_2} readOnly />
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Ahli Waris</FormH1>
              <FormCardWrapper>
                {RegistrasiItem && (
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_1">Nama Lengkap</FormLabel>
                      <FormInput id="nama_ahli_waris_1" type="text" name="nama_ahli_waris_1" value={RegistrasiItem.nama_ahli_waris_1} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_1">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_1" type="text" name="tanggal_lahir_ahli_waris_1" value={RegistrasiItem.tanggal_lahir_ahli_waris_1} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_2">Nama Lengkap</FormLabel>
                      <FormInput id="nama_ahli_waris_2" type="text" name="nama_ahli_waris_2" value={RegistrasiItem.nama_ahli_waris_2} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_2">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_2" type="text" name="tanggal_lahir_ahli_waris_2" value={RegistrasiItem.tanggal_lahir_ahli_waris_2} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_3">Nama Lengkap</FormLabel>
                      <FormInput id="nama_ahli_waris_3" type="text" name="nama_ahli_waris_3" value={RegistrasiItem.nama_ahli_waris_3} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_3">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_3" type="text" name="tanggal_lahir_ahli_waris_3" value={RegistrasiItem.tanggal_lahir_ahli_waris_3} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                </FormDiv>
                )}
                {RegistrasiItem && (
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_1">Jenis Kelamin</FormLabel>
                      <FormInput id="jenis_kelamin_ahli_waris_1" type="text" name="jenis_kelamin_ahli_waris_1" value={RegistrasiItem.jenis_kelamin_ahli_waris_1} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_1">Hubungan Keluarga</FormLabel>
                      <FormInput id="hubungan_ahli_waris_1" type="text" name="hubungan_ahli_waris_1" value={RegistrasiItem.hubungan_ahli_waris_1} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_2">Jenis Kelamin</FormLabel>
                      <FormInput id="jenis_kelamin_ahli_waris_2" type="text" name="jenis_kelamin_ahli_waris_2" value={RegistrasiItem.jenis_kelamin_ahli_waris_2} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_2">Hubungan Keluarga</FormLabel>
                      <FormInput id="hubungan_ahli_waris_2" type="text" name="hubungan_ahli_waris_2" value={RegistrasiItem.hubungan_ahli_waris_2} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_3">Jenis Kelamin</FormLabel>
                      <FormInput id="jenis_kelamin_ahli_waris_3" type="text" name="jenis_kelamin_ahli_waris_3" value={RegistrasiItem.jenis_kelamin_ahli_waris_3} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_3">Hubungan Keluarga</FormLabel>
                      <FormInput id="hubungan_ahli_waris_3" type="text" name="hubungan_ahli_waris_3" value={RegistrasiItem.hubungan_ahli_waris_3} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                </FormDiv>
                )}
              </FormCardWrapper>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default RegistrasiItemSection;
