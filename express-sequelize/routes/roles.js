const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const roles = await model.roles.findAll({
        attributes: ['role_id', 'role_name'],
        order: [
            ['role_name', 'ASC']
        ]
      });
      if (roles.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': roles
        })
      } else {
        res.json({
          'status': 'EMPTY',
          'data': {}
        })
      }
    } catch (err) {
        res.json({
          'status': 'ERROR' + err.messages,
          'data': {}
      })
    }
});

module.exports = router;