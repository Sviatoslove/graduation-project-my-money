const express = require('express');
const auth = require('../middleware/auth.middleware');
const Operation = require('../models/Operation');
const Count = require('../models/Count');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Operation.find();
      const list = listAll.filter(
        (operation) => String(operation.userId) === req.user._id
      );
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Операции не загружены. Попробуйте позже.',
            code: 500,
          },
        });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userId = req.user._id;
      const newOperation = await Operation.create({
        ...req.body,
        userId: userId,
      });
      const { countId, balance, status } = newOperation;
      const count = await Count.findById(countId);
      if (status === 'increment')
        count.balance = Number(count.balance) + Number(balance);
      else if (status === 'decrement')
        count.balance = Number(count.balance) - Number(balance);
      await Count.findByIdAndUpdate(countId, count);
      const data = {
        _id: 'noTransformData',
        newOperation: newOperation,
        count: count,
      };
      res.status(201).send(data);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Операция не создана. Попробуйте позже.',
            code: 500,
          },
        });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const updatedOperation = await Operation.findByIdAndUpdate(
        req.body._id,
        req.body,
        {
          new: true,
        }
      );
      const { countId, balance, prevBalance } = updatedOperation;
      const currentCount = await Count.findById(countId);
      const interest = balance - prevBalance;
      currentCount.balance += interest;
      const editedCount = await Count.findByIdAndUpdate(countId, currentCount, {
        new: true,
      });
      const data = {
        _id: 'noTransformData',
        operation: updatedOperation,
        count: editedCount,
      };
      res.send(data);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Операция не обновлена. Попробуйте позже.',
            code: 500,
          },
        });
    }
  });
router.delete('/:operId', auth, async (req, res) => {
  try {
    const { operId } = req.params;
    const removedOperation = await Operation.findById(operId);
    const { countId, balance, status } = removedOperation;
    const count = await Count.findById(countId);
    if (status === 'increment')
      count.balance = Number(count.balance) - Number(balance);
    else if (status === 'decrement')
      count.balance = Number(count.balance) + Number(balance);
    await Count.findByIdAndUpdate(countId, count);
    await removedOperation.deleteOne();
    return res.send(count);
  } catch (e) {
    res
      .status(500)
      .json({
        error: {
          message: 'На сервере произошла ошибка. Операция не удалена. Попробуйте позже.',
          code: 500,
        },
      });
  }
});

module.exports = router;
