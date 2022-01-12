const express = require('express');
const apirefreshToken = express.Router();
const jwt = require('jsonwebtoken');
const model = require('../../models/index');

apirefreshToken.get('/refreshmytoken', async function(req, res, next) { 
    const {
        username,
        password
    } = req.body;

    let token = req.body.token;

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    if (token) {
        // Temukan pengguna
        await model.users.findOne({
            $or: [{email: username}, {phone_number: username}]
        }).then(user => {
            if (user) {
                if (password==user.password) {
                    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                        let retoken = false
                        // Cek kadaluarsa token jwt
                        if (err) {
                            retoken = true
                        } else {
                            let exptoken = new Date(decoded.exp*1000).valueOf()
                            let datenow = (new Date().valueOf())+28800000
                            if ( exptoken<datenow ) { retoken = true }
                        }

                        if( retoken == true ){
                            // buat token baru
                            jwt.sign({
                                user
                            }, process.env.SECRET_KEY, {
                                expiresIn: '4d'
                            }, (err, token) => {
                                user.api_token = token;
                                return res.status(201).json({
                                    message: 'sukses',
                                    data: user
                                });
                            })
                        } else {
                            user.api_token = token;
                            return res.status(201).json({
                                message: 'sukses',
                                data: user
                            });
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: 'Token autentikasi tidak disediakan #4'
                    })
                }
            } else {
                return res.status(400).json({
                    message: 'Token autentikasi tidak disediakan #3'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: 'Token autentikasi tidak disediakan #2'
            })
        });
    } else {
        return res.status(400).json({
            message: 'Token autentikasi tidak disediakan #1'
        })
    }
});

module.exports = apirefreshToken;