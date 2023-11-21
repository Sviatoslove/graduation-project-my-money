const express = require('express');
const auth = require('../middleware/auth.middleware');
const IconsForCategoriesData = require('../models/IconsForCategoriesData');
const router = express.Router({ mergeParams: true });

router
.route('/').get(auth, async (req, res) => {
  try {
    const list = await IconsForCategoriesData.find();
    res.send(list);
  } catch (e) {
    res
      .status(500)
      .json({error: { message: 'На сервере произошла ошибка. Иконки для категорий не загружены. Попробуйте позже.', code:500} });
  }
  
})

module.exports = router;
