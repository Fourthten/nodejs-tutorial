const User = require('../../models/user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateLogin = require('../../validation/user/login');
const validateLoginmobile = require('../../validation/user/loginmobile');

exports.login = (req, res) => {
    const {
        errors,
        isValid
    } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        username,
        password
    } = req.body;

    User.findOne({
        $or: [{email: username}, {phone_number: username}]
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    jwt.sign({
                        user
                    }, process.env.SECRET_KEY, {
                        expiresIn: '4d'
                    }, (err, token) => {
                        user.api_token = token;
                        return res.status(201).json({
                            message: 'sukses',
                            data: user,
                            token: 'Bearer ' + token
                        });
                    })
                } else {
                    return res.status(400).json({
                        message: "Password anda salah"
                    })
                }
            })
        } else {
            return res.status(404).json({
                message: 'Email atau nomor telepon belum terdaftar, Silahkan daftar terlebih dahulu'
            })
        }
    }).catch(err => {
        return res.status(404).json({
            message: 'Kesalahan saat masuk pengguna #1'
        })
    });
}

exports.loginmobile = (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginmobile(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        username,
        password,
        device
    } = req.body;

    User.findOne({
        $or: [{email: username}, {phone_number: username}]
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    jwt.sign({
                        email: user.email,
                        phone_number: user.phone_number,
                        password: user.password,
                        device: device,
                        platform: 'mobile'
                    }, process.env.SECRET_KEY, 
                    (err, token) => {
                        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                            if (err) {
                                return res.status(400).json({
                                    message: 'Kesalahan saat masuk pengguna #2'
                                });
                            } else {
                                User.findByIdAndUpdate(user._id, {
                                    device: {
                                        iat: decoded.iat,
                                        deviceid: device
                                    }
                                }, {new: true})
                                .then(users => {
                                    return res.status(201).json({
                                        message: 'sukses',
                                        data: {
                                            fullname: users.full_name,
                                            email: users.email,
                                            phone: users.phone_number,
                                            birthdate: users.birthdate,
                                            photo: users.photo_url,
                                            role: users.role_id,
                                            api_token: token
                                        },
                                        token: 'Bearer ' + token
                                    });
                                }).catch(err => {
                                    return res.status(400).send({
                                        message: "Kesalahan saat masuk pengguna #3"
                                    });
                                });
                            }
                        })
                    })
                } else {
                    return res.status(400).json({
                        message: "Password anda salah"
                    })
                }
            })
        } else {
            return res.status(404).json({
                message: 'Email atau nomor telepon belum terdaftar, Silahkan daftar terlebih dahulu'
            })
        }
    }).catch(err => {
        return res.status(404).json({
            message: 'Kesalahan saat masuk pengguna #1'
        })
    });
}