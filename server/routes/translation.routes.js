const express = require('express');
const auth = require('../middleware/auth.middleware');
const Translation = require('../models/Translation');
const Count = require('../models/Count')
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Count.find();
      const list = listAll.filter((count) => String(count.userId) === req.user._id);; //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userId = req.user._id
      const newTranslation = await Translation.create({
        // ждём пока создадим комментарий
        ...req.body, // здесь у нас прилетают все необходимые данные
        userId: userId, // добавляем здесь id, т.к. у нас в модели коммента есть userId
      });
      //Получаем счёт из которого после вычитаем перевод
      const {fromCount,toCount,balanceFrom,balanceTo} = newTranslation
      if(fromCount !== '0') {
        const countFrom = await Count.findById(fromCount)
        countFrom.balance = Number(countFrom.balance) - Number(balanceFrom)
        await Count.findByIdAndUpdate(fromCount, countFrom)
      }
        const countTo = await Count.findById(toCount)
        countTo.balance = Number(countTo.balance) + Number(balanceTo)
        await Count.findByIdAndUpdate(toCount, countTo)
      

      const listAllTranslation = await Translation.find();
      const list = listAllTranslation.filter((translation) => String(translation.userId) === userId);
      res.status(201).send(list); // отправляем созданный коммент со статусом 201(что-то создано) на клиента
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })

router.delete('/:countId', auth, async (req, res) => {
  try {
    const { countId } = req.params; // получаем параметр commentId
    //const removedComment = await Comment.find({ _id: commentId }) или ===>>>
    const removedCount = await Count.findById(countId); // найдём комментарий который нужно удалить
    if (removedCount.userId.toString() === req.user._id) {
      // проверить, а можем ли мы удалять комментарий, т.к. его может удалять только тот пользователь который его оставлял
      await removedCount.deleteOne(); // ждём пока удалится коммент
      return res.send(null); // можем вернуть null, т.к. на фронте мы ничего не ждём
    } else {
      // иначе отправляем ошибку авторизации
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
});

module.exports = router;