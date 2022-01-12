const Chatroom = require('../../models/chat/chatroom.model');
const Chat = require('../../models/chat/chat.model');
const User = require('../../models/user/user.model');

// Buat obrolan baru
exports.create = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Chatroom.findOne({
                members: { $in: req.body.users.map(member => member) }
            })
            .then(chatrooms => {
                try{
                    if (chatrooms) {
                        // Isi data obrolan
                        let chat = new Chat({
                            user: user._id,
                            message: req.body.message,
                            status: "sent",
                            timestamp: Date.now().valueOf()
                        })

                        // Perbaharui data obrolan
                        Chatroom.findByIdAndUpdate(chatrooms._id, {
                            $push: { messages: chat },
                            updateAt: Date.now()
                        }, {new: true})
                        .then(chats => {
                            try{
                                return res.status(201).json({
                                    message: 'sukses',
                                    data: chats
                                })
                            } catch {
                                return res.status(500).json({
                                    message: "Beberapa kesalahan terjadi saat perbaharui data obrolan"
                                });
                            }
                        }).catch(err => {
                            return res.status(500).send({
                                message: "Kesalahan perbaharui data obrolan dengan id '" + chatrooms._id + "'"
                            });
                        });
                    } else {
                        // Isi data obrolan
                        let chat = new Chat({
                            user: user._id,
                            message: req.body.message,
                            status: "sent",
                            timestamp: Date.now().valueOf()
                        })

                        // Isi data ruang obrolan
                        let chatroom = new Chatroom({
                            members: req.body.users,
                            messages: [chat]
                        });

                        // Simpan obrolan di basis data
                        chatroom.save().then(chatroomdata => {
                            return res.status(201).json({
                                message: 'sukses',
                                data: chatroomdata
                            })
                        }).catch(err => {
                            return res.status(500).send({
                                message: err.message || "Beberapa kesalahan terjadi saat membuat data obrolan"
                            });
                        });
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mencari data obrolan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mencari data obrolan"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};

// Mendapatkan data obrolan
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            Chatroom.findById(req.params.chatId)
            .then(chatrooms => {
                try{
                    if (chatrooms) {
                        let sortTime = chatrooms.messages.sort((b,a) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))
                        return res.status(202).json({
                            message: 'sukses',
                            data: sortTime
                        })
                    } else {
                        return res.status(404).json({
                            message: 'sukses',
                            status: 'Data ruang obrolan kosong',
                            data: []
                        })
                    }
                } catch {
                    return res.status(500).json({
                        message: "Beberapa kesalahan terjadi saat mencari data obrolan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mencari data obrolan"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};