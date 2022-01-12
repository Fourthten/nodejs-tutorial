const Chatroom = require('../../models/chat/chatroom.model');
const User = require('../../models/user/user.model');

// Mengambil semua data ruang obrolan tertentu dari basis data
exports.findAll = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            // Mencari ruang obrolan
            Chatroom.find({
                members: user._id
            })
            .then(async chatrooms => {
                try{
                    if (chatrooms.length !== 0) {
                        // Mendapatkan nama pengguna
                        const getUser = async userid => {
                            return User.findOne({
                                _id: userid
                            })
                            .then(users => {
                                if (users) {
                                    return users.name
                                } else {
                                    return "Beberapa kesalahan terjadi saat mencari data pengguna"
                                }
                            }).catch(err => {
                                return "Beberapa kesalahan terjadi saat mencari data pengguna"
                            });
                        }
                        // Mendapatkan obrolan
                        const getChat = async chatroom => {
                            let sortTime = chatroom.messages.sort((b,a) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)).filter( (c, i) => i===0 )
                            let useridChat = chatroom.members.filter( userid => !userid.includes(user._id) )
                            let fullName = await getUser(useridChat.toString())
                            chatroomdata = {
                                _id: chatroom._id,
                                userid: useridChat.toString(),
                                full_name: fullName,
                                last_message: sortTime.map(a => a.message).toString(),
                                last_time: sortTime.map(a => a.timestamp).toString(),
                                createdAt: chatroom.createdAt,
                                updateAt: chatroom.updateAt
                            }
                            return chatroomdata
                        }
                        // Mendapatkan data ruang obrolan
                        const getDataChat = async () => {
                            return await Promise.all(chatrooms.map(async chatroom => 
                                await getChat(chatroom).then(chatroomdata => {
                                    return chatroomdata
                                })
                            ))
                        }
                        // Meminta dan mengembalikan data obrolan
                        getDataChat().then(datachatrooms => {
                            let sorttimeChatroom = datachatrooms.sort((b,a) => (a.last_time > b.last_time) ? 1 : ((b.last_time > a.last_time) ? -1 : 0))
                            return res.status(202).json({
                                message: 'sukses',
                                data: sorttimeChatroom
                            })
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
                        message: "Beberapa kesalahan terjadi saat mengambil data ruang obrolan"
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Beberapa kesalahan terjadi saat mengambil data ruang obrolan"
                });
            });
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};