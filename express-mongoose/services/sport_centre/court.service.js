const Court = require('../../models/sport_centre/sportCourt.model');
const Place = require('../../models/sport_centre/sportCentre.model');
const User = require('../../models/user/user.model');
const validateCourt = require('../../validation/sport_centre/court');

// Buat lapangan baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateCourt(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Isi data lapangan
            let newSportcourt = new Court({
                court_name: req.body.court_name,
                court_cat: req.body.court_cat,
                description: req.body.description,
                price: req.body.price
            })

            // Simpan data lapangan
            Place.findByIdAndUpdate(req.params.placeId, {
                $push: { 
                    sport_court: newSportcourt 
                },
                $addToSet: { 
                    category: req.body.court_cat
                },
                updateAt: Date.now()
            }, {new: true})
            .then(places => {
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        data: {
                            _id: places._id,
                            sportcentre_name: places.sportcentre_name,
                            category: places.category,
                            sport_court: places.sport_court,
                            createdAt: places.createdAt,
                            updateAt: places.updateAt
                        }
                    })
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat simpan data lapangan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: "Kesalahan perbaharui data tempat dengan id '" + req.params.placeId + "'"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data lapangan
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Place.findById(req.params.placeId)
            .then(places => {
                try{
                    if (places) {
                        return res.status(202).json({
                            message: 'sukses',
                            data: places.sport_court
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