import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';

import SigninPage from './pages/peserta';
import SignUpPage from './pages/peserta/create';
import DashboardPPIP from './pages/peserta/dashboard';
import ProfilPPIP from './pages/peserta/profil';
import SaldoPPIP from './pages/peserta/saldo';
import RiwayatPPIP from './pages/peserta/riwayat';
import KlaimPeserta from './pages/peserta/klaim';
import ResetPeserta from './pages/peserta/reset-password';
import PasswordPesertaPage from './pages/peserta/lupa-password';
import RegistrasiPPIP from './pages/peserta/registrasi';
import PengkinianData from './pages/peserta/pengkinian-data';
import UbahPaketInvestasi from './pages/peserta/paket-investasi';
import UbahUsiaPensiun from './pages/peserta/usia-pensiun';
import LCF from './pages/peserta/life-cycle-fund';

import LoginPage from './pages/perusahaan';
import SignUp from './pages/perusahaan/create';
import DashboardPPUKP from './pages/perusahaan/dashboard';
import ProfilPPUKP from './pages/perusahaan/profil';
import SaldoPPUKP from './pages/perusahaan/saldo';
import RiwayatPPUKP from './pages/perusahaan/riwayat';
import ResetPerusahaan from './pages/perusahaan/reset-password';
import PasswordPerusahaanPage from './pages/perusahaan/lupa-password';
import RegistrasiPPUKP from './pages/perusahaan/registrasi';

import About from './pages/about/pensiun-hijrah';
import Management from './pages/about/manajemen';
import Lokasi from './pages/about/kantor';
import Award from './pages/about/award';
import News from './pages/media/berita';
import Announcement from './pages/media/pengumuman';
import Video from './pages/media/video';
import Investasi from './pages/media/investasi';
import Keuangan from './pages/media/keuangan';
import Pengawas from './pages/media/pengawas';
import Panduan from './pages/bantuan/panduan';
import Formulir from './pages/bantuan/download';
import Kontak from './pages/bantuan/kontak';
import FAQ from './pages/bantuan/faq';
import Individu from './pages/product/individu';
import Perusahaan from './pages/product/perusahaan';
import Eksekutif from './pages/product/eksekutif';
import Zakat from './pages/product/zakat-dana-pensiun';
import PensiunSyariah from './pages/product/dana-pensiun-syariah';
import Simulasi from './pages/simulasi';
import ProfilRisiko from './pages/profil-risiko';

import SignInPageAdmin from './pages/admin';
import DashboardAdmin from './pages/admin/dashboard';
import ResetAdmin from './pages/admin/reset-password';
import ManagementAdmin from './pages/admin/about/manajemen';
import AwardAdmin from './pages/admin/about/penghargaan';
import SliderAdmin from './pages/admin/media/slider';
import BeritaAdmin from './pages/admin/media/berita';
import PengumumanAdmin from './pages/admin/media/pengumuman';
import VideoAdmin from './pages/admin/media/video';
import ReportAdmin from './pages/admin/dokumen/report';
import BantuanAdmin from './pages/admin/dokumen/bantuan';
import BlockPeserta from './pages/admin/peserta/block';
import TanyaDPLKAdmin from './pages/admin/tanya-dplk';
import RegistrasiPesertaAdmin from './pages/admin/peserta/registrasi';
import PengkinianPesertaAdmin from './pages/admin/peserta/pengkinian-data';
import PaketInvestasiAdmin from './pages/admin/peserta/paket-investasi';
import ParameterPaketAdmin from './pages/admin/parameter/investasi';
import BlockPerusahaan from './pages/admin/perusahaan/block';
import RegisPerusahaan from './pages/admin/perusahaan/registrasi';
import LogAdmin from './pages/admin/aktivitas/admin';
import CreateAdmin from './pages/admin/user/create';
import AdminResetPassword from './pages/admin/user/reset-password';

import SignInPageAbsen from './pages/absen';
import DashboardAbsen from './pages/absen/dashboard';
import VisitAbsen from './pages/absen/visit';

import NotFound from './pages/not-found';
import Telkomsel from './pages/telkomsel';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/peserta/" component={SigninPage} exact />
        <Route path="/peserta/create/" component={SignUpPage} exact />
        <Route path="/peserta/dashboard/" component={DashboardPPIP} exact />
        <Route path="/peserta/profil/" component={ProfilPPIP} exact />
        <Route path="/peserta/saldo/" component={SaldoPPIP} exact />
        <Route path="/peserta/riwayat/" component={RiwayatPPIP} exact />
        <Route path="/peserta/klaim/" component={KlaimPeserta} exact />
        <Route path="/peserta/ubah-password/" component={ResetPeserta} exact />
        <Route path="/peserta/lupa-password/" component={PasswordPesertaPage} exact />
        <Route path="/peserta/registrasi/" component={RegistrasiPPIP} exact />
        <Route path="/peserta/pengkinian-data/" component={PengkinianData} exact />
        <Route path="/peserta/paket-investasi/" component={UbahPaketInvestasi} exact />
        <Route path="/peserta/usia-pensiun/" component={UbahUsiaPensiun} exact />
        <Route path="/peserta/life-cycle-fund/" component={LCF} exact />

        <Route path="/perusahaan/" component={LoginPage} exact />
        <Route path="/perusahaan/create/" component={SignUp} exact />
        <Route path="/perusahaan/dashboard/" component={DashboardPPUKP} exact />
        <Route path="/perusahaan/profil/" component={ProfilPPUKP} exact />
        <Route path="/perusahaan/saldo/" component={SaldoPPUKP} exact />
        <Route path="/perusahaan/riwayat/" component={RiwayatPPUKP} exact />
        <Route path="/perusahaan/ubah-password/" component={ResetPerusahaan} exact />
        <Route path="/perusahaan/lupa-password/" component={PasswordPerusahaanPage} exact />
        <Route path="/perusahaan/registrasi/" component={RegistrasiPPUKP} exact />

        <Route path="/about/dplk/" component={About} exact />
        <Route path="/about/manajemen/" component={Management} exact />
        <Route path="/about/lokasi/" component={Lokasi} exact />
        <Route path="/about/penghargaan/" component={Award} exact />
        <Route path="/media/berita/" component={() => <News isSingleItem={false} />} exact />
        <Route path="/media/berita/:seo" component={() => <News isSingleItem={true} />} exact />
        <Route path="/media/pengumuman/" component={() => <Announcement isSingleItem={false} />} exact />
        <Route path="/media/pengumuman/:seo" component={() => <Announcement isSingleItem={true} />} exact />
        <Route path="/media/video/" component={Video} exact />
        <Route path="/media/investasi/" component={Investasi} exact />
        <Route path="/media/keuangan/" component={Keuangan} exact />
        <Route path="/media/dewan-pengawas/" component={Pengawas} exact />
        <Route path="/bantuan/panduan/" component={Panduan} exact />
        <Route path="/bantuan/download/" component={Formulir} exact />
        <Route path="/bantuan/faq/" component={FAQ} exact />
        <Route path="/bantuan/kontak/" component={Kontak} exact />
        <Route path="/product/pensiun-hijrah/" component={Individu} exact />
        <Route path="/product/pensiun-hijrah-pasca-kerja/" component={Perusahaan} exact />
        <Route path="/product/pensiun-hijrah-eksekutif/" component={Eksekutif} exact />
        <Route path="/product/zakat-dana-pensiun/" component={Zakat} exact />
        <Route path="/product/dana-pensiun-syariah/" component={PensiunSyariah} exact />
        <Route path="/simulasi/" component={Simulasi} exact />
        <Route path="/profil-risiko/" component={ProfilRisiko} exact />

        <Route path="/admin" component={SignInPageAdmin} exact />
        <Route path="/admin/dashboard/" component={DashboardAdmin} exact />
        <Route path="/admin/reset-password/" component={ResetAdmin} exact />
        <Route path="/admin/about/manajemen/" component={ManagementAdmin} exact />
        <Route path="/admin/about/penghargaan/" component={AwardAdmin} exact />
        <Route path="/admin/media/slider/" component={SliderAdmin} exact />
        <Route path="/admin/media/berita/" component={BeritaAdmin} exact />
        <Route path="/admin/media/pengumuman/" component={PengumumanAdmin} exact />
        <Route path="/admin/media/video/" component={VideoAdmin} exact />
        <Route path="/admin/dokumen/report/" component={ReportAdmin} exact />
        <Route path="/admin/dokumen/bantuan/" component={BantuanAdmin} exact />
        <Route path="/admin/peserta/reset-password/" component={BlockPeserta} exact />
        <Route path="/admin/peserta/paket-investasi/" component={PaketInvestasiAdmin} exact />
        <Route path="/admin/peserta/registrasi/" component={() => <RegistrasiPesertaAdmin isSingleItem={false} />} exact />
        <Route path="/admin/peserta/registrasi/:id" component={() => <RegistrasiPesertaAdmin isSingleItem={true} />} exact />
        <Route path="/admin/peserta/pengkinian-data/" component={() => <PengkinianPesertaAdmin isSingleItem={false} />} exact />
        <Route path="/admin/peserta/pengkinian-data/:id" component={() => <PengkinianPesertaAdmin isSingleItem={true} />} exact />
        <Route path="/admin/perusahaan/reset-password/" component={BlockPerusahaan} exact />
        {/* <Route path="/admin/perusahaan/block/" component={BlockPerusahaan} exact /> */}
        <Route path="/admin/perusahaan/registrasi/" component={RegisPerusahaan} exact />
        <Route path="/admin/tanya-dplk/" component={TanyaDPLKAdmin} exact />
        <Route path="/admin/parameter/investasi/" component={ParameterPaketAdmin} exact />
        <Route path="/admin/aktivitas/admin/" component={LogAdmin} exact />
        <Route path="/admin/user/create/" component={CreateAdmin} exact />
        <Route path="/admin/user/reset-password/" component={AdminResetPassword} exact />

        <Route path="/absen" component={SignInPageAbsen} exact />
        <Route path="/absen/dashboard" component={DashboardAbsen} exact />
        <Route path="/absen/visit" component={VisitAbsen} exact />

        <Route path="/telkomsel" component={Telkomsel} exact />

        {/* Not found page */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
