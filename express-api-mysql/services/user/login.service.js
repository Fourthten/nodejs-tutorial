// Import module
const model = require('../../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cryptojs = require('crypto-js');
const validateLogin = require('../../validation/user/login');
// const validateLoginmobile = require('../../validation/user/loginmobile');
require('dotenv').config();

exports.login = async (req, res) => {
    // Required params
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        let valid_error = { messages: errors, access: false }
        return res.status(400).json(valid_error);
    }

    const { email, password } = req.body;
    // Get user
    await model.users.findOne({
        where: { email: email }
    }).then(user => {
        if (user) {
            // Check password
            var crypto_pass = cryptojs.SHA256(password + process.env.SECRET_KEY).toString();
            bcrypt.compare(crypto_pass, user.password).then(isMatch => {
                if (isMatch) {
                    var userdata = {
                        uuid: user.uuid,
                        email: user.email,
                        password: user.password,
                        full_name: user.full_name,
                        phone_number: user.phone_number,
                        address: user.address,
                        photo_url: user.photo_url,
                        role_uuid: user.role_uuid,
                        is_active: user.is_active,
                    };
                    // Create token
                    jwt.sign({ userdata }, 
                    process.env.SECRET_KEY, { expiresIn: '365d' }, 
                    (err, token) => {
                        if(!err) {
                            delete userdata.password;
                            userdata.token = token;
                            return res.status(200).json({
                                message: "Anda berhasil masuk",
                                data: userdata,
                                token: "Bearer " + token,
                                access: true
                            });
                        } else {
                            return res.status(404).json({
                                message: "Kesalahan token autentikasi",
                                access: false
                            })
                        }
                        
                    })
                } else {
                    return res.status(400).json({
                        message: "Password anda salah",
                        access: false
                    })
                }
            })
        } else {
            return res.status(404).json({
                message: "Email belum terdaftar, mohon registrasi",
                access: false
            })
        }
    }).catch(err => {
        return res.status(404).json({
            message: err.message || "Kesalahan saat masuk pengguna",
            access: false
        })
    });
}

// exports.loginmobile = (req, res) => {
//     const {
//         errors,
//         isValid
//     } = validateLoginmobile(req.body);

//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const {
//         username,
//         password,
//         device
//     } = req.body;

//     User.findOne({
//         $or: [{email: username}, {phone_number: username}]
//     }).then(user => {
//         if (user) {
//             bcrypt.compare(password, user.password).then(isMatch => {
//                 if (isMatch) {
//                     jwt.sign({
//                         email: user.email,
//                         phone_number: user.phone_number,
//                         password: user.password,
//                         device: device,
//                         platform: 'mobile'
//                     }, process.env.SECRET_KEY, 
//                     (err, token) => {
//                         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//                             if (err) {
//                                 return res.status(400).json({
//                                     message: 'Kesalahan saat masuk pengguna #2'
//                                 });
//                             } else {
//                                 User.findByIdAndUpdate(user._id, {
//                                     device: {
//                                         iat: decoded.iat,
//                                         deviceid: device
//                                     }
//                                 }, {new: true})
//                                 .then(users => {
//                                     return res.status(201).json({
//                                         message: 'sukses',
//                                         data: {
//                                             fullname: users.full_name,
//                                             email: users.email,
//                                             phone: users.phone_number,
//                                             birthdate: users.birthdate,
//                                             photo: users.photo_url,
//                                             role: users.role_id,
//                                             api_token: token
//                                         },
//                                         token: 'Bearer ' + token
//                                     });
//                                 }).catch(err => {
//                                     return res.status(400).send({
//                                         message: "Kesalahan saat masuk pengguna #3"
//                                     });
//                                 });
//                             }
//                         })
//                     })
//                 } else {
//                     return res.status(400).json({
//                         message: "Password anda salah"
//                     })
//                 }
//             })
//         } else {
//             return res.status(404).json({
//                 message: 'Email atau nomor telepon belum terdaftar, Silahkan daftar terlebih dahulu'
//             })
//         }
//     }).catch(err => {
//         return res.status(404).json({
//             message: 'Kesalahan saat masuk pengguna #1'
//         })
//     });
// }