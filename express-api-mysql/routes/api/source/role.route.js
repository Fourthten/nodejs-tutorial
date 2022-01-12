// Import module
const express = require('express');
const middleware = require('../../../middleware/checkToken');

// Import Controller Role
const { 
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} = require("../../../controllers/role.controller");
 
// Init variable
const router = express.Router();

router.get('/role', middleware, getRoles); /* Route get all roles */
router.get('/role/:uuid', middleware, getRoleById); /* Route get role based on uuid */
router.post('/role', middleware, createRole); /* Route create new role */
router.put('/role/:uuid', middleware, updateRole); /* Route update role based on uuid */
router.delete('/role/:uuid', middleware, deleteRole); /* Route delete role based on uuid */
 
// Export router
module.exports = router;