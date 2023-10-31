const express = require('express');
const auth = require('../middleware/auth.middleware');
const Category = require('../models/Category');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const listAll = await Category.find();
      const list = listAll.filter((category) => String(category.userId) === req.user._id);; //получаем список всех комментариев
      res.send(list); // отправили их на клиента с статус кодом 200
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCategory = await Category.create({
        // ждём пока создадим комментарий
        ...req.body, // здесь у нас прилетают все необходимые данные
        userId: req.user._id, // добавляем здесь id, т.к. у нас в модели коммента есть userId
      });

      const listAll = await Category.find();
      const list = listAll.filter((category) => String(category.userId) === req.user._id);
      res.status(201).send(list); // отправляем созданный коммент со статусом 201(что-то создано) на клиента
    } catch (e) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
    }
  })
  .patch(auth, async (req, res) => {
  try {
      const updatedCategory = await Category.findByIdAndUpdate(req.body._id, req.body, {
        new: true, // этот флаг означает, что мы получаем обновлённые данные только после того, как они обновятся в БД, чтобы в этой константе на клиента не ушли старые данные
      });
      res.send(updatedCategory);
  } catch (e) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
  }
});

router.delete('/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params; // получаем параметр commentId
    //const removedComment = await Comment.find({ _id: commentId }) или ===>>>
    const removedCategory = await Category.findById(categoryId); // найдём комментарий который нужно удалить
    if (removedCategory.userId.toString() === req.user._id) {
      // проверить, а можем ли мы удалять комментарий, т.к. его может удалять только тот пользователь который его оставлял
      await removedCategory.deleteOne(); // ждём пока удалится коммент
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
