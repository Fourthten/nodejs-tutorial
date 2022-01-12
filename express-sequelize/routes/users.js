const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const users = await model.users.findAll({
        include: [{
            model: model.roles,
            as: "roles",
            attributes: ['role_name']
        }],
        order: [
            ['full_name', 'ASC']
        ]
      });
      if (users.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': users
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