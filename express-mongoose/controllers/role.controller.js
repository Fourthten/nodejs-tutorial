const Role = require('../models/source/role.model');
const User = require('../models/user/user.model');
const validateRole = require('../validation/source/role');

// Buat peran baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateRole(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Role.findById({
                _id: req.body.role_name.toLowerCase()
            })
            .then(roles => {
                if (!roles) {
                    // Isi data peran
                    let role = new Role({
                        _id: req.body.role_name.toLowerCase(), 
                        role_name: req.body.role_name,
                        description: req.body.description
                    });

                    // Simpan peran di basis data
                    role.save().then(roledata => {
                        return res.status(201).json({
                            message: 'sukses',
                            data: roledata
                        })
                    }).catch(err => {
                        return res.status(500).send({
                            message: err.message || "Beberapa kesalahan terjadi saat membuat data peran"
                        });
                    });
                } else {
                    return res.status(400).json({
                        message: 'Nama sudah digunakan sebagai id peran'
                    });
                }
            })
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Mengambil semua data peran dari basis data
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Role.find()
            .then(roles => {
                try{
                    if (roles.length !== 0) {
                        return res.status(202).json({
                            message: 'sukses',
                            data: roles
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data peran kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data peran"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data peran"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Mengambil data peran tertentu
exports.findOne = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Role.findById(req.params.roleId)
            .then(roles => {
                if(!roles) {
                    return res.status(404).send({
                        message: "Data peran tidak ditemukan dengan id '" + req.params.roleId + "'"
                    });            
                }
                try{
                    return res.status(202).json({
                        message: 'sukses',
                        data: roles
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data peran"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan mengambil data peran dengan id '" + req.params.roleId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Perbaharui data peran tertentu
exports.update = (req, res) => {
    const {
        errors,
        isValid
    } = validateRole(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Perbaharui data peran
            Role.findByIdAndUpdate(req.params.roleId, {
                role_name: req.body.role_name,
                description: req.body.description,
                updateAt: Date.now()
            }, {new: true})
            .then(roles => {
                if(!roles) {
                    return res.status(404).send({
                        message: "Data peran tidak ditemukan dengan id '" + req.params.roleId + "'"
                    });
                }
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        data: roles
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat perbaharui data peran"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan perbaharui data peran dengan id '" + req.params.roleId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Menghapus data peran tertentu
exports.delete = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // hapus peran tertentu
            Role.findByIdAndRemove(req.params.roleId)
            .then(roles => {
                if(!roles) {
                    return res.status(404).send({
                        message: "Data peran tidak ditemukan dengan id '" + req.params.roleId + "'"
                    });
                }
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        status: "Data peran berhasil di hapus"
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat menghapus data peran"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan menghapus data peran dengan id '" + req.params.roleId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};