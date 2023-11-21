const express = require('express');
const auth = require('../middleware/auth.middleware');
const AvatarsData = require('../models/AvatarsData');

const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
    try {
      const list = await AvatarsData.find();
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({error: { message: 'На сервере произошла ошибка. Попробуйте позже.', code: 500} });
    }
  })

  module.exports = router;