const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const accesses = await model.accesses.findAll({
        attributes: ['access_id', 'role_id', 'feature_id'],
        include: [{
            model: model.roles,
            as: "roles",
            attributes: ['role_name']
        }, {
            model: model.features,
            as: "features",
            attributes: ['feature_name']
        }],
        order: [
            ['access_id', 'ASC']
        ]
      });
      if (accesses.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': accesses
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