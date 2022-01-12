// Import module
const jwt = require('jsonwebtoken');
const model = require('../models/index');
const isEmpty = require('is-empty');
require('dotenv').config();

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // let deviceid = !isEmpty(req.body.device) ? req.body.device : '';

    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        // Verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, encoded) => {
            if (err) {
                return res.status(400).json({
                    message: "Akses token ditolak, mohon masuk kembali",
                    access: false
                });
            } else {
                decoded = encoded.userdata;
                // if (decoded.platform == 'mobile') {
                    // User.findOne({
                    //     $and: [{email: decoded.email}, {phone_number: decoded.phone_number}]
                    // }).then(user => {
                    //     if (user) {
                    //         if (decoded.password == user.password && 
                    //             decoded.email == user.email && 
                    //             decoded.phone_number == user.phone_number && 
                    //             decoded.iat == user.device.iat && 
                    //             decoded.device == user.device.deviceid && 
                    //             deviceid == user.device.deviceid) {
                    //             req.decoded = {
                    //                 _id: user._id
                    //             }
                    //             next()
                    //         } else {
                    //             return res.status(400).json({
                    //                 message: 'Akses ditolak, mohon masuk kembali #2'
                    //             });
                    //         }
                    //     } else {
                    //         return res.status(404).json({
                    //             message: 'Kesalahan saat masuk pengguna #2'
                    //         })
                    //     }
                    // }).catch(err => {
                    //     return res.status(404).json({
                    //         message: 'Kesalahan saat masuk pengguna #1'
                    //     })
                    // });
                // } else {
                    // Get user
                    model.users.findOne({
                        where: { email: decoded.email }
                    }).then(user => {
                        // Check valid user
                        if (user) {
                            if (decoded.email == user.email && decoded.password == user.password) {
                                req.decoded = { _id: user.uuid }
                                next()
                            } else {
                                return res.status(400).json({
                                    message: "Akses pengguna ditolak, mohon masuk kembali",
                                    access: false
                                });
                            }
                        } else {
                            return res.status(404).json({
                                message: "Email belum terdaftar, mohon registrasi",
                                access: false
                            })
                        }
                    }).catch(err => {
                        return res.status(404).json({
                            message: "Kesalahan saat masuk pengguna",
                            access: false
                        })
                    });
                // }
            }
        })
    } else {
        return res.status(400).json({
            message: "Token autentikasi tidak disediakan",
            access: false
        })
    }
}
