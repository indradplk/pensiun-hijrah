import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
  FormH2Error,
  FormH1,
  FormInputWrapper,
  FormInputDiv,
  FormText,
  FormRupiahLeft,
  FormSpanLeft,
  FormInputCustomLeft,
  FormAgreeLeft,
  FormH1Error,
  FormInputWrapperGrid,
  FormInputWrapper4Grid,
  FormCardWrapperRow
} from './RegistrasiElements';
import {
  ErrorCard,
  MessageH1,
  MessageH2,
} from './MessageElements';
import SuccessModal from '../Modal/Sukses';

const Registrasi = () => {
  const [formData, setFormData] = useState({
    nama: '',
    tempat_lahir: '', 
    tanggal_lahir: '', 
    jenis_identitas: '', 
    no_identitas: '',  
    kodepos: '', 
    warganegara: '', 
    jenis_kelamin: '', 
    agama: '', 
    ibu_kandung: '',
    alamat: '', 
    rtrw: '', 
    kelurahan: '', 
    kecamatan: '', 
    kota: '', 
    provinsi: '',
    foto_ktp: null,
    foto_kk: null,
    foto_npwp: null,
    no_referensi: '',
    npwp: '',
    alamat_rumah: '',
    rtrw_rumah: '',
    kelurahan_rumah: '',
    kecamatan_rumah: '',
    kota_rumah: '',
    provinsi_rumah: '',
    kodepos_rumah: '',
    pendidikan: '',
    perkawinan: '',
    email: '',
    no_hp: '',
    no_telp: '',
    pekerjaan: '',
    perusahaan: '',
    pemilikan: '',
    bidang_pekerjaan: '',
    alamat_kantor: '',
    rtrw_kantor: '',
    kelurahan_kantor: '',
    kecamatan_kantor: '',
    kota_kantor: '',
    provinsi_kantor: '',
    kodepos_kantor: '',
    penghasilan_tetap: '',
    penghasilan_tidak_tetap: '',
    penghasilan_tambahan: '',
    usia_pensiun: '',
    iuran: '',
    pembayaran_iuran: '',
    paket_investasi: '',
    peserta_pengalihan: '',
    nama_pengalihan: '',
    peserta_dapen: '',
    nama_dapen: '',
    dana_rekening: '',
    dana_iuran: '',
    rekening_muamalat: '',
    no_rekening_muamalat: '',
    rekening_1: '',
    no_rekening_1: '',
    rekening_2: '',
    no_rekening_2: '',
    nama_ahli_waris_1: '',
    tanggal_lahir_ahli_waris_1: '',
    jenis_kelamin_ahli_waris_1: '',
    hubungan_ahli_waris_1: '',
    nama_ahli_waris_2: '',
    tanggal_lahir_ahli_waris_2: '',
    jenis_kelamin_ahli_waris_2: '',
    hubungan_ahli_waris_2: '',
    nama_ahli_waris_3: '',
    tanggal_lahir_ahli_waris_3: '',
    jenis_kelamin_ahli_waris_3: '',
    hubungan_ahli_waris_3: '',
    kode_cab_daftar: '',
    samaDenganKTP: false
  });
  const history = useHistory();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agamaData, setAgama] = useState([]);
  const [pendidikanData, setPendidikan] = useState([]);
  const [pekerjaanData, setPekerjaan] = useState([]);
  const [pemilikanData, setPemilikan] = useState([]);
  const [usahaData, setUsaha] = useState([]);
  const [penghasilanData, setPenghasilan] = useState([]);
  const [penghasilanTidakTetapData, setPenghasilanTidakTetap] = useState([]);
  const [penghasilanTambahan, setPenghasilanTambahan] = useState([]);
  const [paketInvestasi, setPaketInvestasi] = useState([]);
  const [danaRekening, setDanaRekening] = useState([]);
  const [danaIuran, setDanaIuran] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setKota] = useState([]);
  const [subdistricts, setKecamatan] = useState([]);
  const [villages, setKelurahan] = useState([]);
  const [districtsRumah, setKotaRumah] = useState([]);
  const [subdistrictsRumah, setKecamatanRumah] = useState([]);
  const [villagesRumah, setKelurahanRumah] = useState([]);
  const [districtsKantor, setKotaKantor] = useState([]);
  const [subdistrictsKantor, setKecamatanKantor] = useState([]);
  const [villagesKantor, setKelurahanKantor] = useState([]);
  const [cabangDaftar, setCabangDaftar] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const fieldRefs = {
    nama: useRef(null),
    tempat_lahir: useRef(null),
    tanggal_lahir: useRef(null),
    jenis_identitas: useRef(null),
    no_identitas: useRef(null),
    kodepos: useRef(null),
    warganegara: useRef(null),
    jenis_kelamin: useRef(null),
    agama: useRef(null),
    ibu_kandung: useRef(null),
    alamat: useRef(null),
    rtrw: useRef(null),
    kelurahan: useRef(null),
    kecamatan: useRef(null),
    kota: useRef(null),
    provinsi: useRef(null),
    foto_ktp: useRef(null),
    foto_kk: useRef(null),
    no_referensi: useRef(null),
    alamat_rumah: useRef(null),
    rtrw_rumah: useRef(null),
    kelurahan_rumah: useRef(null),
    kecamatan_rumah: useRef(null),
    kota_rumah: useRef(null),
    provinsi_rumah: useRef(null),
    kodepos_rumah: useRef(null),
    pendidikan: useRef(null),
    perkawinan: useRef(null),
    email: useRef(null),
    no_hp: useRef(null),
    pekerjaan: useRef(null),
    perusahaan: useRef(null),
    pemilikan: useRef(null),
    bidang_pekerjaan: useRef(null),
    alamat_kantor: useRef(null),
    rtrw_kantor: useRef(null),
    kelurahan_kantor: useRef(null),
    kecamatan_kantor: useRef(null),
    kota_kantor: useRef(null),
    provinsi_kantor: useRef(null),
    kodepos_kantor: useRef(null),
    penghasilan_tetap: useRef(null),
    penghasilan_tidak_tetap: useRef(null),
    penghasilan_tambahan: useRef(null),
    usia_pensiun: useRef(null),
    iuran: useRef(null),
    pembayaran_iuran: useRef(null),
    paket_investasi: useRef(null),
    peserta_pengalihan: useRef(null),
    peserta_dapen: useRef(null),
    dana_rekening: useRef(null),
    dana_iuran: useRef(null),
    nama_ahli_waris_1: useRef(null),
    tanggal_lahir_ahli_waris_1: useRef(null),
    jenis_kelamin_ahli_waris_1: useRef(null),
    hubungan_ahli_waris_1: useRef(null),
    kode_cab_daftar: useRef(null)
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/agama`)
      .then(response => {
        setAgama(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/pendidikan`)
      .then(response => {
        setPendidikan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/pekerjaan`)
      .then(response => {
        setPekerjaan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/kepemilikan`)
      .then(response => {
        setPemilikan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/usaha`)
      .then(response => {
        setUsaha(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/penghasilan`)
      .then(response => {
        setPenghasilan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/penghasilan`)
      .then(response => {
        setPenghasilanTidakTetap(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/sampingan`)
      .then(response => {
        setPenghasilanTambahan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/investasi`)
      .then(response => {
        setPaketInvestasi(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/dana`)
      .then(response => {
        setDanaRekening(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/master/dana`)
      .then(response => {
        setDanaIuran(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/office`)
      .then(response => {
        setCabangDaftar(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const handleOfficeChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      kode_cab_daftar: selectedOption.value,
    }));
  };

  const options = cabangDaftar.map(office => ({
    value: office.kode_cabang,
    label: `${office.nama} - ${office.alamat}`
  }))

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '14px',
      border: '2px solid light-dark(rgb(118, 118, 118), rgb(133, 133, 133))',
      borderRadius: '4px',
      marginBottom: '12px'
    }), 
    option: (provided, state) => ({ 
      ...provided, 
      fontSize: '14px',
      backgroundColor: state.isSelected ? '#e5e5e5' : '#fff',
      color: state.isSelected ? '#212121' : '#000',
      padding: '10px'
    }),
    placeholder: (provided) => ({ 
      ...provided, 
      fontSize: '14px'
    }) 
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/province`)
      .then(response => {
        setProvinces(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  }, []);

  const handleProvinsiChange = (event) => {
    const selectedProvinsi = provinces.find(provinsi => provinsi.name === event.target.value);
    if (!selectedProvinsi) {
      console.error('Provinsi not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      provinsi: selectedProvinsi.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/district?provinsi_id=${selectedProvinsi.id}`)
      .then(response => {
        setKota(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKotaChange = (event) => {
    const selectedKota = districts.find(kota => kota.name === event.target.value);
    if (!selectedKota) {
      console.error('Kota not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kota: selectedKota.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/subdistrict?kabupaten_id=${selectedKota.id}`)
      .then(response => {
        setKecamatan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKecamatanChange = (event) => {
    const selectedKecamatan = subdistricts.find(kecamatan => kecamatan.name === event.target.value);
    if (!selectedKecamatan) {
      console.error('Kecamatan not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kecamatan: selectedKecamatan.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/village?kecamatan_id=${selectedKecamatan.id}`)
      .then(response => {
        setKelurahan(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKelurahanChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      kelurahan: event.target.value,
    }));
  };

  const handleProvinsiRumahChange = (event) => {
    const selectedProvinsiRumah = provinces.find(provinsi => provinsi.name === event.target.value);
    if (!selectedProvinsiRumah) {
      console.error('Provinsi not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      provinsi_rumah: selectedProvinsiRumah.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/district?provinsi_id=${selectedProvinsiRumah.id}`)
      .then(response => {
        setKotaRumah(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKotaRumahChange = (event) => {
    const selectedKotaRumah = districtsRumah.find(kota => kota.name === event.target.value);
    if (!selectedKotaRumah) {
      console.error('Kota not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kota_rumah: selectedKotaRumah.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/subdistrict?kabupaten_id=${selectedKotaRumah.id}`)
      .then(response => {
        setKecamatanRumah(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKecamatanRumahChange = (event) => {
    const selectedKecamatanRumah = subdistrictsRumah.find(kecamatan => kecamatan.name === event.target.value);
    if (!selectedKecamatanRumah) {
      console.error('Kecamatan not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kecamatan_rumah: selectedKecamatanRumah.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/village?kecamatan_id=${selectedKecamatanRumah.id}`)
      .then(response => {
        setKelurahanRumah(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKelurahanRumahChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      kelurahan_rumah: event.target.value,
    }));
  };

  const handleProvinsiKantorChange = (event) => {
    const selectedProvinsiKantor = provinces.find(provinsi => provinsi.name === event.target.value);
    if (!selectedProvinsiKantor) {
      console.error('Provinsi not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      provinsi_kantor: selectedProvinsiKantor.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/district?provinsi_id=${selectedProvinsiKantor.id}`)
      .then(response => {
        setKotaKantor(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKotaKantorChange = (event) => {
    const selectedKotaKantor = districtsKantor.find(kota => kota.name === event.target.value);
    if (!selectedKotaKantor) {
      console.error('Kota not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kota_kantor: selectedKotaKantor.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/subdistrict?kabupaten_id=${selectedKotaKantor.id}`)
      .then(response => {
        setKecamatanKantor(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKecamatanKantorChange = (event) => {
    const selectedKecamatanKantor = subdistrictsKantor.find(kecamatan => kecamatan.name === event.target.value);
    if (!selectedKecamatanKantor) {
      console.error('Kecamatan not found:', event.target.value);
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      kecamatan_kantor: selectedKecamatanKantor.name,
    }));
  
    axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/wilayah/village?kecamatan_id=${selectedKecamatanKantor.id}`)
      .then(response => {
        setKelurahanKantor(response.data.content);
      })
      .catch((error) => console.error(error.response.data.message));
  };

  const handleKelurahanKantorChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      kelurahan_kantor: event.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        samaDenganKTP: checked,
        alamat_rumah: checked ? prevData.alamat : '',
        rtrw_rumah: checked ? prevData.rtrw : '',
        kodepos_rumah: checked ? prevData.kodepos : '',
        provinsi_rumah: checked ? prevData.provinsi : '',
        kota_rumah: checked ? prevData.kota : '',
        kecamatan_rumah: checked ? prevData.kecamatan : '',
        kelurahan_rumah: checked ? prevData.kelurahan : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        ...(prevData.samaDenganKTP && {
          alamat_rumah: name === 'alamat' ? value : prevData.alamat_rumah,
          rtrw_rumah: name === 'rtrw' ? value : prevData.rtrw_rumah,
          kodepos_rumah: name === 'kodepos' ? value : prevData.kodepos_rumah,
          provinsi_rumah: name === 'provinsi' ? value : prevData.provinsi_rumah,
          kota_rumah: name === 'kota' ? value : prevData.kota_rumah,
          kecamatan_rumah: name === 'kecamatan' ? value : prevData.kecamatan_rumah,
          kelurahan_rumah: name === 'kelurahan' ? value : prevData.kelurahan_rumah,
        }),
      }));
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Assuming single file upload
    }));
  };

  const calculatePensionDates = (tanggalLahir, usiaPensiun) => {
    const birthDate = new Date(tanggalLahir);
    const pensionDate = new Date(birthDate);
    pensionDate.setFullYear(pensionDate.getFullYear() + parseInt(usiaPensiun));
    pensionDate.setDate(pensionDate.getDate());
    
    const earlyPensionDate = new Date(pensionDate);
    earlyPensionDate.setFullYear(earlyPensionDate.getFullYear() - 5);
    earlyPensionDate.setDate(earlyPensionDate.getDate());
  
    return {
      tgl_pensiun: pensionDate.toISOString().split('T')[0],
      tgl_pensiun_dipercepat: earlyPensionDate.toISOString().split('T')[0]
    };
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsCheckboxChecked(checked);
    setShowButton(checked);
  };

  const validateForm = () => { 
    const newErrors = {};
    if (!formData.nama) {
      newErrors.nama = 'Nama harus diisi.';
    }
    if (!formData.nama_ahli_waris_1) {
      newErrors.nama_ahli_waris_1 = 'Nama ahli waris harus diisi.';
    }
    if (!formData.agama) {
      newErrors.agama = 'Agama harus diisi.';
    }
    if (!formData.pendidikan) {
      newErrors.pendidikan = 'Pendidikan terakhir harus diisi.';
    }
    if (!formData.perkawinan) {
      newErrors.perkawinan = 'Status perkawinan harus diisi.';
    }
    if (!formData.usia_pensiun) {
      newErrors.usia_pensiun = 'Usia pensiun harus diisi.';
    }
    if (!formData.paket_investasi) {
      newErrors.paket_investasi = 'Paket investasi harus diisi.';
    }
    if (!formData.tanggal_lahir || formData.tanggal_lahir === '0000-00-00') {
      newErrors.tanggal_lahir = 'Tanggal lahir harus diisi.';
    }
    if (!formData.tanggal_lahir_ahli_waris_1 || formData.tanggal_lahir_ahli_waris_1 === '0000-00-00') {
      newErrors.tanggal_lahir_ahli_waris_1 = 'Tanggal lahir ahli waris harus diisi.';
    }
    if (!formData.jenis_identitas) {
      newErrors.jenis_identitas = 'Jenis identitas harus diisi.';
    }
    if (!formData.warganegara) {
      newErrors.warganegara = 'Kewarganegaraan harus diisi.';
    }
    if (!formData.tempat_lahir) {
      newErrors.tempat_lahir = 'Tempat lahir harus diisi.';
    }
    if (!formData.no_identitas) {
      newErrors.no_identitas = 'Nomor Kartu Identitas harus diisi.';
    }
    if (!formData.jenis_kelamin) {
      newErrors.jenis_kelamin = 'Jenis kelamin harus diisi.';
    }
    if (!formData.jenis_kelamin_ahli_waris_1) {
      newErrors.jenis_kelamin_ahli_waris_1 = 'Jenis kelamin harus diisi.';
    }
    if (!formData.hubungan_ahli_waris_1) {
      newErrors.hubungan_ahli_waris_1 = 'Hubungan ahli waris harus diisi.';
    }
    if (!formData.ibu_kandung) {
      newErrors.ibu_kandung = 'Nama ibu kandung harus diisi.';
    }
    if (!formData.no_hp) {
      newErrors.no_hp = 'Nomor Telepon Genggam harus diisi.';
    }
    if (!formData.alamat) {
      newErrors.alamat = 'Alamat harus diisi.';
    }
    if (!formData.alamat_rumah) {
      newErrors.alamat_rumah = 'Alamat rumah harus diisi.';
    }
    if (!formData.alamat_kantor) {
      newErrors.alamat_kantor = 'Alamat kantor harus diisi.';
    }
    if (!formData.rtrw) {
      newErrors.rtrw = 'RT/RW harus diisi.';
    }
    if (!formData.rtrw_rumah) {
      newErrors.rtrw_rumah = 'RT/RW rumah harus diisi.';
    }
    if (!formData.rtrw_kantor) {
      newErrors.rtrw_kantor = 'RT/RW kantor harus diisi.';
    }
    if (!formData.kelurahan) {
      newErrors.kelurahan = 'Desa/Kelurahan harus diisi.';
    }
    if (!formData.kelurahan_rumah) {
      newErrors.kelurahan_rumah = 'Desa/Kelurahan rumah harus diisi.';
    }
    if (!formData.kelurahan_kantor) {
      newErrors.kelurahan_kantor = 'Desa/Kelurahan kantor harus diisi.';
    }
    if (!formData.kecamatan) {
      newErrors.kecamatan = 'Kecamatan harus diisi.';
    }
    if (!formData.kecamatan_rumah) {
      newErrors.kecamatan_rumah = 'Kecamatan rumah harus diisi.';
    }
    if (!formData.kecamatan_kantor) {
      newErrors.kecamatan_kantor = 'Kecamatan kantor harus diisi.';
    }
    if (!formData.kota) {
      newErrors.kota = 'Kota/Kabupaten harus diisi.';
    }
    if (!formData.kota_rumah) {
      newErrors.kota_rumah = 'Kota/Kabupaten rumah harus diisi.';
    }
    if (!formData.kota_kantor) {
      newErrors.kota_kantor = 'Kota/Kabupaten kantor harus diisi.';
    }
    if (!formData.provinsi) {
      newErrors.provinsi = 'Provinsi harus diisi.';
    }
    if (!formData.provinsi_rumah) {
      newErrors.provinsi_rumah = 'Provinsi rumah harus diisi.';
    }
    if (!formData.provinsi_kantor) {
      newErrors.provinsi_kantor = 'Provinsi kantor harus diisi.';
    }
    if (!formData.kodepos) {
      newErrors.kodepos = 'Kode Pos harus diisi.';
    }
    if (!formData.kodepos_kantor) {
      newErrors.kodepos_kantor = 'Kode Pos kantor harus diisi.';
    }
    if (!formData.kodepos_rumah) {
      newErrors.kodepos_rumah = 'Kode Pos rumah harus diisi.';
    }
    if (!formData.email) {
      newErrors.email = 'Email harus diisi.';
    }
    if (!formData.pekerjaan) {
      newErrors.pekerjaan = 'Pekerjaan harus diisi.';
    }
    if (!formData.pemilikan) {
      newErrors.pemilikan = 'Pemilikan harus diisi.';
    }
    if (!formData.perusahaan) {
      newErrors.perusahaan = 'Nama perusahaan harus diisi.';
    }
    if (!formData.bidang_pekerjaan) {
      newErrors.bidang_pekerjaan = 'Bidang pekerjaan harus diisi.';
    }
    if (!formData.penghasilan_tetap) {
      newErrors.penghasilan_tetap = 'Penghasilan tetap harus diisi.';
    }
    if (!formData.penghasilan_tidak_tetap) {
      newErrors.penghasilan_tidak_tetap = 'Penghasilan tidak tetap harus diisi.';
    }
    if (!formData.penghasilan_tambahan) {
      newErrors.penghasilan_tambahan = 'Penghasilan tambahan tetap harus diisi.';
    }
    if (!formData.kode_cab_daftar) {
      newErrors.kode_cab_daftar = 'Kode cabang daftar harus diisi.';
    }
    if (!formData.peserta_pengalihan) {
      newErrors.peserta_pengalihan = 'Peserta pengalihan harus diisi.';
    }
    if (!formData.peserta_dapen) {
      newErrors.peserta_dapen = 'Peserta Dapen lain harus diisi.';
    }
    if (!formData.iuran) {
      newErrors.iuran = 'Jumlah iuran harus diisi.';
    }
    if (!formData.pembayaran_iuran) {
      newErrors.pembayaran_iuran = 'Sistem pembayaran iuran harus diisi.';
    }
    if (!formData.dana_iuran) {
      newErrors.dana_iuran = 'Sumber dana iuran harus diisi.';
    }
    if (!formData.dana_rekening) {
      newErrors.dana_rekening = 'Sumber dana rekening harus diisi.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      if (fieldRefs[firstErrorField] && fieldRefs[firstErrorField].current) {
        fieldRefs[firstErrorField].current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        fieldRefs[firstErrorField].current.focus();
      }
    }
    
    setLoading(true);

    try {
        // Prepare FormData for the first POST request
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        // First POST request
        await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/registrasi`,
          data,
          {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Calculate pension dates
        const { tanggal_lahir, usia_pensiun } = formData;
        const { tgl_pensiun, tgl_pensiun_dipercepat } = calculatePensionDates(tanggal_lahir, usia_pensiun);

        // Prepare JSON data for the second POST request
        let ppipData = { ...formData, tgl_pensiun, tgl_pensiun_dipercepat };

        // Convert boolean values to 'T' or 'F'
        Object.keys(ppipData).forEach(key => {
            if (typeof ppipData[key] === 'boolean') {
                ppipData[key] = ppipData[key] ? 'T' : 'F';
            }
        });

        // Convert all string values to uppercase
        ppipData = Object.fromEntries(
            Object.entries(ppipData).map(([key, value]) => 
                [key, typeof value === 'string' ? value.toUpperCase() : value]
            )
        );

        // Add kode_provinsi from provinsi API response
        const selectedProvinsi = provinces.find(provinsi => provinsi.name === formData.provinsi);
        if (selectedProvinsi) {
          ppipData.kode_provinsi = selectedProvinsi.value;
        }

        // Define the maximum lengths for each field based on the database schema
        const maxLengths = {
            nama: 100,
            tempat_lahir: 30,
            alamat: 200,
            rtrw: 7,
            kelurahan: 50,
            kecamatan: 50,
            kota: 50,
            kodepos: 30,
            no_hp: 30,
            pekerjaan: 50,
            perusahaan: 100,
            alamat_kantor: 200,
            kodepos_kantor: 30,
            kelurahan_kantor: 50,
            kecamatan_kantor: 50,
            kota_kantor: 50,
            provinsi_kantor: 50,
            alamat_rumah: 200,
            kelurahan_rumah: 50,
            kecamatan_rumah: 50,
            rtrw_rumah: 7,
            kota_rumah: 50,
            provinsi_rumah: 50,
            kodepos_rumah: 30,
            npwp: 50,
            dana_rekening: 40,
            no_referensi: 50,
            pemilikan: 2,
            bidang_pekerjaan: 5,
            paket_investasi: 2,
            usia_pensiun: 4,
            jenis_kelamin: 1,
            no_telp: 30,
            email: 50,
            no_identitas: 30,
            provinsi: 50,
            peserta_pengalihan: 1,
            agama: 1,
            pendidikan: 1,
            penghasilan_tetap: 1,
            penghasilan_tidak_tetap: 1,
            pembayaran_iuran: 1,
            perkawinan: 1,
            warganegara: 1,
            ibu_kandung: 100,
            iuran: 8,
            kode_provinsi: 2,
            kode_cab_daftar: 3
        };

        // Trim data to fit within the maximum lengths
        Object.keys(ppipData).forEach(key => {
            if (typeof ppipData[key] === 'string' && ppipData[key].length > maxLengths[key]) {
                ppipData[key] = ppipData[key].substring(0, maxLengths[key]);
            }
        });

        // Second POST request
        await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/ppip/registrasi`, 
          ppipData,
          {
            headers: {
                'Content-Type': 'application/json',
            },
          }
        );

        setSuccess('Registrasi Peserta Baru berhasil dilakukan! Tunggu balasan kami melalui email Anda untuk proses selanjutnya.');
        setShowModal(true);
        setError('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
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
              <FormH1>Identitas Peserta</FormH1>
              <FormH1Error>(*) Data wajib diisi</FormH1Error>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="nama"><strong>Nama</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="nama" type="text" name="nama" ref={fieldRefs.nama} value={formData.nama} onChange={handleChange} />
                  {errors.nama && <FormH2Error>{errors.nama}</FormH2Error>}
                  <FormH2><i>Nama sesuai yang tertera di kartu identitas.</i></FormH2>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_identitas"><strong>Jenis Identitas</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormSelect id="jenis_identitas" name="jenis_identitas" ref={fieldRefs.jenis_identitas} value={formData.jenis_identitas} onChange={handleChange}>
                        <FormOption value="">Jenis Identitas</FormOption>
                        <FormOption value="ktp">KTP</FormOption>
                        <FormOption value="sim">SIM</FormOption>
                        <FormOption value="paspor">Paspor</FormOption>
                        <FormOption value="kitas">KIM/KITAS</FormOption>
                      </FormSelect>
                      {errors.jenis_identitas && <FormH2Error>{errors.jenis_identitas}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_identitas"><strong>Nomor Identitas</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="no_identitas" type="text" name="no_identitas" ref={fieldRefs.no_identitas} value={formData.no_identitas} onChange={handleChange} />
                      {errors.no_identitas && <FormH2Error>{errors.no_identitas}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="alamat"><strong>Alamat</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormText id="alamat" name="alamat" value={formData.alamat} ref={fieldRefs.alamat} onChange={handleChange} />
                  <FormH2><i>Alamat sesuai yang tertera di kartu identitas.</i></FormH2>
                  {errors.alamat && <FormH2Error>{errors.alamat}</FormH2Error>}
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw"><strong>RT/RW</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="rtrw" type="text" name="rtrw" value={formData.rtrw} ref={fieldRefs.rtrw} onChange={handleChange} />
                      {errors.rtrw && <FormH2Error>{errors.rtrw}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos"><strong>Kode Pos</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="kodepos" type="text" name="kodepos" value={formData.kodepos} ref={fieldRefs.kodepos} onChange={handleChange} />
                      {errors.kodepos && <FormH2Error>{errors.kodepos}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="provinsi"><strong>Provinsi</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="provinsi" name="provinsi" onChange={handleProvinsiChange} value={formData.provinsi} ref={fieldRefs.provinsi}>
                    {provinces.map(province => (
                      <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.provinsi && <FormH2Error>{errors.provinsi}</FormH2Error>}
                  <FormLabel htmlFor="kota"><strong>Kabupaten/Kota</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kota" name="kota" onChange={handleKotaChange} value={formData.kota} ref={fieldRefs.kota}>
                    <FormOption value=''>Kabupaten/Kota</FormOption>
                    {districts.map(city => (
                      <FormOption key={city.id} value={city.name}>{city.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kota && <FormH2Error>{errors.kota}</FormH2Error>}
                  <FormLabel htmlFor="kecamatan"><strong>Kecamatan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kecamatan" name="kecamatan" onChange={handleKecamatanChange} value={formData.kecamatan} ref={fieldRefs.kecamatan}>
                    <FormOption value=''>Kecamatan</FormOption>
                    {subdistricts.map(kecamatan => (
                      <FormOption key={kecamatan.id} value={kecamatan.name}>{kecamatan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kecamatan && <FormH2Error>{errors.kecamatan}</FormH2Error>}
                  <FormLabel htmlFor="kelurahan"><strong>Desa/Kelurahan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kelurahan" name="kelurahan" onChange={handleKelurahanChange} value={formData.kelurahan} ref={fieldRefs.kelurahan}>
                    <FormOption value=''>Desa/Kelurahan</FormOption>
                    {villages.map(kelurahan => (
                      <FormOption key={kelurahan.id} value={kelurahan.name}>{kelurahan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kelurahan && <FormH2Error>{errors.kelurahan}</FormH2Error>}
                </FormDiv>
                <FormDiv>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="tempat_lahir"><strong>Tempat Lahir</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="tempat_lahir" type="text" name="tempat_lahir" value={formData.tempat_lahir} ref={fieldRefs.tempat_lahir} onChange={handleChange} />
                      {errors.tempat_lahir && <FormH2Error>{errors.tempat_lahir}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir"><strong>Tanggal Lahir</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="tanggal_lahir" type="date" name="tanggal_lahir" value={formData.tanggal_lahir} ref={fieldRefs.tanggal_lahir} onChange={handleChange} />
                      {errors.tanggal_lahir && <FormH2Error>{errors.tanggal_lahir}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="warganegara"><strong>Kewarganegaraan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="warganegara" name="warganegara" value={formData.warganegara} ref={fieldRefs.warganegara} onChange={handleChange}>
                    <FormOption value="">Kewarganegaraan</FormOption>
                    <FormOption value="1">Warga Negara Indonesia</FormOption>
                    <FormOption value="2">Warga Negara Asing</FormOption>
                  </FormSelect>
                  {errors.warganegara && <FormH2Error>{errors.warganegara}</FormH2Error>}
                  <FormLabel htmlFor="jenis_kelamin"><strong>Jenis Kelamin</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} ref={fieldRefs.jenis_kelamin} onChange={handleChange}>
                    <FormOption value="">Jenis Kelamin</FormOption>
                    <FormOption value="P">Pria</FormOption>
                    <FormOption value="W">Wanita</FormOption>
                  </FormSelect>
                  {errors.jenis_kelamin && <FormH2Error>{errors.jenis_kelamin}</FormH2Error>}
                  <FormLabel htmlFor="agama"><strong>Agama</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="agama" name="agama" value={formData.agama} ref={fieldRefs.agama} onChange={handleChange}>
                    {agamaData && agamaData.map((agama) => (
                      <FormOption key={agama.id} value={agama.code}>{agama.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.agama && <FormH2Error>{errors.agama}</FormH2Error>}
                  <FormLabel htmlFor="ibu_kandung"><strong>Nama Gadis Ibu Kandung</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="ibu_kandung" type="text" name="ibu_kandung" value={formData.ibu_kandung} ref={fieldRefs.ibu_kandung} onChange={handleChange} />
                  {errors.ibu_kandung && <FormH2Error>{errors.ibu_kandung}</FormH2Error>}
                  <FormH2><i>Nama sesuai yang tertera di kartu keluarga.</i></FormH2>
                  <FormLabel htmlFor="no_referensi">Nomor Referensi</FormLabel>
                  <FormInput id="no_referensi" type="text" name="no_referensi" value={formData.no_referensi} ref={fieldRefs.no_referensi} onChange={handleChange} />
                  <FormH2><i>Kosongkan jika tidak ada.</i></FormH2>
                  <FormLabel htmlFor="foto_ktp"><strong>Upload Foto Kartu Identitas</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="foto_ktp" type="file" name="foto_ktp" onChange={handleFileChange} />
                  <FormH2><i>Unggah dalam format JPG, JPEG, PNG atau PDF.</i></FormH2>
                  <FormLabel htmlFor="foto_kk"><strong>Upload Foto Kartu Keluarga</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="foto_kk" type="file" name="foto_kk" onChange={handleFileChange} />
                  <FormH2><i>Unggah dalam format JPG, JPEG, PNG atau PDF.</i></FormH2>
                </FormDiv>
              </FormCardWrapper>

              <FormH1>Data Peserta</FormH1>
              <FormH1Error>(*) Data wajib diisi</FormH1Error>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="alamat_rumah"><strong>Alamat Rumah</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormAgreeLeft>
                    <FormInput type='checkbox' id='samaDenganKTP' name='samaDenganKTP' checked={formData.samaDenganKTP} onChange={handleChange}/>
                    <FormLabel htmlFor='samaDenganKTP'><i>Alamat domisili tempat tinggal sama dengan alamat yang tertera di kartu identitas.</i></FormLabel>
                  </FormAgreeLeft>
                  <FormText id="alamat_rumah" name="alamat_rumah" value={formData.alamat_rumah} ref={fieldRefs.alamat_rumah} onChange={handleChange} disabled={formData.samaDenganKTP}/>
                  {errors.alamat_rumah && <FormH2Error>{errors.alamat_rumah}</FormH2Error>}
                  <FormH2><i>Alamat sesuai dengan domisili tempat tinggal saat ini.</i></FormH2>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw_rumah"><strong>RT/RW</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="rtrw_rumah" type="text" name="rtrw_rumah" value={formData.rtrw_rumah} ref={fieldRefs.rtrw_rumah} onChange={handleChange} disabled={formData.samaDenganKTP}/>
                      {errors.rtrw_rumah && <FormH2Error>{errors.rtrw_rumah}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos_rumah"><strong>Kode Pos</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="kodepos_rumah" type="text" name="kodepos_rumah" value={formData.kodepos_rumah} ref={fieldRefs.kodepos_rumah} onChange={handleChange} disabled={formData.samaDenganKTP}/>
                      {errors.kodepos_rumah && <FormH2Error>{errors.kodepos_rumah}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="provinsi_rumah"><strong>Provinsi</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  {formData.samaDenganKTP ? (
                  <FormInput id="provinsi_rumah" name="provinsi_rumah" onChange={handleChange} value={formData.provinsi_rumah} disabled={formData.samaDenganKTP} />
                  ) : (
                  <FormSelect id="provinsi_rumah" name="provinsi_rumah" onChange={handleProvinsiRumahChange} ref={fieldRefs.provinsi_rumah} value={formData.provinsi_rumah}>
                    {provinces.map(province => (
                      <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
                    ))}
                  </FormSelect>
                  )}
                  {errors.provinsi_rumah && <FormH2Error>{errors.provinsi_rumah}</FormH2Error>}
                  <FormLabel htmlFor="kota_rumah"><strong>Kabupaten/Kota</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  {formData.samaDenganKTP ? (
                  <FormInput id="kota_rumah" name="kota_rumah" onChange={handleChange} value={formData.kota_rumah} disabled={formData.samaDenganKTP} />
                  ) : (
                  <FormSelect id="kota_rumah" name="kota_rumah" onChange={handleKotaRumahChange} value={formData.kota_rumah} ref={fieldRefs.kota_rumah}>
                    <FormOption value="">Kabupaten/Kota</FormOption>
                    {districtsRumah.map(city => (
                      <FormOption key={city.id} value={city.name}>{city.name}</FormOption>
                    ))}
                  </FormSelect>
                  )}
                  {errors.kota_rumah && <FormH2Error>{errors.kota_rumah}</FormH2Error>}
                  <FormLabel htmlFor="kecamatan_rumah"><strong>Kecamatan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  {formData.samaDenganKTP ? (
                  <FormInput id="kecamatan_rumah" name="kecamatan_rumah" onChange={handleChange} value={formData.kecamatan_rumah} disabled={formData.samaDenganKTP} />
                  ) : (
                  <FormSelect id="kecamatan_rumah" name="kecamatan_rumah" onChange={handleKecamatanRumahChange} value={formData.kecamatan_rumah} ref={fieldRefs.kecamatan_rumah}>
                    <FormOption value="">Kecamatan</FormOption>
                    {subdistrictsRumah.map(kecamatan => (
                      <FormOption key={kecamatan.id} value={kecamatan.name}>{kecamatan.name}</FormOption>
                    ))}
                  </FormSelect>
                  )}
                  {errors.kecamatan_rumah && <FormH2Error>{errors.kecamatan_rumah}</FormH2Error>}
                  <FormLabel htmlFor="kelurahan_rumah"><strong>Desa/Kelurahan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  {formData.samaDenganKTP ? (
                  <FormInput id="kelurahan_rumah" name="kelurahan_rumah" onChange={handleChange} value={formData.kelurahan_rumah} disabled={formData.samaDenganKTP} />
                  ) : (
                  <FormSelect id="kelurahan_rumah" name="kelurahan_rumah" onChange={handleKelurahanRumahChange} value={formData.kelurahan_rumah} ref={fieldRefs.kelurahan_rumah}>
                    <FormOption value="">Desa/Kelurahan</FormOption>
                    {villagesRumah.map(kelurahan => (
                      <FormOption key={kelurahan.id} value={kelurahan.name}>{kelurahan.name}</FormOption>
                    ))}
                  </FormSelect>
                  )}
                  {errors.kelurahan_rumah && <FormH2Error>{errors.kelurahan_rumah}</FormH2Error>}
                </FormDiv>
                <FormDiv>
                  <FormLabel htmlFor="pendidikan"><strong>Pendidikan Terakhir</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="pendidikan" name="pendidikan" value={formData.pendidikan} onChange={handleChange} ref={fieldRefs.pendidikan}>
                    {pendidikanData && pendidikanData.map((pendidikan) => (
                      <FormOption key={pendidikan.id} value={pendidikan.code}>{pendidikan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.pendidikan && <FormH2Error>{errors.pendidikan}</FormH2Error>}
                  <FormLabel htmlFor="perkawinan"><strong>Status Perkawinan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="perkawinan" name="perkawinan" value={formData.perkawinan} onChange={handleChange} ref={fieldRefs.perkawinan}>
                    <FormOption value="">Status Perkawinan</FormOption>
                    <FormOption value="1">Belum Menikah</FormOption>
                    <FormOption value="2">Menikah</FormOption>
                    <FormOption value="3">Janda/Duda</FormOption>
                  </FormSelect>
                  {errors.perkawinan && <FormH2Error>{errors.perkawinan}</FormH2Error>}
                  <FormLabel htmlFor="email"><strong>Email</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="email" type="text" name="email" value={formData.email} onChange={handleChange} ref={fieldRefs.email}/>
                  {errors.email && <FormH2Error>{errors.email}</FormH2Error>}
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_hp"><strong>Nomor Telepon Genggam</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="no_hp" type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} ref={fieldRefs.no_hp}/>
                      {errors.no_hp && <FormH2Error>{errors.no_hp}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="no_telp">Nomor Telepon Rumah</FormLabel>
                      <FormInput id="no_telp" type="text" name="no_telp" value={formData.no_telp} onChange={handleChange} />
                    </FormInputDiv>
                  </FormInputWrapper>
                  <FormLabel htmlFor="npwp">NPWP</FormLabel>
                  <FormInput id="npwp" type="text" name="npwp" value={formData.npwp} onChange={handleChange} />
                  <FormLabel htmlFor="foto_npwp">Upload Foto NPWP</FormLabel>
                  <FormInput id="foto_npwp" type="file" name="foto_npwp" onChange={handleFileChange} />
                  <FormH2><i>Unggah dalam format JPG, JPEG, PNG atau PDF.</i></FormH2>
                </FormDiv>
              </FormCardWrapper>

              <FormH1>Data Pekerjaan</FormH1>
              <FormH1Error>(*) Data wajib diisi</FormH1Error>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="pekerjaan"><strong>Pekerjaan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} ref={fieldRefs.pekerjaan}>
                    {pekerjaanData && pekerjaanData.map((pekerjaan) => (
                      <FormOption key={pekerjaan.id} value={pekerjaan.code}>{pekerjaan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.pekerjaan && <FormH2Error>{errors.pekerjaan}</FormH2Error>}
                  <FormLabel htmlFor="perusahaan"><strong>Nama Perusahaan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="perusahaan" type="text" name="perusahaan" value={formData.perusahaan} onChange={handleChange} ref={fieldRefs.perusahaan}/>
                  {errors.perusahaan && <FormH2Error>{errors.perusahaan}</FormH2Error>}
                  <FormLabel htmlFor="pemilikan"><strong>Kepemilikan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="pemilikan" name="pemilikan" value={formData.pemilikan} onChange={handleChange} ref={fieldRefs.pemilikan}>
                    {pemilikanData && pemilikanData.map((pemilikan) => (
                      <FormOption key={pemilikan.id} value={pemilikan.code}>{pemilikan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.pemilikan && <FormH2Error>{errors.pemilikan}</FormH2Error>}
                  <FormLabel htmlFor="bidang_pekerjaan"><strong>Bidang Pekerjaan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="bidang_pekerjaan" name="bidang_pekerjaan" value={formData.bidang_pekerjaan} onChange={handleChange} ref={fieldRefs.bidang_pekerjaan}>
                    {usahaData && usahaData.map((usaha) => (
                      <FormOption key={usaha.id} value={usaha.code}>{usaha.nama}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.bidang_pekerjaan && <FormH2Error>{errors.bidang_pekerjaan}</FormH2Error>}
                  <FormLabel htmlFor="alamat_kantor"><strong>Alamat Perusahaan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormText id="alamat_kantor" name="alamat_kantor" value={formData.alamat_kantor} ref={fieldRefs.alamat_kantor} onChange={handleChange} />
                  {errors.alamat_kantor && <FormH2Error>{errors.alamat_kantor}</FormH2Error>}
                  <FormH2><i>Alamat sesuai dengan domisili kantor saat ini.</i></FormH2>
                  <FormInputWrapper>
                    <FormInputDiv>
                      <FormLabel htmlFor="rtrw_kantor"><strong>RT/RW</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="rtrw_kantor" type="text" name="rtrw_kantor" value={formData.rtrw_kantor} ref={fieldRefs.rtrw_kantor} onChange={handleChange} />
                      {errors.rtrw_kantor && <FormH2Error>{errors.rtrw_kantor}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="kodepos_kantor"><strong>Kode Pos</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="kodepos_kantor" type="text" name="kodepos_kantor" value={formData.kodepos_kantor} ref={fieldRefs.kodepos_kantor} onChange={handleChange} />
                      {errors.kodepos_kantor && <FormH2Error>{errors.kodepos_kantor}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper>
                </FormDiv>
                <FormDiv>
                <FormLabel htmlFor="provinsi_kantor"><strong>Provinsi</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="provinsi_kantor" name="provinsi_kantor" onChange={handleProvinsiKantorChange} value={formData.provinsi_kantor} ref={fieldRefs.provinsi_kantor}>
                    {provinces.map(province => (
                      <FormOption key={province.id} value={province.name}>{province.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.provinsi_kantor && <FormH2Error>{errors.provinsi_kantor}</FormH2Error>}
                  <FormLabel htmlFor="kota_kantor"><strong>Kabupaten/Kota</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kota_kantor" name="kota_kantor" onChange={handleKotaKantorChange} value={formData.kota_kantor} ref={fieldRefs.kota_kantor}>
                    <FormOption value="">Kabupaten/Kota</FormOption>
                    {districtsKantor.map(city => (
                      <FormOption key={city.id} value={`${city.name}`}>{`${city.name}`}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kota_kantor && <FormH2Error>{errors.kota_kantor}</FormH2Error>}
                  <FormLabel htmlFor="kecamatan_kantor"><strong>Kecamatan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kecamatan_kantor" name="kecamatan_kantor" onChange={handleKecamatanKantorChange} value={formData.kecamatan_kantor} ref={fieldRefs.kecamatan_kantor}>
                    <FormOption value="">Kecamatan</FormOption>
                    {subdistrictsKantor.map(kecamatan => (
                      <FormOption key={kecamatan.id} value={kecamatan.name}>{kecamatan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kecamatan_kantor && <FormH2Error>{errors.kecamatan_kantor}</FormH2Error>}
                  <FormLabel htmlFor="kelurahan_kantor"><strong>Desa/Kelurahan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="kelurahan_kantor" name="kelurahan_kantor" onChange={handleKelurahanKantorChange} value={formData.kelurahan_kantor} ref={fieldRefs.kelurahan_kantor}>
                    <FormOption value="">Desa/Kelurahan</FormOption>
                    {villagesKantor.map(kelurahan => (
                      <FormOption key={kelurahan.id} value={kelurahan.name}>{kelurahan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.kelurahan_kantor && <FormH2Error>{errors.kelurahan_kantor}</FormH2Error>}
                  <FormLabel htmlFor="penghasilan_tetap"><strong>Penghasilan Tetap (Bulan)</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="penghasilan_tetap" name="penghasilan_tetap" value={formData.penghasilan_tetap} onChange={handleChange} ref={fieldRefs.penghasilan_tetap}>
                    {penghasilanData && penghasilanData.map((penghasilan) => (
                      <FormOption key={penghasilan.id} value={penghasilan.code}>{penghasilan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.penghasilan_tetap && <FormH2Error>{errors.penghasilan_tetap}</FormH2Error>}
                  <FormLabel htmlFor="penghasilan_tidak_tetap"><strong>Penghasilan Tidak Tetap (Bulan)</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="penghasilan_tidak_tetap" name="penghasilan_tidak_tetap" value={formData.penghasilan_tidak_tetap} onChange={handleChange} ref={fieldRefs.penghasilan_tidak_tetap}>
                    {penghasilanTidakTetapData && penghasilanTidakTetapData.map((penghasilan) => (
                      <FormOption key={penghasilan.id} value={penghasilan.code}>{penghasilan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.penghasilan_tidak_tetap && <FormH2Error>{errors.penghasilan_tidak_tetap}</FormH2Error>}
                  <FormLabel htmlFor="penghasilan_tambahan"><strong>Penghasilan Tambahan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="penghasilan_tambahan" name="penghasilan_tambahan" value={formData.penghasilan_tambahan} onChange={handleChange} ref={fieldRefs.penghasilan_tambahan}>
                    {penghasilanTambahan && penghasilanTambahan.map((penghasilan) => (
                      <FormOption key={penghasilan.id} value={penghasilan.code}>{penghasilan.name}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.penghasilan_tambahan && <FormH2Error>{errors.penghasilan_tambahan}</FormH2Error>}
                </FormDiv>
              </FormCardWrapper>

              <FormH1>Data Kepesertaan</FormH1>
              <FormH1Error>(*) Data wajib diisi</FormH1Error>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="kode_cab_daftar"><strong>Cabang Pendaftaran</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <Select
                    id="kode_cab_daftar"
                    name="kode_cab_daftar"
                    ref={fieldRefs.kode_cab_daftar}
                    options={options}
                    onChange={handleOfficeChange}
                    placeholder="Pilih cabang terdekat..."
                    styles={customStyles}
                  />
                  {errors.kode_cab_daftar && <FormH2Error>{errors.kode_cab_daftar}</FormH2Error>}
                  <FormLabel htmlFor="usia_pensiun"><strong>Usia Pensiun</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormInput id="usia_pensiun" type="number" name="usia_pensiun" value={formData.usia_pensiun} onChange={handleChange} ref={fieldRefs.usia_pensiun}/>
                  {errors.usia_pensiun && <FormH2Error>{errors.usia_pensiun}</FormH2Error>}
                  <FormH2><i>Usia pensiun minimal 55 tahun.</i></FormH2>
                  <FormLabel htmlFor="iuran"><strong>Iuran</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormRupiahLeft>
                    <FormSpanLeft>Rp</FormSpanLeft>
                    <FormInputCustomLeft id="iuran" type="number" name="iuran" value={formData.iuran} onChange={handleChange} ref={fieldRefs.iuran}/>
                  </FormRupiahLeft>
                  {errors.iuran && <FormH2Error>{errors.iuran}</FormH2Error>}
                  <FormH2><i>Iuran pensiun per bulan.</i></FormH2>
                  <FormLabel htmlFor="pembayaran_iuran"><strong>Sistem Pembayaran Iuran</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="pembayaran_iuran" name="pembayaran_iuran" value={formData.pembayaran_iuran} onChange={handleChange} ref={fieldRefs.pembayaran_iuran}>
                    <FormOption value="">Pilih</FormOption>
                    <FormOption value="1">Tunai</FormOption>
                    <FormOption value="2">Transfer</FormOption>
                    <FormOption value="3">Autodebet rekening Bank Muamalat</FormOption>
                  </FormSelect>
                  {errors.pembayaran_iuran && <FormH2Error>{errors.pembayaran_iuran}</FormH2Error>}
                  <FormH2><i>Jika memilih autodebet, maka harus mengisi terlebih dahulu formulir pengajuan SI di CS.</i></FormH2>
                  
                  <FormLabel htmlFor="paket_investasi"><strong>Paket Investasi</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="paket_investasi" name="paket_investasi" value={formData.paket_investasi} onChange={handleChange} ref={fieldRefs.paket_investasi}>
                    {paketInvestasi.map((paket) => (
                      <FormOption key={paket.id} value={paket.value}>{paket.name}</FormOption>
                    ))}
                  </FormSelect>
                  {paketInvestasi.map((paket) => {
                    if (paket.value === formData.paket_investasi) {
                      return <FormH2 key={paket.id}><i>{paket.description}</i></FormH2>;
                    }
                    return null;
                  })}
                  {errors.paket_investasi && <FormH2Error>{errors.paket_investasi}</FormH2Error>}
                </FormDiv>
                <FormDiv>
                  <FormInputWrapperGrid>
                    <FormInputDiv>
                      <FormLabel htmlFor="peserta_pengalihan"><strong>Peserta Pengalihan</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormSelect id="peserta_pengalihan" name="peserta_pengalihan" value={formData.peserta_pengalihan} onChange={handleChange} ref={fieldRefs.peserta_pengalihan}>
                      <FormOption value="">Pilih</FormOption>
                      <FormOption value={true}>Ya</FormOption>
                      <FormOption value={false}>Tidak</FormOption>
                      </FormSelect>
                      {errors.peserta_pengalihan && <FormH2Error>{errors.peserta_pengalihan}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_pengalihan">Nama Dana Pensiun</FormLabel>
                      <FormInput id="nama_pengalihan" type="text" name="nama_pengalihan" value={formData.nama_pengalihan} onChange={handleChange} />
                      <FormH2><i>Kosongkan jika tidak.</i></FormH2>
                    </FormInputDiv>
                  </FormInputWrapperGrid>
                  <FormInputWrapperGrid>
                    <FormInputDiv>
                      <FormLabel htmlFor="peserta_dapen"><strong>Peserta Dapen Lain</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormSelect id="peserta_dapen" name="peserta_dapen" value={formData.peserta_dapen} onChange={handleChange} ref={fieldRefs.peserta_dapen}>
                      <FormOption value="">Pilih</FormOption>
                      <FormOption value={true}>Ya</FormOption>
                      <FormOption value={false}>Tidak</FormOption>
                      </FormSelect>
                      {errors.peserta_dapen && <FormH2Error>{errors.peserta_dapen}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_dapen">Nama Dana Pensiun</FormLabel>
                      <FormInput id="nama_dapen" type="text" name="nama_dapen" value={formData.nama_dapen} onChange={handleChange} />
                      <FormH2><i>Kosongkan jika tidak.</i></FormH2>
                    </FormInputDiv>
                  </FormInputWrapperGrid>
                  <FormLabel htmlFor="dana_rekening"><strong>Sumber Dana Rekening</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="dana_rekening" name="dana_rekening" value={formData.dana_rekening} ref={fieldRefs.dana_rekening} onChange={handleChange}>
                    {danaRekening && danaRekening.map((dana) => (
                      <FormOption key={dana.id} value={dana.code}>{dana.keterangan}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.dana_rekening && <FormH2Error>{errors.dana_rekening}</FormH2Error>}
                  <FormLabel htmlFor="dana_iuran"><strong>Sumber Dana Iuran</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                  <FormSelect id="dana_iuran" name="dana_iuran" value={formData.dana_iuran} ref={fieldRefs.dana_iuran} onChange={handleChange}>
                    {danaIuran && danaIuran.map((dana) => (
                      <FormOption key={dana.id} value={dana.code}>{dana.keterangan}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.dana_iuran && <FormH2Error>{errors.dana_iuran}</FormH2Error>}
                </FormDiv>
              </FormCardWrapper>

              <FormH1>Kepemilikan Rekening</FormH1>
              <FormCardWrapper>
                <FormDiv>
                  <FormLabel htmlFor="rekening_muamalat">Nama Bank</FormLabel>
                  <FormInput id="rekening_muamalat" type="text" name="rekening_muamalat" value={formData.rekening_muamalat} onChange={handleChange} />
                  {/* <FormLabel htmlFor="rekening_1">Nama Bank</FormLabel> */}
                  <FormInput id="rekening_1" type="hidden" name="rekening_1" value={formData.rekening_1} onChange={handleChange} />
                  {/* <FormLabel htmlFor="rekening_2">Nama Bank</FormLabel> */}
                  <FormInput id="rekening_2" type="hidden" name="rekening_2" value={formData.rekening_2} onChange={handleChange} />
                </FormDiv>
                <FormDiv>
                  <FormLabel htmlFor="no_rekening_muamalat">Nomor Rekening</FormLabel>
                  <FormInput id="no_rekening_muamalat" type="number" name="no_rekening_muamalat" value={formData.no_rekening_muamalat} onChange={handleChange} />
                  {/* <FormLabel htmlFor="no_rekening_1">Nomor Rekening</FormLabel> */}
                  <FormInput id="no_rekening_1" type="hidden" name="no_rekening_1" value={formData.no_rekening_1} onChange={handleChange} />
                  {/* <FormLabel htmlFor="no_rekening_2">Nomor Rekening</FormLabel> */}
                  <FormInput id="no_rekening_2" type="hidden" name="no_rekening_2" value={formData.no_rekening_2} onChange={handleChange} />
                </FormDiv>
              </FormCardWrapper>

              <FormH1>Ahli Waris</FormH1>
              <FormH1Error>(*) Data wajib diisi</FormH1Error>
              <FormCardWrapperRow>
                <FormDiv>
                  <FormInputWrapper4Grid>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_1"><strong>Nama Ahli Waris 1</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="nama_ahli_waris_1" type="text" name="nama_ahli_waris_1" value={formData.nama_ahli_waris_1} ref={fieldRefs.nama_ahli_waris_1} onChange={handleChange} />
                      {errors.nama_ahli_waris_1 && <FormH2Error>{errors.nama_ahli_waris_1}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_1"><strong>Tanggal Lahir</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_1" type="date" name="tanggal_lahir_ahli_waris_1" value={formData.tanggal_lahir_ahli_waris_1} ref={fieldRefs.tanggal_lahir_ahli_waris_1} onChange={handleChange} />
                      {errors.tanggal_lahir_ahli_waris_1 && <FormH2Error>{errors.tanggal_lahir_ahli_waris_1}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_1"><strong>Jenis Kelamin</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormSelect id="jenis_kelamin_ahli_waris_1" name="jenis_kelamin_ahli_waris_1" value={formData.jenis_kelamin_ahli_waris_1} ref={fieldRefs.jenis_kelamin_ahli_waris_1} onChange={handleChange}>
                        <FormOption value="">Jenis Kelamin</FormOption>
                        <FormOption value="P">Pria</FormOption>
                        <FormOption value="W">Wanita</FormOption>
                      </FormSelect>
                      {errors.jenis_kelamin_ahli_waris_1 && <FormH2Error>{errors.jenis_kelamin_ahli_waris_1}</FormH2Error>}
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_1"><strong>Hubungan Keluarga</strong><span style={{ color: 'red' }}>*</span></FormLabel>
                      <FormInput id="hubungan_ahli_waris_1" type="text" name="hubungan_ahli_waris_1" value={formData.hubungan_ahli_waris_1} ref={fieldRefs.hubungan_ahli_waris_1} onChange={handleChange} />
                      {errors.hubungan_ahli_waris_1 && <FormH2Error>{errors.hubungan_ahli_waris_1}</FormH2Error>}
                    </FormInputDiv>
                  </FormInputWrapper4Grid>
                  <FormInputWrapper4Grid>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_2">Nama Ahli Waris 2</FormLabel>
                      <FormInput id="nama_ahli_waris_2" type="text" name="nama_ahli_waris_2" value={formData.nama_ahli_waris_2} onChange={handleChange} />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_2">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_2" type="date" name="tanggal_lahir_ahli_waris_2" value={formData.tanggal_lahir_ahli_waris_2} onChange={handleChange} />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_2">Jenis Kelamin</FormLabel>
                      <FormSelect id="jenis_kelamin_ahli_waris_2" name="jenis_kelamin_ahli_waris_2" value={formData.jenis_kelamin_ahli_waris_2} onChange={handleChange}>
                        <FormOption value="">Jenis Kelamin</FormOption>
                        <FormOption value="P">Pria</FormOption>
                        <FormOption value="W">Wanita</FormOption>
                      </FormSelect>
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_2">Hubungan Keluarga</FormLabel>
                      <FormInput id="hubungan_ahli_waris_2" type="text" name="hubungan_ahli_waris_2" value={formData.hubungan_ahli_waris_2} onChange={handleChange} />
                    </FormInputDiv>
                  </FormInputWrapper4Grid>
                  <FormInputWrapper4Grid>
                    <FormInputDiv>
                      <FormLabel htmlFor="nama_ahli_waris_3">Nama Ahli Waris 3</FormLabel>
                      <FormInput id="nama_ahli_waris_3" type="text" name="nama_ahli_waris_3" value={formData.nama_ahli_waris_3} onChange={handleChange} />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="tanggal_lahir_ahli_waris_3">Tanggal Lahir</FormLabel>
                      <FormInput id="tanggal_lahir_ahli_waris_3" type="date" name="tanggal_lahir_ahli_waris_3" value={formData.tanggal_lahir_ahli_waris_3} onChange={handleChange} />
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="jenis_kelamin_ahli_waris_3">Jenis Kelamin</FormLabel>
                      <FormSelect id="jenis_kelamin_ahli_waris_3" name="jenis_kelamin_ahli_waris_3" value={formData.jenis_kelamin_ahli_waris_3} onChange={handleChange}>
                        <FormOption value="">Jenis Kelamin</FormOption>
                        <FormOption value="P">Pria</FormOption>
                        <FormOption value="W">Wanita</FormOption>
                      </FormSelect>
                    </FormInputDiv>
                    <FormInputDiv>
                      <FormLabel htmlFor="hubungan_ahli_waris_3">Hubungan Keluarga</FormLabel>
                      <FormInput id="hubungan_ahli_waris_3" type="text" name="hubungan_ahli_waris_3" value={formData.hubungan_ahli_waris_3} onChange={handleChange} />
                    </FormInputDiv>
                  </FormInputWrapper4Grid>
                </FormDiv>
              </FormCardWrapperRow>

              <FormH1>Akad Perjanjian</FormH1>
              <FormH3>
                Peserta & DPLK Syariah Muamalat bersepakat melakukan Akad Wakalah bil Ujrah
                <ol>
                  <li>Peserta mengajukan permohonan dan menyatakan diri untuk menjadi Peserta DPLK Syariah Muamalat.</li>
                  <li>Peserta bersedia memenuhi seluruh aturan dan ketentuan yang berlaku di DPLK Syariah Muamalat sebagaimana tertuang dalam Peraturan Dana Pensiun DPLK Syariah Muamalat.</li>
                  <li>
                    Dengan Akad Wakalah bil Ujrah Peserta mewakilkan DPLK Syariah Muamalat untuk:
                    <ol>
                      <li>Melakukan Kegiatan Administrasi.</li>
                      <li>Pengelolaan Dana Investasi sesuai Paket Investasi yang dipilih oleh Peserta.</li>
                    </ol>
                  </li>
                  <li>Atas akad Wakalah bil Ujrah DPLK Syariah Muamalat berhak memperoleh imbalan/ujrah sesuai dengan ketentuan Peraturan Dana Pensiun DPLK Syariah Muamalat.</li>
                  <li>Peserta bersedia membayar biaya-biaya yang ditetapkan sesuai dengan ketentuan Peraturan Dana Pensiun DPLK Syariah Muamalat. Perjanjian ini telah disesuaikan dengan ketentuan Peraturan Perundang-Undangan yang berlaku termasuk ketentuan Peraturan Otoritas Jasa Keuangan. Demikian akad ini dibuat secara musyawarah dan mufakat yang berlaku sejak tanggal ditandatangani.</li>
                </ol>
              </FormH3>

              <FormH1>Penjelasan Program Pensiun</FormH1>
              <FormH3>
                <ol>
                  <li>DPLK Syariah Muamalat adalah suatu badan hukum Dana Pensiun berdasarkan Prinsip Syariah yang didirikan oleh PT. Bank Muamalat Indonesia Tbk</li>
                  <li>Program Pensiun DPLK Syariah Muamalat diatur berdasarkan Undang-Undang Dana Pensiun No. 11 Tahun 1992 dan Ketentuan Perundang-Undangan lainnya yang berlaku, program pensiun DPLK Syariah Muamalat bersifat Iuran pasti (IP).</li>
                  <li>Peserta DPLK Syariah Muamalat yaitu perorangan baik karyawan maupun pekerja mandiri yang memenuhi syarat kepesertaan sesuai dengan Peraturan Dana Pensiun DPLK Syariah Muamalat.</li>
                  <li>Iuran adalah sejumlah uang tertentu yang disetorkan oleh Peserta dan atau Pemberi Kerja kepada DPLK Syariah Muamalat yang dibukukan ke rekening masing-masing Peserta.</li>
                  <li>Usia Pensiun Normal yang dapat dipilih oleh Peserta sekurang-kurangnya 55 (lima puluh lima) tahun dan setinggi-tingginya 70 (tujuh puluh) tahun. Dalam hal Peserta diikutkan oleh Pemberi Kerja, maka pilihan Usia Pensiun Normal disesuaikan dengan Usia Pensiun Normal yang berlaku pada Pemberi Kerja.</li>
                  <li>Usia Pensiun Dipercepat adalah sekurang-kurangnya 5 (lima) tahun sebelum Usia Pensiun Nomal.</li>
                  <li>Hak-hak Peserta adalah menentukan usia pensiun, menentukan pilihan dan perubahan jenis investasi, melakukan penarikan sejumlah dana tertentu, meminta informasi mengenai dana peserta yang dimiliki, menunjuk atau mengganti Pihak Yang Berhak (Janda/Duda/Anak atau Pihak Yang Ditunjuk), memilih bentuk anuitas dan memilih Perusahaan Asuransi Jiwa dalam rangka pembayaran manfaat pensiun, mengalihkan kepesertaannya ke Dana Pensiun lain, memperoleh pembayaran manfaat pensiun Secara Sekaligus, dan meminta bukti potong pajak atas penarikan dana oleh Peserta.</li>
                  <li>Kewajiban Peserta adalah menyetor iuran, membayar biaya- biaya yang telah ditetapkan, memberikan keterangan yang lengkap dan benar sesuai yang dibutuhkan oleh DPLK Syariah Muamalat, menaati segala ketentuan yang telah ditetapkan dalam Peraturan DPLK Syariah Muamalat, dan melaporkan ke DPLK Syariah Muamalat setiap terjadi perubahan susunan keluarga, dan atau perubahan alamat dengan mengisi Formulir yang disediakan.</li>
                  <li>Manfaat Pensiun adalah akumulasi iuran dan hasil pengembangan serta dana pengalihan dari Dana Pensiun lain (jika ada) selama masa kepesertaan, yang akan diterima oleh Peserta Secara Sekaligus dan atau Secara Berkala sesuai dengan Peraturan Otoritas Jasa Keuangan (OJK) di bidang Dana Pensiun.</li>
                  <li>Manfaat Pensiun Peserta terdiri dari Manfaat Pensiun Normal, Manfaat Pensiun Dipercepat, Hak atas Pensiun Ditunda, Manfaat Pensiun Cacat, dan Manfaat Pensiun Peserta Berhenti Bekerja dengan saldo dana kurang atau sama dengan Rp 100.000.000,- (seratus juta rupiah).</li>
                  <li>Paket Investasi Syariah adalah sekumpulan jenis Investasi Syariah berdasarkan Prinsip Syariah yang ditawarkan oleh DPLK Syariah Muamalat. Peserta dapat memilih Paket Investasi yang disediakan terdiri dari Paket A, Paket B, dan atau Paket C. Peserta dapat melakukan perubahan Paket Investasi sesuai Peraturan Dana Pensiun DPLK Syariah Muamalat. Segala resiko dan biaya yang timbul dari pilihan dan perubahan pilihan jenis investasi menjadi tanggung jawab Peserta.</li>
                  <li>Selama Dana Peserta dikelola oleh DPLK Syariah Muamalat tidak dikenakan pajak. Pajak diberlakukan ketika Peserta menarik sebagian atau keseluruhan Iuran Pensiun, dan atau pada saat Pembayaran Manfaat Pensiun.</li>
                  <li>Jika Peserta meninggal dunia, maka pihak yang akan memperoleh Manfaat Pensiun adalah Ahli Waris/Pihak Yang Ditunjuk.</li>
                </ol>
              </FormH3>

              <FormH1>Pernyataan Peserta</FormH1>
              <FormH3>
                Dengan menekan tombol <b>Kirim</b>, maka saya menyatakan:
                <ol>
                  <li>Data pribadi saya yang saya berikan dalam formulir ini adalah benar.</li>
                  <li>DPLK Syariah Muamalat dapat melakukan pemeriksaan terhadap kebenaran data yang saya berikan.</li>
                  <li>DPLK Syariah Muamalat telah memberikan penjelasan yang cukup mengenai karakteristik produk DPLK Syariah Muamalat, dan saya telah memahami konsekwensi atas kepesertaan saya di DPLK Syariah Muamalat termasuk manfaat, resiko, dan biaya-biaya yang melekat pada produk tersebut serta kinerja investasi DPLK Syariah Muamalat pada masa lalu bukan merupakan kinerja di masa yang akan datang.</li>
                  <li>Saya setuju DPLK Syariah Muamalat menggunakan dan memberikan data  dan atau infomasi pribadi saya  kepada pihak yang lain yang bekerjsama dengan DPLK Syariah Muamalat.</li>
                  <li>DPLK Syariah Muamalat berhak untuk menolak transaksi, membatalkan transaksi, dan/atau menutup hubungan usaha dengan saya dalam hal saya tidak memenuhi ketentuan Pasal 31 Peraturan Jasa Otoritas Keuangan No. 39/POJK.05/2015.</li>
                </ol>
              </FormH3>
              <FormDiv>
                <FormAgreeLeft>
                  <FormInput type='checkbox' id='checkbox_agree' name='checkbox_agree' checked={isCheckboxChecked} onChange={handleCheckboxChange} />
                  <FormLabel htmlFor='checkbox_agree'>Saya telah membaca dan menyetujui ketentuan yang berlaku.</FormLabel>
                </FormAgreeLeft>
                {error && (
                  <ErrorCard>
                    <MessageH1><b>Gagal!</b></MessageH1>
                    <MessageH2>{error}</MessageH2>
                  </ErrorCard>
                )}
                {success && (
                  <SuccessModal show={showModal} onLogin={() => history.push('/')} message={success} />
                )}
                {showButton && (
                  <FormButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Kirim'}</FormButton>
                )}
              </FormDiv>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Registrasi;
