const User = require('../../models/user/user.model');

// Mengambil data user tertentu
exports.FindbyId = (req, res) => {
    User.findById({
        _id: req.decoded._id
    })
    .then(user => {
        if (user) {
            return res.status(202).json({
                message: 'sukses',
                data: user
            })
        } else {
            return res.status(401).json({
                message: 'Mohon masuk kembali'
            });
        }
    })
};