const express = require('express');
const auth = require('../middleware/auth.middleware');
const IconsForCategoriesData = require('../models/IconsForCategoriesData');
const router = express.Router({ mergeParams: true });

router
.route('/').get(auth, async (req, res) => {
  try {
    const list = await IconsForCategoriesData.find(); //получаем список всех комментариев
    res.send(list); // отправили их на клиента с статус кодом 200
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
  
})
.patch(auth, async (req, res) => {
  try {
      const updatedIcon = await IconsForCategoriesData.findByIdAndUpdate(req.body._id, req.body, {
        new: true, // этот флаг означает, что мы получаем обновлённые данные только после того, как они обновятся в БД, чтобы в этой константе на клиента не ушли старые данные
      });
      res.send(updatedIcon);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
});

module.exports = router;
