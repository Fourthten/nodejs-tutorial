const User = require('../../models/user/user.model');
const Verifymodel = require('../../models/user/verification.model');
const bcrypt = require('bcryptjs');
const validateRegister = require('../../validation/user/register');
const isEmpty = require('is-empty');

exports.register = (req, res) => {
    const {
        errors,
        isValid
    } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        $or: [{email: req.body.email}, {phone_number: req.body.phone}]
    }).then(user => {
        if (user) {
            return res.status(400).json({
                message: 'Email atau telepon telah terdaftar'
            })
        } else {
            let newUser = new User({
                full_name: req.body.fullname,
                email: req.body.email,
                birthdate: req.body.birthdate,
                phone_number: req.body.phone,
                password: req.body.password,
                role_id: !isEmpty(req.body.role) ? req.body.role : 'customer'
            })
            let salt = bcrypt.genSaltSync();

            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    })
                } else {
                    newUser.password = hash;
                    newUser.save().then(user => {
                        Verifymodel.deleteMany({ 
                            $or: [{userid: req.body.email}, {userid: req.body.phone}]
                        }).then(rm => {
                            return res.status(201).json({
                                message: 'sukses',
                                data: user
                            })
                        }).catch(err => {
                            return res.status(404).json({
                                message: 'Kesalahan saat hapus verifikasi #1'
                            })
                        })
                    }).catch(err => {
                        return res.status(404).json({
                            message: 'Kesalahan saat registrasi pengguna #2'
                        })
                    });
                }
            })
        }
    }).catch(err => {
        return res.status(404).json({
            message: 'Kesalahan saat registrasi pengguna #1'
        })
    });
}