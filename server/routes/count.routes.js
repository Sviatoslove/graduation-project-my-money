const express = require('express');
const auth = require('../middleware/auth.middleware');
const Count = require('../models/Count');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Count.find();
      const list = listAll.filter(
        (count) => String(count.userId) === req.user._id
      ); //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res.status(500).json({
        error: {
          message: 'На сервере произошла ошибка. Счета не загрузились. Попробуйте позже.',
          code: 500,
        },
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCount = await Count.create({
        // ждём пока создадим комментарий
        ...req.body, // здесь у нас прилетают все необходимые данные
        userId: req.user._id, // добавляем здесь id, т.к. у нас в модели коммента есть userId
        like: false,
        balance: 0,
      });
      res.status(201).send(newCount); // отправляем созданный коммент со статусом 201(что-то создано) на клиента
    } catch (e) {
      res.status(500).json({
        error: {
          message: 'На сервере произошла ошибка. Счет не создан. Попробуйте позже.',
          code: 500,
        },
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const updatedCount = await Count.findByIdAndUpdate(
        req.body._id,
        req.body,
        {
          new: true, // этот флаг означает, что мы получаем обновлённые данные только после того, как они обновятся в БД, чтобы в этой константе на клиента не ушли старые данные
        }
      );
      res.send(updatedCount);
    } catch (e) {
      res.status(500).json({
        error: {
          message: 'На сервере произошла ошибка. Счет не обновлён. Попробуйте позже.',
          code: 500,
        },
      });
    }
  });

router.delete('/:countId', auth, async (req, res) => {
  try {
    const { countId } = req.params; // получаем параметр commentId
    //const removedComment = await Comment.find({ _id: commentId }) или ===>>>
    const removedCount = await Count.findById(countId); // найдём комментарий который нужно удалить
    await removedCount.deleteOne(); // ждём пока удалится коммент
    return res.send(null); // можем вернуть null, т.к. на фронте мы ничего не ждём
  } catch (e) {
    res.status(500).json({
      error: {
        message: 'На сервере произошла ошибка. Счет не удалён. Попробуйте позже.',
        code: 500,
      },
    });
  }
});

module.exports = router;
