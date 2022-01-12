const express = require('express');
const router = express.Router();
const model = require('../models/index');

router.get('/', async function(req, res, next) {
    try {
      const categories = await model.categories.findAll({
        attributes: ['category_id', 'category_name'],
        order: [
            ['category_name', 'ASC']
        ]
      });
      if (categories.length !== 0) {
        res.json({
          'status': 'SUCCESS',
          'data': categories
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