const Schedule = require('../../models/schedule/orderSchedule.model');
const ScheduleCourt = require('../../models/schedule/scheduleCourt.model');
const Place = require('../../models/sport_centre/sportCentre.model');
const User = require('../../models/user/user.model');

// Buat jadwal baru
exports.create = (req, res) => {
    const {
        date,
        month,
        year,
        placeid,
        courtid,
        courtdetailid,
        time
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
                Schedule.findOne({
                    date: date,
                    month: month,
                    year: year
                })
                .then(schedules => {
                    try{
                        if (schedules) {
                            let filterschedule = schedules.schedule.filter( s => s.scheduleid == placeid+":"+courtid+":"+courtdetailid )
                            
                            if (filterschedule.length <= 0) {
                                // Isi data order jadwal
                                let newSchedulecourt= new ScheduleCourt({
                                    scheduleid: placeid+":"+courtid+":"+courtdetailid,
                                    placeid: placeid,
                                    courtid: courtid,
                                    courtdetailid: courtdetailid,
                                    ordertime: ordertime
                                })
                                Schedule.findByIdAndUpdate(schedules._id, {
                                    $push: {
                                        schedule: newSchedulecourt
                                    },
                                    updateAt: Date.now()
                                }, {new: true})
                                .then(sch => {
                                    try{
                                        return res.status(201).json({
                                            message: 'sukses',
                                            data: sch
                                        })
                                    } catch {
                                        return res.status(500).json({
                                            message: "Beberapa kesalahan terjadi saat simpan data jadwal"
                                        });
                                    }
                                }).catch(err => {
                                    return res.status(500).send({
                                        message: "Kesalahan perbaharui data jadwal"
                                    });
                                });
                            } else {
                                Schedule.findByIdAndUpdate(schedules._id, {
                                    $push : { 'schedule.$[i].ordertime': { $each: ordertime } },
                                    updateAt: Date.now()
                                }, { arrayFilters: [
                                    { "i.placeid": placeid, "i.courtid": courtid, "i.courtdetailid": courtdetailid }
                                ], new: true})
                                .then(sch => {
                                    try{
                                        return res.status(201).json({
                                            message: 'sukses',
                                            data: sch
                                        })
                                    } catch {
                                        return res.status(500).json({
                                            message: "Beberapa kesalahan terjadi saat simpan data jadwal"
                                        });
                                    }
                                }).catch(err => {
                                    return res.status(500).send({
                                        message: "Kesalahan perbaharui data jadwal"
                                    });
                                });
                            }
                        } else {
                            // Isi data jadwal
                            let newSchedulesport = new Schedule({
                                date: date,
                                month: month,
                                year: year,
                                timestamp: new Date().valueOf(year, month-1, date)
                            })

                            // Isi data order jadwal
                            let newSchedulecourt= new ScheduleCourt({
                                scheduleid: placeid+":"+courtid+":"+courtdetailid,
                                placeid: placeid,
                                courtid: courtid,
                                courtdetailid: courtdetailid,
                                ordertime: ordertime
                            })

                            // Simpan data jadwal
                            newSchedulesport.save().then(schedule => {
                                Schedule.findByIdAndUpdate(schedule._id, {
                                    $push: {
                                        schedule: newSchedulecourt
                                    },
                                    updateAt: Date.now()
                                }, {new: true})
                                .then(sch => {
                                    try{
                                        return res.status(201).json({
                                            message: 'sukses',
                                            data: sch
                                        })
                                    } catch {
                                        return res.status(500).json({
                                            message: "Beberapa kesalahan terjadi saat simpan data jadwal"
                                        });
                                    }
                                }).catch(err => {
                                    return res.status(500).send({
                                        message: "Kesalahan perbaharui data jadwal"
                                    });
                                });
                            }).catch(err => {
                                return res.status(500).send({
                                    message: err.message || "Beberapa kesalahan terjadi saat membuat data jadwal"
                                });
                            });
                        }
                    } catch {
                        return res.status(500).json({
                            message: "Beberapa kesalahan terjadi saat mengambil data jadwal"
                        })
                    }
                }).catch(err => {
                    return res.status(500).send({
                        message: err.message || "Beberapa kesalahan terjadi saat mengambil data jadwal"
                    })
                })
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat membuat data jadwal"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}

// Mengambil data jadwal lapangan
exports.findSchedule = (req, res) => {
    const {
        date,
        month,
        year,
        placeid,
        courtid,
        courtdetailid
    } = req.body;

    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Place.findById({
                _id: placeid
            })
            .then(places => {
                try{
                    if (places) {
                        Schedule.findOne({
                            date: date,
                            month: month,
                            year: year
                        })
                        .then(schedules => {
                            try{
                                if (schedules) {
                                    let filterschedule = schedules.schedule.filter( s => s.scheduleid == placeid+":"+courtid+":"+courtdetailid )
                                    if ( filterschedule.length > 0 ){
                                        getTimes = async () => { 
                                            let ordertime = []
                                            await Promise.all(filterschedule.map(async fs => {
                                                await fs.ordertime.map(async t => {
                                                    let timeorder = new Date(t).getHours()
                                                    ordertime.push(timeorder==0?24:timeorder)
                                                })
                                            }))
                                            return ordertime
                                        }
                                        getTimes().then( ordertime => {
                                            let scday = new Date(year, month-1, date).getDay()
                                            let opened = new Date(places.schedule['day' + scday.toString()].open).getHours()
                                            let closed = new Date(places.schedule['day' + scday.toString()].close).getHours()
                                            return res.status(202).json({
                                                message: 'sukses',
                                                data: {
                                                    ordertime: ordertime,
                                                    timestamp: schedules.timestamp,
                                                    scheduleplace: {
                                                        open: opened==0?24:opened,
                                                        close: closed==0?24:closed,
                                                        status: places.schedule['day' + scday.toString()].status
                                                    },
                                                    holiday: places.schedule.holiday
                                                }
                                            })
                                        })
                                    } else {
                                        return res.status(202).json({
                                            message: 'sukses',
                                            data: {
                                                ordertime: [],
                                                timestamp: schedules.timestamp,
                                                scheduleplace: places.schedule
                                            }
                                        })
                                    }
                                } else {
                                    return res.status(202).json({
                                        message: 'sukses',
                                        data: {
                                            ordertime: [],
                                            timestamp: 0,
                                            scheduleplace: places.schedule
                                        }
                                    })
                                }
                            } catch {
                                return res.status(500).json({
                                    message: "Beberapa kesalahan terjadi saat mengambil data jadwal"
                                });
                            }
                        }).catch(err => {
                            return res.status(500).send({
                                message: err.message || "Beberapa kesalahan terjadi saat mengambil data jadwal"
                            });
                        });
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data tempat kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mengambil data jadwal tempat"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data jadwal tempat"
                });
            });
        } else {
            return res.status(400).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
}