const Place = require('../../models/sport_centre/sportCentre.model');
const User = require('../../models/user/user.model');
const validateAddress = require('../../validation/sport_centre/address');
const validateClosestdistance = require('../../validation/sport_centre/findDistance');

// Buat alamat baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateAddress(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            const lat = req.body.latitude
            const lng = req.body.longitude
            // Simpan data lapangan
            Place.findByIdAndUpdate(req.body.placeid, {
                address: { 
                    coordinate: [lng, lat],
                    location: {
                        lat: lat,
                        lng: lng
                    },
                    postal_code: req.body.postal_code,
                    village: req.body.village,
                    subdistrict: req.body.subdistrict,
                    city: req.body.city,
                    province: req.body.province,
                    country: req.body.country,
                    formatted_address: req.body.formatted_address
                },
                updateAt: Date.now()
            }, {new: true})
            .then(places => {
                try{
                    return res.status(201).json({
                        message: 'sukses',
                        data: places
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

// Mengambil data lokasi terdekat
exports.findDistance = (req, res) => {
    const {
        errors,
        isValid
    } = validateClosestdistance(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            let coords = [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            // Mencari lokasi terdekat
            Place.find({
                category: req.body.category,
                'address.coordinate': {
                    $near: {
                        $geometry : {
                            type: 'Point',
                            // [ lng, lat ]
                            coordinates: coords
                        },
                        $maxDistance : 20000
                    }
                },
                status: true
            })
            .then(places => {
                try{
                    if (places.length !== 0) {
                        let lat = req.body.latitude
                        let lng = req.body.longitude

                        // Mendapatkan jarak
                        const getDistance = async loc => {
                            let radlat1 = Math.PI * lat/180
                            let radlat2 = Math.PI * loc.lat/180
                            let theta = lng-loc.lng
                            let radtheta = Math.PI * theta/180
                            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
                            if (dist > 1) {
                                dist = 1
                            }
                            dist = Math.acos(dist)
                            dist = dist * 180/Math.PI
                            dist = dist * 60 * 1.1515 // Statute miles
                            dist = dist * 1.609344 // KM
                            // dist = dist * 0.8684 // Nautical miles
                            return dist
                        }
                        // Mendapatkan tempat
                        const getPlaces = async p => {
                            let distance = await getDistance(p.address.location)
                            let totalCourt = await p.sport_court.length==0?0:p.sport_court.reduce( (tot, {court}) => tot + court.length,0 )
                            let ratings = parseFloat(p.rating.filter( r => r.total!=undefined).map( r => r.total ).toString())
                            let myliked = p.like.indexOf(req.decoded.user._id)!=-1
                            let thisPlaces = {
                                placeid: p._id,
                                userid: p.userid,
                                sportname: p.sportcentre_name,
                                category: p.category,
                                facility: p.facility,
                                address: p.address,
                                photo: p.photo_url,
                                line_distance: parseFloat(distance.toFixed(2)),
                                rating: parseFloat(ratings).toFixed(1),
                                like: p.like.length,
                                liked: myliked,
                                qty_court: totalCourt,
                                schedule: p.schedule,
                                status: p.status
                            }
                            return thisPlaces
                        }
                        // Mendapatkan data tempat
                        const getDataPlaces = async () => {
                            return await Promise.all(places.map(async p => 
                                await getPlaces(p).then(thisPlaces => {
                                    return thisPlaces
                                })
                            ))
                        }
                        // Meminta dan mengembalikan data tempat
                        getDataPlaces().then(thisPlaces => {
                            return res.status(202).json({
                                message: 'sukses',
                                data: thisPlaces
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
                        message: "Beberapa kesalahan terjadi saat mengambil data tempat"
                    })
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data tempat"
                })
            })
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            })
        }
    })
}