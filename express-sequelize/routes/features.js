const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const features = await model.features.findAll({
        attributes: ['feature_id', 'feature_name'],
        order: [
            ['feature_name', 'ASC']
        ]
      });
      if (features.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': features
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