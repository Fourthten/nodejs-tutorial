const Transaction = require('../../models/transaction/transaction.model');
const Detailplace = require('../../models/transaction/detailPlace.model');
const User = require('../../models/user/user.model');
const validateTrans = require('../../validation/transaction/transaction');

// Buat transaksi baru
exports.create = (req, res) => {
    const {
        errors,
        isValid
    } = validateTrans(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        bookingname,
        bookingphone,
        note,
        ownerid,
        placeid,
        date,
        month,
        year,
        pricetotal,
        courtid,
        detailcourtid,
        time,
        courtname,
        price
    } = req.body;

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            getTimes = async () => { 
                let ordertime = []
                await Promise.all(time.map(async t => {
                    let timeorder = t<=7?new Date(1970, 0, 2, t).valueOf():new Date(1970, 0, 1, t).valueOf()
                    ordertime.push(timeorder)
                }))
                return ordertime
            }
            getTimes().then( ordertime => {
                // Isi detail tempat
                let newDetailplace = new Detailplace({
                    courtorderid: courtid+":"+detailcourtid,
                    courtid: courtid,
                    detailcourtid: detailcourtid,
                    time: ordertime,
                    courtname: courtname,
                    price: price
                })

                // Isi data transaksi
                let newTransaction = new Transaction({
                    customer: {
                        userid: user._id,
                        booking_name: bookingname,
                        booking_phone: bookingphone,
                        note: note,
                    },
                    owner: {
                        userid: ownerid,
                        placeid: placeid,
                    },
                    court: [newDetailplace],
                    booking_date: new Date().valueOf(year, month-1, date),
                    price_total: pricetotal,
                    status: "uncompleted",
                    timestamp: new Date().valueOf(),
                })

                // Simpan data transaksi
                newTransaction.save().then(trans => {
                    return res.status(201).json({
                        message: 'sukses',
                        data: trans
                    })
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat membuat data transaksi"
                    });
                });
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat membuat data transaksi"
                });
            })
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data transaksi berdasarkan pelanggan
exports.findbyuserId = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Transaction.find({
                'customer.userid': user._id
            })
            .then(trans => {
                try{
                    if (trans.length !== 0) {
                        return res.status(202).json({
                            message: 'sukses',
                            data: trans
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
                        message: "Beberapa kesalahan terjadi saat mengambil data transaksi"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data transaksi"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}