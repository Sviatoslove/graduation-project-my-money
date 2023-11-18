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
      );
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Переводы не загружены. Попробуйте позже.',
            code: 500,
          },
        });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userId = req.user._id;
      const newTranslation = await Translation.create({
        ...req.body,
        userId: userId,
      });
      const { fromCount, toCount, balanceFrom, balanceTo } = newTranslation;
      let countFrom;
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
        newTranslation: newTranslation,
        counts: { countFrom: countFrom, countTo: countTo },
      };
      res.status(201).send(data);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Перевод не создан. Попробуйте позже.',
            code: 500,
          },
        });
    }
  });
router.delete('/:translId', auth, async (req, res) => {
  try {
    const { translId } = req.params;
    const removedTranslation = await Translation.findById(translId);
    const { fromCount, toCount, balanceFrom, balanceTo } = removedTranslation;
    let countFrom;
    if (fromCount !== '0') {
      countFrom = await Count.findById(fromCount);
      countFrom.balance = Number(countFrom.balance) + Number(balanceFrom);
      await Count.findByIdAndUpdate(fromCount, countFrom);
    }
    const countTo = await Count.findById(toCount);
    countTo.balance = Number(countTo.balance) - Number(balanceTo);
    await Count.findByIdAndUpdate(toCount, countTo);
    await removedTranslation.deleteOne();
    const data = {
      _id: 'translId',
      counts: { countFrom: countFrom, countTo: countTo },
    };
    return res.send(data);
  } catch (e) {
    res
      .status(500)
      .json({
        error: {
          message: 'На сервере произошла ошибка.  Перевод не удалён. Попробуйте позже.',
          code: 500,
        },
      });
  }
});

module.exports = router;
