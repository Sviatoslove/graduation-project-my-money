const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/count', require('./count.routes'));
router.use('/user', require('./user.routes'));
router.use('/avatars', require('./avatars.routes'));
router.use('/countsData', require('./countsData.routes'));
router.use('/translation', require('./translation.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/iconsForCategoriesData', require('./categoriesIcons.routes'));
router.use('/operations', require('./operation.routes'));

module.exports = router;
