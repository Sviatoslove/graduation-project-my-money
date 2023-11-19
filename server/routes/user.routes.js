const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await Userы.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);

    } else {
      res.status(401).json({error: {message: 'Вы не авторизованы!', code:401} });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        error: {
          message: 'На сервере произошла ошибка. Профиль не обновлён. Попробуйте позже.',
          code: 500,
        },
      });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const list = await User.findOne({ _id: userId });
    res.send(list);
  } catch (e) {
    res
      .status(500)
      .json({
        error: {
          message: 'На сервере произошла ошибка. Данные профиля не загружены. Попробуйте позже.',
          code: 500,
        },
      });
  }
});

module.exports = router;
