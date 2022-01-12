// Import module
const model = require('../models/index');
const validateUser = require('../validation/source/user');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
var cryptojs = require('crypto-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config();
 
// Get all users
const getUsers = async (req, res) => {
    try {
        // Filter option
        var optionFilter = parseInt(req.body.option) || 0;
        var search = req.body.search || '';
        var sort_id = req.body.sort_id || 'email';
        var sort = req.body.sort || 'ASC';
        let filter = req.body.filter || {};
        var rowPage = parseInt(req.body.row_page) || 15;
        var pageNumber = parseInt(req.body.page_number) || 1;
        let options = {};

        if(optionFilter == 1) {
            options = {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
                include: [{
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    model: model.roles,
                    as: "roles"
                }],
                where: {
                    [Op.or]: [
                        { email: { [Op.like]: '%'+search+'%' } },
                        { full_name: { [Op.like]: '%'+search+'%' } },
                        { phone_number: { [Op.like]: '%'+search+'%' } },
                        { address: { [Op.like]: '%'+search+'%' } },
                    ]
                },
                offset: (pageNumber-1)*rowPage,
                limit: rowPage,
                order: [[sort_id, sort], ['full_name', 'ASC']],
                subQuery: false
            }
            if(filter.role_uuid) {
                options.where.role_uuid = filter.role_uuid;
            }
        };
        // Find users in database
        await model.users.findAndCountAll(options).then(result => {
            if(optionFilter == 1) {
                result.total_page = Math.ceil(result.count/rowPage);
                result.row_page = rowPage;
                result.page_number = pageNumber;
            }
            return res.status(200).json({
                message: "Data pengguna berhasil diambil",
                data: result,
                access: options
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengambil data pengguna #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengambil data pengguna #1",
            access: false
        });
    }
}
 
// Get user based on uuid
const getUserById = async (req, res) => {
    try {
        // Find user in database
        await model.users.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            include: [{
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                model: model.roles,
                as: "roles"
            }],
            where: { uuid: req.params.uuid }
        }).then(result => {
            if(result) {
                delete result.password;
                return res.status(200).json({
                    message: "Data pengguna berhasil diambil",
                    data: result,
                    access: true
                });
            } else {
                return res.status(400).json({
                    message: "Data pengguna tidak ditemukan",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengambil data pengguna #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengambil data pengguna #1",
            access: false
        });
    }
}
 
// Create new user
const createUser = async (req, res) => {
    try {
        // Required params
        const { errors, isValid } = validateUser(req.body);
        if (!isValid) {
            let valid_error = { messages: errors, access: false }
            return res.status(400).json(valid_error);
        }

        // Check user exist
        await model.users.findOne({
            where: { email: req.body.email }
        })
        .then(async users => {
            if (!users) {
                var crypto_pass = cryptojs.SHA256(req.body.password + process.env.SECRET_KEY).toString();
                var bcrypt_pass = bcrypt.hashSync(crypto_pass, 5);

                // Save user in database
                await model.users.create({
                    uuid: uuidv5(process.env.SECRET_KEY, uuidv4()),
                    email: req.body.email,
                    password: bcrypt_pass,
                    full_name: req.body.full_name,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    photo_url: req.body.photo_url,
                    role_uuid: req.body.role_uuid,
                    is_active: req.body.is_active ? parseInt(req.body.is_active) : undefined
                }).then(result => {
                    return res.status(200).json({
                        message: "Pengguna berhasil dibuat",
                        data: result,
                        access: true
                    });
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat membuat data pengguna #3",
                        access: false
                    });
                });
            } else {
                return res.status(400).json({
                    message: "Email sudah digunakan oleh pengguna lain",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat membuat data pengguna #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat membuat data pengguna #1",
            access: false
        });
    }
}
 
// Update user based on uuid
const updateUser = async (req, res) => {
    try {
        // Required params
        req.body.uuid = req.params.uuid;
        const { errors, isValid } = validateUser(req.body);
        if (!isValid) {
            let valid_error = { messages: errors, access: false }
            return res.status(400).json(valid_error);
        }

        // Check user exist
        await model.users.findOne({
            where: { email: req.body.email }
        }).then(async users => {
            var emailValid = false;
            if (!users) {
                emailValid = true;
            } else {
                emailValid = (users.uuid==req.params.uuid) ? true:false;
            }

            if(emailValid) {
                if(req.body.password) {
                    var crypto_pass = cryptojs.SHA256(req.body.password + process.env.SECRET_KEY).toString();
                    var bcrypt_pass = bcrypt.hashSync(crypto_pass, 5);
                }

                // Update user in database
                await model.users.update({
                    email: req.body.email,
                    password: req.body.password ? bcrypt_pass : undefined,
                    full_name: req.body.full_name,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    photo_url: req.body.photo_url,
                    role_uuid: req.body.role_uuid,
                    is_active: req.body.is_active ? parseInt(req.body.is_active) : undefined
                }, {
                    where: { uuid: req.params.uuid }
                }).then(async result => {
                    if (result) {
                        return res.status(200).json({
                            message: "Data pengguna berhasil diubah",
                            access: true
                        });
                    } else {
                        return res.status(400).json({
                            message: "Data pengguna gagal diubah",
                            access: false
                        });
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat mengubah data pengguna #3",
                        access: false
                    });
                });
            } else {
                return res.status(400).json({
                    message: "Email sudah digunakan oleh pengguna lain",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengubah data pengguna #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengubah data pengguna #1",
            access: false
        });
    }
}
 
// Delete user based on uuid
const deleteUser = async (req, res) => {
    try {
        // Delete user in database
        await model.users.destroy({
            where: { uuid: req.params.uuid }
        }).then(async result => {
            if (result) {
                return res.status(200).json({
                    message: "Data pengguna berhasil dihapus",
                    access: true
                });
            } else {
                return res.status(400).json({
                    message: "Data pengguna gagal dihapus",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat menghapus data pengguna #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat menghapus data pengguna #1",
            access: false
        });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};