const { Router } = require('express')
const { body, validationResult } = require('express-validator')
const route = Router()
const nodemailer = require('nodemailer')
const Peserta = require('../model/Peserta')
const Perusahaan = require('../model/Perusahaan')
const Registrasi = require('../model/Registrasi')
const TanyaDPLK = require('../model/TanyaDPLK')
const ActivityAdmin = require('../model/ActivityAdmin')
const RegisPerusahaan = require('../model/RegistrasiPerusahaan')
const bcrypt = require('bcryptjs')

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "m014.dapurhosting.com",
    port: 465,
    auth: {
      user: 'no-reply@dplksyariahmuamalat.co.id',
      pass: 'Bismillah123!'
    }
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: '862c1d7cad62f3', // Ganti dengan email
    //   pass: 'aa4118e1122a50' // Ganti dengan kata sandi
    // }
});

route.post(
    '/v1/mail/tanya-dplk',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('subject').notEmpty().withMessage('Topic is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('text').notEmpty().withMessage('Description is required'),
        body('no_telp').notEmpty().withMessage('Phone number is required'),
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, subject, email, no_telp, text } = req.body;
    const mailData = {
      from: 'no-reply@dplksyariahmuamalat.co.id',
      to: 'dplk@bankmuamalat.co.id',
      subject: subject,
      html: `
        <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
        <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
        <p>Dear, DPLK Syariah Muamalat</p>
        <p>Berikut adalah pesan yang masuk melalui fitur Tanya DPLK di website:</p>
        <p style="margin : 0; padding-top:0;">Nama: ${name}</p>
        <p style="margin : 0; padding-top:0;">Email: ${email}</p>
        <p style="margin : 0; padding-top:0;">Nomor Telepon/HP: ${no_telp}</p>
        <p style="margin : 0; padding-top:0;">Pesan: ${text}</p>
        <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
        <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh</i></p>
      `,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Gagal mengirim pesan', error: error.toString() });
        }
        
        const tanyaDPLK = new TanyaDPLK({
            name, subject, email, no_telp, text
        });

        tanyaDPLK.save()
            .then(() => {
                res.status(200).send({ message: "Pesan berhasil terkirim dan data berhasil disimpan!", message_id: info.messageId });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Pesan terkirim tapi gagal menyimpan data ke database', error: err.toString() });
            });
    });
});

route.post(
    '/v1/mail/forgot-password/peserta',
    [
        body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        try {
            const { no_peserta, email } = req.body;
            const peserta = await Peserta.findOne({ where: { no_peserta, email } });
  
            if (!peserta) {
                return res.status(404).json({ message: "User not found!" });
            }
  
            const newPassword = "dplk"; // Default password
            const hash = await bcrypt.hash(newPassword, 10);
  
            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id', // Ganti dengan email pengirim
                to: email,
                subject: `Reset Password Akun DPLK Syariah Muamalat a.n ${peserta.no_peserta}`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, Peserta</p>
                    <p>Kata sandi Anda telah disetel ulang dengan rincian sebagai berikut:</p>
                    <p>Nomor peserta: ${peserta.no_peserta}</p>
                    <p>Password: dplk</p>
                    <p>Silakan login dengan kata sandi ini dan segera ubah kata sandi Anda.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };
  
            transporter.sendMail(mailData, async (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to send email!" });
                }
  
                try {
                    // Update password in the database only if the email was sent successfully
                    await Peserta.update({ password: hash }, { where: { no_peserta, email } });
                    res.status(200).json({ message: "Reset password berhasil! Periksa email Anda untuk kata sandi baru.", message_id: info.messageId });
                } catch (updateError) {
                    console.error(updateError.message);
                    res.status(500).json({ error: "Failed to update password after email was sent!" });
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal server error!" });
        }
    }
);  

route.post(
  '/v1/mail/forgot-password/perusahaan',
  [
      body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
      body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      try {
          const { no_peserta, email } = req.body;
          const perusahaan = await Perusahaan.findOne({ where: { no_peserta, email } });

          if (!perusahaan) {
              return res.status(404).json({ message: "User not found!" });
          }

          const newPassword = "dplk"; // Default password
          const hash = await bcrypt.hash(newPassword, 10);

          const mailData = {
              from: 'no-reply@dplksyariahmuamalat.co.id', // Ganti dengan email pengirim
              to: email,
              subject: `Reset Password Akun DPLK Syariah Muamalat a.n ${perusahaan.no_peserta}`,
              html: `
                  <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                  <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                  <p>Dear, Peserta</p>
                  <p>Kata sandi Anda telah disetel ulang dengan rincian sebagai berikut:</p>
                  <p>Nomor peserta: ${perusahaan.no_peserta}</p>
                  <p>Password: dplk</p>
                  <p>Silakan login dengan kata sandi ini dan segera ubah kata sandi Anda.</p>
                  <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                  <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                  <p><i>Regards,</i></p>
                  <br/>
                  <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                  <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                  <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                  <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                  <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                  <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
              `,
          };
          
          transporter.sendMail(mailData, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send email!" });
            }

            try {
                // Update password in the database only if the email was sent successfully
                await Perusahaan.update({ password: hash }, { where: { no_peserta, email } });
                res.status(200).json({ message: "Reset password berhasil! Periksa email Anda untuk kata sandi baru.", message_id: info.messageId });
            } catch (updateError) {
                console.error(updateError.message);
                res.status(500).json({ error: "Failed to update password after email was sent!" });
            }
        });
      } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: "Internal server error!" });
      }
  }
);

route.post(
    '/v1/mail/registrasi-peserta/:id',
    [
        body('no_peserta').notEmpty().withMessage('Nomor Peserta is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        try {
            const { no_peserta, email, nama, userUpdate } = req.body;
            const id = req.params.id;

            // Validate form
            if (!email || !no_peserta) {
                return res.status(400).json({ message: "Nomor Peserta harus diisi!" });
            }

            const getRegistrasi = await Registrasi.findOne({ where: { id: id } });
            if (!getRegistrasi) {
                return res.status(404).json({ message: "Registrasi Peserta tidak ditemukan!" });
            }
  
            // Update nomor peserta and status to true
            await Registrasi.update({ status: true, no_peserta, userUpdate }, { where: { id: id } });

            await ActivityAdmin.create({
                nik: userUpdate,
                log: `${nama} (${userUpdate}) melakukan otorisasi untuk peserta baru ${no_peserta}`
            });
  
            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id', // Ganti dengan email pengirim
                to: email,
                subject: `Registrasi Peserta Baru DPLK Syariah Muamalat`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, ${getRegistrasi.nama}</p>
                    <p>Terima kasih, saat ini Anda telah terdaftar di DPLK Syariah Muamalat dengan nomor peserta ${no_peserta}.</p>
                    <p>Pembayaran atau Top Up iuran dapat dilakukan melalui Mobile Banking (Muamalat DIN) pada menu <i><b>Pensiun Hijrah DPLK</b></i> atau transfer antar Bank ke Bank Muamalat dengan nomor virtual account 12091${no_peserta}</p>
                    <p>Referensikan dan hijrahkan keluarga/relasi anda untuk berinvestasi di DPLK Syariah Muamalat, satu-satunya DPLK syariah di Indonesia.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };
  
            transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to send email!" });
                }
                res.status(200).json({ message: "Registrasi Peserta berhasil disetujui!", message_id: info.messageId });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal server error!" });
        }
    }
);

route.post(
    '/v1/mail/registrasi-perusahaan',
    [
        body('nama').notEmpty().withMessage('Name is required'),
        body('pic').notEmpty().withMessage('Coordinator is required'),
        body('jabatan').notEmpty().withMessage('Occupation is required'),
        body('no_telepon').notEmpty().withMessage('Phone number is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, pic, jabatan, no_telepon, email } = req.body;
    const mailData = {
      from: 'no-reply@dplksyariahmuamalat.co.id',
      to: 'dplk@bankmuamalat.co.id',
      subject: 'Pendaftaran Peserta Korporat DPLK Syariah Muamalat',
      html: `
        <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
        <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
        <p>Dear, DPLK Syariah Muamalat</p>
        <p>Berikut adalah pesan yang masuk melalui fitur Pendaftaran Perusahaan di website:</p>
        <p style="margin : 0; padding-top:0;">Nama Perusahaan: ${nama}</p>
        <p style="margin : 0; padding-top:0;">Koordinator Perusahaan: ${pic}</p>
        <p style="margin : 0; padding-top:0;">Jabatan di Perusahaan: ${jabatan}</p>
        <p style="margin : 0; padding-top:0;">Email: ${email}</p>
        <p style="margin : 0; padding-top:0;">No Telepon: ${no_telepon}</p>
        <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
        <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh</i></p>
      `,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Gagal mengirim pesan', error: error.toString() });
        }
        
        const regisPerusahaan = new RegisPerusahaan({
            nama, pic, jabatan, email, no_telepon
        });

        regisPerusahaan.save()
            .then(() => {
                res.status(200).send({ message: "Pesan berhasil terkirim! Mohon tunggu jawaban dari kami melalui email/nomor telepon Anda.", message_id: info.messageId });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Pesan terkirim tapi gagal menyimpan data ke database', error: err.toString() });
            });
    });
});

route.post(
    '/v1/mail/reject/registrasi-peserta/:id',
    [
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('text').notEmpty().withMessage('Description is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        try {
            const { email, text, nama, userUpdate } = req.body;
            const id = req.params.id;

            const getRegistrasi = await Registrasi.findOne({ where: { id: id } });
            if (!getRegistrasi) {
                return res.status(404).json({ message: "Registrasi Peserta tidak ditemukan!" });
            }
  
            // Update status to false
            await Registrasi.update({ status: false, userUpdate }, { where: { id: id } });

            await ActivityAdmin.create({
                nik: userUpdate,
                log: `${nama} (${userUpdate}) menolak registrasi peserta baru dari ${email}`
            });
  
            const mailData = {
                from: 'no-reply@dplksyariahmuamalat.co.id', // Ganti dengan email pengirim
                to: email,
                subject: `Permohonan Kelengkapan Registrasi Peserta Baru DPLK Syariah Muamalat`,
                html: `
                    <p><i>Assalaamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p>Segala puji hanya milik Allah SWT, sholawat dan salam semoga tercurah kepada Nabi Muhammad SAW, semoga kita semua senantiasa diberi rahmat dan hidayah-Nya dalam menjalankan aktivitas sehari-hari, Aamiin.</p>
                    <p>Dear, ${getRegistrasi.nama}</p>
                    <p>Pendaftaran kepesertaan Anda di DPLK Syariah Muamalat kami tolak. Mohon lengkapi kelengkapan registrasi peserta dengan catatan sebagai berikut:</p>
                    <p>${text}</p>
                    <p>Kelengkapan registrasi dapat dikirimkan melalui email ke dplk@bankmuamalat.co.id atau dengan mengisi ulang formulir registrasi pada website.</p>
                    <p>Atas perhatian dan kerjasamanya, terima kasih.</p>
                    <p><i>Wassalamu'alaikum Warrahmatullahi Wabarakatuh,</i></p>
                    <p><i>Regards,</i></p>
                    <br/>
                    <p style="margin : 0; padding-top:0;"><b>DPLK Syariah Muamalat</b></p>
                    <p style="margin : 0; padding-top:0;">Muamalat Tower Lt. 3</p>
                    <p style="margin : 0; padding-top:0;">Jl. Prof. Dr. Satrio No. 18 Kuningan, Jakarta 12950</p>
                    <p style="margin : 0; padding-top:0;">(021) 80666000 ext. 110565</p>
                    <p style="margin : 0; padding-top:0;">dplk@bankmuamalat.co.id</p>
                    <p style="margin : 0; padding-top:0;">dplksyariahmuamalat.co.id</p>
                `,
            };
  
            transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to send email!" });
                }
                res.status(200).json({ message: "Registrasi Peserta berhasil ditolak!", message_id: info.messageId });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal server error!" });
        }
    }
);

module.exports = route