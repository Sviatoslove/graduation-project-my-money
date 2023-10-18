const express = require('express');
const auth = require('../middleware/auth.middleware');
const Count = require('../models/Count');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Count.find({ [orderBy]: equalTo }); //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCount = await Count.create({// ждём пока создадим комментарий
        ...req.body, // здесь у нас прилетают все необходимые данные
        userId: req.user._id// добавляем здесь id, т.к. у нас в модели коммента есть userId
      })
      res.status(201).send(newCount)// отправляем созданный коммент со статусом 201(что-то создано) на клиента
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  });

router.delete('/:countId', auth, async (req, res) => {
  try {
    const { countId } = req.params// получаем параметр commentId
    //const removedComment = await Comment.find({ _id: commentId }) или ===>>>
    const removedCount = await Count.findById(countId) // найдём комментарий который нужно удалить
    if(removedCount.userId.toString() === req.user._id) {// проверить, а можем ли мы удалять комментарий, т.к. его может удалять только тот пользователь который его оставлял
      await removedCount.deleteOne()// ждём пока удалится коммент
      return res.send(null)// можем вернуть null, т.к. на фронте мы ничего не ждём
    }else {// иначе отправляем ошибку авторизации
      return res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
});

module.exports = router;
