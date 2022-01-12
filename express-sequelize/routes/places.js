const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const places = await model.places.findAll({
        attributes: ['place_id', 'place_name'],
        include: [{
            model: model.categories,
            attributes: ['category_name']
        }],
        order: [
            ['place_name', 'ASC']
        ]
      });
      if (places.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': places
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