const express = require('express');
const auth = require('../middleware/auth.middleware');
const CountsData = require('../models/CountsData');
const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
    try {
      const list = await CountsData.find(); //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })

module.exports = router;
