const express = require('express');
const auth = require('../middleware/auth.middleware');
const Translation = require('../models/Translation');
const Count = require('../models/Count');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Translation.find();
      const list = listAll.filter(
        (translation) => String(translation.userId) === req.user._id
      ); //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userId = req.user._id;
      const newTranslation = await Translation.create({
        // ждём пока создадим комментарий
        ...req.body, // здесь у нас прилетают все необходимые данные
        userId: userId, // добавляем здесь id, т.к. у нас в модели коммента есть userId
      });
      //Получаем счёт из которого после вычитаем перевод
      const { fromCount, toCount, balanceFrom, balanceTo } = newTranslation;
      let countFrom
      if (fromCount !== '0') {
        countFrom = await Count.findById(fromCount);
        countFrom.balance = Number(countFrom.balance) - Number(balanceFrom);
        await Count.findByIdAndUpdate(fromCount, countFrom);
      }
      const countTo = await Count.findById(toCount);
      countTo.balance = Number(countTo.balance) + Number(balanceTo);
      await Count.findByIdAndUpdate(toCount, countTo);
      const data = {
        _id: 'noTransformData',
        'newTranslation': newTranslation,
        'counts': { 'countFrom': countFrom, 'countTo': countTo },
      };
      res.status(201).send(data); // отправляем созданный коммент со статусом 201(что-то создано) на клиента
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  });
router.delete('/:translId', auth, async (req, res) => {
  try {
    const { translId } = req.params;
    const removedTranslation = await Translation.findById(translId);
    const { fromCount, toCount, balanceFrom, balanceTo } =
      removedTranslation;
      let countFrom
    if (fromCount !== '0') {
      countFrom = await Count.findById(fromCount);
      countFrom.balance = Number(countFrom.balance) + Number(balanceFrom);
      await Count.findByIdAndUpdate(fromCount, countFrom);
    }
    const countTo = await Count.findById(toCount);
    countTo.balance = Number(countTo.balance) - Number(balanceTo);
    await Count.findByIdAndUpdate(toCount, countTo);
    await removedTranslation.deleteOne(); // ждём пока удалится коммент
    const data = {
      _id: 'translId',
      'counts': { 'countFrom': countFrom, 'countTo': countTo },
    };
    return res.send(data); // можем вернуть null, т.к. на фронте мы ничего не ждём
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
});

module.exports = router;
