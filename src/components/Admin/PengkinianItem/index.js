import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { format } from 'date-fns';
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
  FormH1,
  FormInputWrapper,
  FormInputDiv,
  FormText,
  FormButton
} from './PengkinianElements';

const PengkinianItemSection = () => {
  const { id } = useParams();
  const [pekerjaan, setPekerjaan] = useState([]);
  const [pemilikan, setPemilikan] = useState([]);
  const [usaha, setUsaha] = useState([]);
  const [penghasilan, setPenghasilan] = useState([]);
  const [PengkinianItem, setPengkinianItem] = useState(null);

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(process.env.REACT_APP_API_BASE_URL + `/mdplk/pengkinian-data-by-id/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        const formattedData = {
          ...response.data.content
        };
        setPengkinianItem(formattedData);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

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

  

  const handleDownload = (path) => {
    window.open(`/pengkinian-data/${path}`, '_blank');
  };

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form>
              <FormH1>Data Peserta</FormH1>
              <FormCardWrapper>
                {PengkinianItem && (
                <FormDiv>
                  <FormLabel htmlFor="no_peserta">Nomor Peserta</FormLabel>
                  <FormInput id="'no_peserta" type="text" name="no_peserta" value={PengkinianItem.no_peserta} readOnly />
                  <FormLabel htmlFor="nama">Nama</FormLabel>
                  <FormInput id="nama" type="text" name="nama" value={PengkinianItem.nama_lengkap} readOnly />
                  <FormLabel htmlFor="alamat_jalan">Alamat</FormLabel>
                  <FormText id="alamat_jalan" name="alamat_jalan" value={PengkinianItem.alamat_jalan} readOnly />
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw">RT/RW</FormLabel>
                      <FormInput id="rtrw" type="text" name="rtrw" value={PengkinianItem.alamat_rtrw} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos">Kode Pos</FormLabel>
                      <FormInput id="kodepos" type="text" name="kodepos" value={PengkinianItem.alamat_kode_pos} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="provinsi">Provinsi</FormLabel>
                  <FormInput id="provinsi" type="text" name="provinsi" value={PengkinianItem.alamat_propinsi} readOnly />
                  <FormLabel htmlFor="kota">Kabupaten/Kota</FormLabel>
                  <FormInput id="kota" type="text" name="kota" value={PengkinianItem.alamat_kota} readOnly />
                  <FormLabel htmlFor="kecamatan">Kecamatan</FormLabel>
                  <FormInput id="kecamatan" type="text" name="kecamatan" value={PengkinianItem.alamat_kecamatan} readOnly />
                  <FormLabel htmlFor="kelurahan">Desa/Kelurahan</FormLabel>
                  <FormInput id="kelurahan" type="text" name="kelurahan" value={PengkinianItem.alamat_kelurahan} readOnly />
                </FormDiv>
                )}
                {PengkinianItem && (
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="tempat_lahir">Tempat Lahir</FormLabel>
                      <FormInput id="tempat_lahir" type="text" name="tempat_lahir" value={PengkinianItem.tempat_lahir} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir" type="text" name="tanggal_lahir" value={format(new Date(PengkinianItem.tanggal_lahir), 'dd MMMM yyyy', { locale: localeID })} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_identitas_diri">Nomor Identitas</FormLabel>
                      <FormInput id="no_identitas_diri" type="text" name="no_identitas_diri" value={PengkinianItem.no_identitas_diri} readOnly />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="npwp">NPWP</FormLabel>
                      <FormInput id="npwp" type="text" name="npwp" value={PengkinianItem.npwp} readOnly />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="jenis_kelamin">Jenis Kelamin</FormLabel>
                  <FormInput id="jenis_kelamin" type="text" name="jenis_kelamin" value={convertJenisKelamin(PengkinianItem.jenis_kelamin)} readOnly />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" type="text" name="email" value={PengkinianItem.email} readOnly />
                  <FormLabel htmlFor="nohp">Nomor Telepon</FormLabel>
                  <FormInput id="nohp" type="text" name="nohp" value={PengkinianItem.nohp} readOnly />
                  <FormLabel htmlFor="ibu_kandung">Nama Gadis Ibu Kandung</FormLabel>
                  <FormInput id="ibu_kandung" type="text" name="ibu_kandung" value={PengkinianItem.ibu_kandung} readOnly />
                  <FormButton to="#" onClick={() => handleDownload(PengkinianItem.nama_dokumen)}>Foto Kartu Identitas</FormButton>
                </FormDiv>
                )}
              </FormCardWrapper>

              <FormH1>Data Pekerjaan</FormH1>
              <FormCardWrapper>
                {PengkinianItem && (
                <FormDiv>
                  <FormLabel htmlFor="pekerjaan">Pekerjaan</FormLabel>
                  <FormInput id="pekerjaan" type="text" name="pekerjaan" value={getNamaPekerjaan(PengkinianItem.pekerjaan)} readOnly />
                  <FormLabel htmlFor="pemilikan">Kepemilikan</FormLabel>
                  <FormInput id="pemilikan" type="text" name="pemilikan" value={getNamaPemilikan(PengkinianItem.pemilikan)} readOnly />
                  <FormLabel htmlFor="bidang_pekerjaan">Bidang Pekerjaan</FormLabel>
                  <FormInput id="bidang_pekerjaan" type="text" name="bidang_pekerjaan" value={getNamaUsaha(PengkinianItem.bidang_pekerjaan)} readOnly />
                </FormDiv>
                )}
                {PengkinianItem && (
                <FormDiv>
                  <FormLabel htmlFor="perusahaan">Nama Perusahaan</FormLabel>
                  <FormInput id="perusahaan" type="text" name="perusahaan" value={PengkinianItem.nama_perusahaan} readOnly />
                  <FormLabel htmlFor="penghasilan_tetap">Penghasilan Tetap (Bulan)</FormLabel>
                  <FormInput id="penghasilan_tetap" type="text" name="penghasilan_tetap" value={getNamaPenghasilan(PengkinianItem.penghasilan_tetap)} readOnly />
                  <FormLabel htmlFor="penghasilan_tidak_tetap">Penghasilan Tidak Tetap (Bulan)</FormLabel>
                  <FormInput id="penghasilan_tidak_tetap" type="text" name="penghasilan_tidak_tetap" value={getNamaPenghasilan(PengkinianItem.penghasilan_tidak_tetap)} readOnly />
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

export default PengkinianItemSection;
