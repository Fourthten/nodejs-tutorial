// Import module
const express = require('express');
const middleware = require('../../../middleware/checkToken');
var multer  = require('multer');
var upload = multer({ dest: 'public/images/avatar/' });

// Import Controller User
const { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../../../controllers/user.controller");
 
// Init variable
const router = express.Router();

router.get('/user', middleware, getUsers); /* Route get all roles */
router.get('/user/:uuid', middleware, getUserById); /* Route get role based on uuid */
router.post('/user', middleware, upload.single('user_photo'), createUser); /* Route create new role */
router.put('/user/:uuid', middleware, upload.single('user_photo'), updateUser); /* Route update role based on uuid */
router.delete('/user/:uuid', middleware, deleteUser); /* Route delete role based on uuid */
 
// Export router
module.exports = router;