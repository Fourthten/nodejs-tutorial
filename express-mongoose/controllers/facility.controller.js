const Facility = require('../models/source/facility.model');
const User = require('../models/user/user.model');
const validateFacility = require('../validation/source/facility');

// Buat fasilitas baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateFacility(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Facility.findById({
                _id: req.body.facility_name.toLowerCase()
            })
            .then(facilities => {
                if (!facilities) {
                    // Isi data fasilitas
                    let facility = new Facility({
                        _id: req.body.facility_name.toLowerCase(), 
                        facility_name: req.body.facility_name
                    });

                    // Simpan fasilitas di basis data
                    facility.save().then(facilitydata => {
                        return res.status(201).json({
                            message: 'sukses',
                            data: facilitydata
                        })
                    }).catch(err => {
                        return res.status(500).send({
                            message: err.message || "Beberapa kesalahan terjadi saat membuat data fasilitas"
                        });
                    });
                } else {
                    return res.status(400).json({
                        message: 'Nama sudah digunakan sebagai id fasilitas'
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

// Mengambil semua data fasilitas dari basis data
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Facility.find()
            .then(facilities => {
                try{
                    if (facilities.length !== 0) {
                        return res.status(202).json({
                            message: 'sukses',
                            data: facilities
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data fasilitas kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data fasilitas"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data fasilitas"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Mengambil semua data fasilitas yang aktif
exports.findUsed = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Facility.find({
                status: true
            })
            .then(facilities => {
                try{
                    if (facilities.length !== 0) {
                        return res.status(202).json({
                            message: 'sukses',
                            data: facilities
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data fasilitas kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data fasilitas"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data fasilitas"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Mengambil data fasilitas tertentu
exports.findOne = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Facility.findById(req.params.facilityId)
            .then(facilities => {
                if(!facilities) {
                    return res.status(404).send({
                        message: "Data fasilitas tidak ditemukan dengan id '" + req.params.facilityId + "'"
                    });            
                }
                try{
                    return res.status(202).json({
                        message: 'sukses',
                        data: facilities
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data fasilitas"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan mengambil data fasilitas dengan id '" + req.params.facilityId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Perbaharui data fasilitas tertentu
exports.update = (req, res) => {
    const {
        errors,
        isValid
    } = validateFacility(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Perbaharui data fasilitas
            Facility.findByIdAndUpdate(req.params.facilityId, {
                facility_name: req.body.facility_name,
                updateAt: Date.now()
            }, {new: true})
            .then(facilities => {
                if(!facilities) {
                    return res.status(404).send({
                        message: "Data fasilitas tidak ditemukan dengan id '" + req.params.facilityId + "'"
                    });
                }
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        data: facilities
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat perbaharui data fasilitas"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan perbaharui data fasilitas dengan id '" + req.params.facilityId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Menghapus data fasilitas tertentu
exports.delete = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Perbaharui data fasilitas
            Facility.findByIdAndUpdate(req.params.facilityId, {
                status: false,
                updateAt: Date.now()
            }, {new: true})
            .then(facilities => {
                if(!facilities) {
                    return res.status(404).send({
                        message: "Data fasilitas tidak ditemukan dengan id '" + req.params.facilityId + "'"
                    });
                }
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        status: "Data fasilitas berhasil di hapus"
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat menghapus data fasilitas"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan menghapus data fasilitas dengan id '" + req.params.facilityId + "'"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};