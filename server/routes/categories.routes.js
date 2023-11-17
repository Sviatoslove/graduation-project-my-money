const express = require('express');
const auth = require('../middleware/auth.middleware');
const Category = require('../models/Category');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Category.find();
      const list = listAll.filter(
        (category) => String(category.userId) === req.user._id
      ); 
      res.send(list);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Попробуйте позже.',
            code: 500,
          },
        });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCategory = await Category.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newCategory);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Попробуйте позже.',
            code: 500,
          },
        });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.body._id,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedCategory);
    } catch (e) {
      res
        .status(500)
        .json({
          error: {
            message: 'На сервере произошла ошибка. Попробуйте позже.',
            code: 500,
          },
        });
    }
  });

router.delete('/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params; 
    const removedCategory = await Category.findById(categoryId); удалить
    if (removedCategory.userId.toString() === req.user._id) {
      await removedCategory.deleteOne(); 
      return res.send(null);
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        error: {
          message: 'На сервере произошла ошибка. Попробуйте позже.',
          code: 500,
        },
      });
  }
});

module.exports = router;
