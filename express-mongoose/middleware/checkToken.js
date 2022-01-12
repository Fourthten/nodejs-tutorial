const jwt = require('jsonwebtoken');
const User = require('../models/user/user.model');
const isEmpty = require('is-empty');

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let deviceid = !isEmpty(req.body.device) ? req.body.device : '';

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    message: 'Akses ditolak, mohon masuk kembali #1'
                });
            } else {
                if (decoded.platform == "mobile") {
                    User.findOne({
                        $and: [{email: decoded.email}, {phone_number: decoded.phone_number}]
                    }).then(user => {
                        if (user) {
                            if (decoded.password == user.password && 
                                decoded.email == user.email && 
                                decoded.phone_number == user.phone_number && 
                                decoded.iat == user.device.iat && 
                                decoded.device == user.device.deviceid && 
                                deviceid == user.device.deviceid) {
                                req.decoded = {
                                    _id: user._id
                                }
                                next()
                            } else {
                                return res.status(400).json({
                                    message: 'Akses ditolak, mohon masuk kembali #2'
                                });
                            }
                        } else {
                            return res.status(404).json({
                                message: 'Kesalahan saat masuk pengguna #2'
                            })
                        }
                    }).catch(err => {
                        return res.status(404).json({
                            message: 'Kesalahan saat masuk pengguna #1'
                        })
                    });
                } else {
                    req.decoded = {
                        _id: user._id
                    }
                    next()
                }
            }
        })
    } else {
        return res.status(400).json({
            message: 'Token autentikasi tidak disediakan'
        })
    }
}
