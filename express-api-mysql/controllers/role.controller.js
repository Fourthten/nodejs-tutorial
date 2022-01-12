// Import module
const model = require('../models/index');
const validateRole = require('../validation/source/role');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config();
 
// Get all roles
const getRoles = async (req, res) => {
    try {
        // Filter option
        var optionFilter = parseInt(req.body.option) || 0;
        var search = req.body.search || '';
        var sort_id = req.body.sort_id || 'code';
        var sort = req.body.sort || 'ASC';
        var rowPage = parseInt(req.body.row_page) || 15;
        var pageNumber = parseInt(req.body.page_number) || 1;
        let options = {};

        if(optionFilter == 1) {
            options = {
                where: {
                    [Op.or]: [
                        { code: { [Op.like]: '%'+search+'%' } },
                        { name: { [Op.like]: '%'+search+'%' } }
                    ]
                },
                offset: (pageNumber-1)*rowPage,
                limit: rowPage,
                order: [[sort_id, sort], ['name', 'ASC']],
                subQuery: false
            }
        };
        // Find roles in database
        await model.roles.findAndCountAll(options).then(result => {
            if(optionFilter == 1) {
                result.total_page = Math.ceil(result.count/rowPage);
                result.row_page = rowPage;
                result.page_number = pageNumber;
            }
            return res.status(200).json({
                message: "Data peran berhasil diambil",
                data: result,
                access: true
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengambil data peran #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengambil data peran #1",
            access: false
        });
    }
}
 
// Get role based on uuid
const getRoleById = async (req, res) => {
    try {
        // Find role in database
        await model.roles.findOne({
            where: { uuid: req.params.uuid }
        }).then(result => {
            if(result) {
                return res.status(200).json({
                    message: "Data peran berhasil diambil",
                    data: result,
                    access: true
                });
            } else {
                return res.status(400).json({
                    message: "Data peran tidak ditemukan",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengambil data peran #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengambil data peran #1",
            access: false
        });
    }
}
 
// Create new role
const createRole = async (req, res) => {
    try {
        // Required params
        const { errors, isValid } = validateRole(req.body);
        if (!isValid) {
            let valid_error = { messages: errors, access: false }
            return res.status(400).json(valid_error);
        }

        // Check role exist
        await model.roles.findOne({
            where: { code: req.body.code }
        })
        .then(async roles => {
            if (!roles) {
                // Save role in database
                await model.roles.create({
                    uuid: uuidv5(process.env.SECRET_KEY, uuidv4()),
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    is_active: req.body.is_active ? parseInt(req.body.is_active) : undefined
                }).then(result => {
                    return res.status(200).json({
                        message: "Peran berhasil dibuat",
                        data: result,
                        access: true
                    });
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat membuat data peran #3",
                        access: false
                    });
                });
            } else {
                return res.status(400).json({
                    message: "Kode sudah digunakan oleh peran lain",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat membuat data peran #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat membuat data peran #1",
            access: false
        });
    }
}
 
// Update role based on uuid
const updateRole = async (req, res) => {
    try {
        // Required params
        const { errors, isValid } = validateRole(req.body);
        if (!isValid) {
            let valid_error = { messages: errors, access: false }
            return res.status(400).json(valid_error);
        }

        // Check role exist
        await model.roles.findOne({
            where: { code: req.body.code }
        }).then(async roles => {
            var codeValid = false;
            if (!roles) {
                codeValid = true;
            } else {
                codeValid = (roles.uuid==req.params.uuid) ? true:false;
            }

            if(codeValid) {
                // Update role in database
                await model.roles.update({
                    code: req.body.code, 
                    name: req.body.name,
                    description: req.body.description,
                    is_active: req.body.is_active ? parseInt(req.body.is_active) : undefined
                }, {
                    where: { uuid: req.params.uuid }
                }).then(async result => {
                    if (result) {
                        return res.status(200).json({
                            message: "Data peran berhasil diubah",
                            access: true
                        });
                    } else {
                        return res.status(400).json({
                            message: "Data peran gagal diubah",
                            access: false
                        });
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat mengubah data peran #3",
                        access: false
                    });
                });
            } else {
                return res.status(400).json({
                    message: "Kode sudah digunakan oleh peran lain",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengubah data peran #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat mengubah data peran #1",
            access: false
        });
    }
}
 
// Delete role based on uuid
const deleteRole = async (req, res) => {
    try {
        // Delete role in database
        await model.roles.destroy({
            where: { uuid: req.params.uuid }
        }).then(async result => {
            if (result) {
                return res.status(200).json({
                    message: "Data peran berhasil dihapus",
                    access: true
                });
            } else {
                return res.status(400).json({
                    message: "Data peran gagal dihapus",
                    access: false
                });
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat menghapus data peran #2",
                access: false
            });
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Beberapa kesalahan terjadi saat menghapus data peran #1",
            access: false
        });
    }
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};