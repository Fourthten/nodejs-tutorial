const Place = require('../../models/sport_centre/sportCentre.model');
const User = require('../../models/user/user.model');

// Menyukai tempat
exports.likePlace = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            if (req.body.liked == false){
                // Menyukai tempat
                Place.findByIdAndUpdate(req.body.placeid, {
                    $addToSet: { like: req.decoded.user._id }
                }, {new: true})
                .then(places => {
                    if(!places) {
                        return res.status(404).send({
                            message: "Data tempat tidak ditemukan"
                        });
                    }
                    try{
                        let myliked = places.like.indexOf(req.decoded.user._id)!=-1
                        return res.status(201).json({
                            message: 'sukses',
                            data: {
                                placeid: places._id,
                                sportcentre_name: places.sportcentre_name,
                                like: places.like,
                                liked: myliked
                            }
                        })
                    } catch {
                        return res.status(500).json({
                            message: "Beberapa kesalahan terjadi saat menyukai tempat"
                        });
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: "Kesalahan saat menyukai tempat"
                    });
                });
            } else {
                // Tidak menyukai tempat
                Place.findByIdAndUpdate(req.body.placeid, {
                    $pull: { like: req.decoded.user._id }
                }, {new: true})
                .then(places => {
                    if(!places) {
                        return res.status(404).send({
                            message: "Data tempat tidak ditemukan"
                        });
                    }
                    try{
                        let myliked = places.like.indexOf(req.decoded.user._id)!=-1
                        return res.status(201).json({
                            message: 'sukses',
                            data: {
                                placeid: places._id,
                                sportcentre_name: places.sportcentre_name,
                                like: places.like,
                                liked: myliked
                            }
                        })
                    } catch {
                        return res.status(500).json({
                            message: "Beberapa kesalahan terjadi saat menyukai tempat"
                        });
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: "Kesalahan saat menyukai tempat"
                    });
                });
            }
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}