const User = require('../../models/user/user.model');
const Verifymodel = require('../../models/user/verification.model');
const Validator = require('validator');
const isEmpty = require('is-empty');
const bodyEmail = require('../emailverification');

// Kirim kode One Time Password
exports.send = (req, res) => {
    let {
        verification
    } = req.body;

    let errors = {}
    let verify = ''
    let createat = new Date().valueOf()
    let otpCode = Math.floor( Math.random() * 8999 ) + 1000

    verification = !isEmpty(verification) ? verification : ''

    // Cek data
    if (Validator.isEmpty(verification)) {
        errors.verification = "Kolom verifikasi wajib di isi"
    } else if (Validator.isEmail(verification)) {
        verify = 'email'
    } else if (Validator.isMobilePhone(verification, 'id-ID', {strictMode: true})){
        verify = 'phone'
    } else {
        errors.verification = "Email atau telepon tidak valid"
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    // Berdasarkan nomor telepon
    if (verify == 'phone'){
        // Cari pengguna
        User.findOne({
            phone_number: verification
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    message: 'Nomor telepon telah terdaftar'
                })
            } else {
                // Kirim OTP twilio
                const accountSid = 'your id';
                const authToken = 'your token';
                const client = require('twilio')(accountSid, authToken);

                client.messages
                .create({
                    body: 'Kode verifikasi OTP anda adalah ' + otpCode + ', Kode hanya berlaku 10 menit. Salam Goraxis, Yogyakarta',
                    from: 'your phone',
                    to: verification
                })
                .then(message => {
                    // Cari verifikasi
                    Verifymodel.findOne({
                        userid: verification
                    })
                    .then(verifydata => {
                        if (verifydata) {
                            // Perbaharui data verifikasi
                            Verifymodel.findOneAndUpdate({
                                userid: verification
                            }, { 
                                verify_code: otpCode,
                                expired: parseInt(createat + 600000),
                                createdAt: new Date(createat)
                            })
                            .then(verdata => {
                                return res.status(201).json({
                                    message: "sukses",
                                    verified: message,
                                    verify: verification,
                                    createat: createat,
                                    expired: parseInt(createat + 600000)
                                })
                            }).catch(err => {
                                return res.status(500).send({
                                    message: "Kesalahan saat mengirim kode OTP #5"
                                });
                            });
                        } else {
                            // Isi data verifikasi
                            let newVerification = new Verifymodel({
                                userid: verification,
                                verify_code: otpCode,
                                expired: parseInt(createat + 600000),
                                createdAt: new Date(createat)
                            })

                            // Simpan data verifikasi
                            newVerification.save().then(verdata => {
                                return res.status(201).json({
                                    message: "sukses",
                                    verified: message,
                                    verify: verification,
                                    createat: createat,
                                    expired: parseInt(createat + 600000)
                                })
                            }).catch(err => {
                                return res.status(500).send({
                                    message: "Kesalahan saat simpan kode OTP #5"
                                });
                            });
                        }
                    }).catch(err => {
                        return res.status(500).send({
                            message: "Kesalahan saat mengirim kode OTP #4"
                        });
                    });
                }).catch(err => {
                    return res.status(404).json({
                        message: 'Kesalahan saat mengirim kode OTP #3'
                    })
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: 'Kesalahan saat mengirim kode OTP #2'
            })
        });
    // Berdasarkan email
    } else if (verify == 'email') {
        // Cari pengguna
        User.findOne({
            email: verification
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    message: 'Email telah terdaftar'
                })
            } else {
                // Tampilan email
                const {
                    mailbody
                } = bodyEmail(otpCode, verification);

                const nodemailer = require("nodemailer");
                const getDataMail = async () => {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "your gmail",
                            pass: "your password"
                        }
                    });
                    let info = await transporter.sendMail({
                        from: "Bantuan Goraxis <your gmail>",
                        to: verification,
                        subject: 'Verifikasi Akun Goraxis',
                        html: mailbody
                    });
                }

                getDataMail().then(email => {
                    Verifymodel.findOne({
                        userid: verification
                    })
                    .then(verifydata => {
                        if (verifydata) {
                            // Perbaharui data verifikasi
                            Verifymodel.findOneAndUpdate({
                                userid: verification
                            }, { 
                                verify_code: otpCode,
                                expired: parseInt(createat + 600000),
                                createdAt: new Date(createat)
                            })
                            .then(verdata => {
                                return res.status(201).json({
                                    message: "sukses",
                                    // verified: email,
                                    verify: verification,
                                    createat: createat,
                                    expired: parseInt(createat + 600000)
                                })
                            }).catch(err => {
                                return res.status(500).send({
                                    message: "Kesalahan saat mengirim kode OTP #5"
                                });
                            });
                        } else {
                            // Isi data verifikasi
                            let newVerification = new Verifymodel({
                                userid: verification,
                                verify_code: otpCode,
                                expired: parseInt(createat + 600000),
                                createdAt: new Date(createat)
                            })

                            // Simpan data verifikasi
                            newVerification.save().then(verdata => {
                                return res.status(201).json({
                                    message: "sukses",
                                    // verified: email,
                                    verify: verification,
                                    createat: createat,
                                    expired: parseInt(createat + 600000)
                                })
                            }).catch(err => {
                                return res.status(500).send({
                                    message: "Kesalahan saat mengirim kode OTP #5"
                                });
                            });
                        }
                    }).catch(err => {
                        return res.status(500).send({
                            message: "Kesalahan saat mengirim kode OTP #4"
                        });
                    });
                }).catch(err => {
                    return res.status(404).json({
                        message: 'Kesalahan saat mengirim kode OTP #3'
                    })
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: 'Kesalahan saat mengirim kode OTP #2'
            })
        });
    } else {
        return res.status(404).json({
            message: 'Kesalahan saat mengirim kode OTP #1',
        })
    }
}

// Validasi kode One Time Password
exports.checkVerification = (req, res) => {
    let {
        verification,
        code
    } = req.body;

    let datenow = new Date().valueOf()

    Verifymodel.findOne({
        userid: verification
    })
    .then(verifydata => {
        if (verifydata) {
            if (code==verifydata.verify_code) {
                if (datenow<=verifydata.expired) {
                    return res.status(201).send({
                        message: "sukses",
                        verified: true
                    });
                } else {
                    return res.status(400).send({
                        message: "Kode verifikasi anda sudah kedaluwarsa, Silahkan kirim ulang kode verifikasi anda",
                        verified: false
                    });
                }
            } else {
                return res.status(400).send({
                    message: "Mohon isi kode verifikasi dengan benar",
                    verified: false
                });
            }
        } else {
            return res.status(400).send({
                message: "Kesalahan saat memvalidasi kode OTP #2"
            });
        }
    }).catch(err => {
        return res.status(500).send({
            message: "Kesalahan saat memvalidasi kode OTP #1"
        });
    });
}