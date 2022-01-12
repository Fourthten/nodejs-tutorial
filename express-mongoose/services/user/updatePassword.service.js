const bcrypt = require('bcryptjs');
const User = require('../../models/user/user.model');
const validate = require('../../validation/user/updatePassword');

module.exports = (req, res) => {
    const {
        errors,
        isValid
    } = validate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findById({
            _id: req.decoded._id
        })
        .then(user => {
            if (user) {
                let salt = bcrypt.genSaltSync();
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if (err) {
                        return res.status(400).send(err);
                    }

                    if (isMatch) {
                        return res.status(400).json({
                            message: "Password pernah digunakan, mohon gunakan password lain"
                        })
                    } else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) {
                                return res.status(400).send(err);
                            } else {
                                user.update({
                                    password: hash
                                }, (err, raw) => {
                                    if (err) {
                                        return res.status(400).json({
                                            message: "Password gagal diperbaharui"
                                        });
                                    } else {
                                        return res.status(200).json({
                                            message: "Password berhasil diperbaharui",
                                            user
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
}