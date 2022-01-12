const mongoose = require('mongoose');
const Court = require('../../models/sport_centre/sportCourt.model');
const detailCourt = require('../../models/sport_centre/detailCourt.model');
const Place = require('../../models/sport_centre/sportCentre.model');
const User = require('../../models/user/user.model');
const validateDetailcourt = require('../../validation/sport_centre/detailCourt');

// Buat detail lapangan baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateDetailcourt(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Isi data lapangan
            let newSportdetailcourt = new detailCourt({
                court_detailname: req.body.court_detailname
            })

            // Simpan data lapangan
            Place.findOneAndUpdate({
                _id: req.body.placeid
            }, { $push: { 'sport_court.$[i].court': newSportdetailcourt }
            }, { arrayFilters: [{ "i._id": mongoose.Types.ObjectId(req.body.courtid) }], new: true })
            .then(places => {
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        data: places.sport_court.filter( court => court._id == req.body.courtid )
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat simpan data lapangan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan perbaharui data tempat dengan id '" + req.body.placeid + "', '" + req.body.courtid + "'"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data detail lapangan
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Place.findById(req.body.placeid)
            .then(places => {
                try{
                    if (places) {
                        court = places.sport_court.find( c => c._id == req.body.courtid ).court
                        return res.status(202).json({
                            message: 'sukses',
                            data: court
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data tempat kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data lapangan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data lapangan"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data detail lapangan
exports.findAllname = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Place.findById(req.body.placeid)
            .then(places => {
                try{
                    if (places) {
                        // Mendapatkan data lapangan
                        const getDataCourt = async () => {
                            let thisCourts = []
                            await Promise.all(places.sport_court.map(async (sc) => {
                                if (sc.court.length>0){
                                    await Promise.all(sc.court.map(async c =>
                                        thisCourts.push({
                                            placeid: req.body.placeid,
                                            courtid:  sc._id,
                                            detailcourtid: c._id,
                                            court_name: sc.court_name + " " + c.court_detailname,
                                            category: sc.court_cat,
                                            description: sc.description,
                                            price: sc.price,
                                            photo: sc.photo_url,
                                            status: c.status
                                        })
                                    ))
                                }
                            }))
                            return thisCourts
                        }
                        // Meminta dan mengembalikan data lapangan
                        getDataCourt().then(thisCourts => {
                            return res.status(202).json({
                                message: 'sukses',
                                data: thisCourts
                            })
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data tempat kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data lapangan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data lapangan"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data detail lapangan berdasarkan kategori
exports.findAllnamebyCat = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Place.findOne({
                _id: req.body.placeid,
                category: req.body.category
            })
            .then(places => {
                try{
                    if (places) {
                        // Mendapatkan data lapangan
                        const getDataCourt = async () => {
                            let thisCourts = []
                            await Promise.all(places.sport_court.map(async (sc) => {
                                if (sc.court.length>0 && sc.court_cat==req.body.category){
                                    await Promise.all(sc.court.map(async c =>
                                        thisCourts.push({
                                            placeid: req.body.placeid,
                                            courtid:  sc._id,
                                            detailcourtid: c._id,
                                            court_name: sc.court_name + " " + c.court_detailname,
                                            category: sc.court_cat,
                                            description: sc.description,
                                            price: sc.price,
                                            photo: sc.photo_url,
                                            status: c.status
                                        })
                                    ))
                                }
                            }))
                            return thisCourts
                        }
                        // Meminta dan mengembalikan data lapangan
                        getDataCourt().then(thisCourts => {
                            return res.status(202).json({
                                message: 'sukses',
                                data: thisCourts
                            })
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data tempat kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data lapangan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data lapangan"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}