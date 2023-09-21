const router = require('express').Router();
const users = require('./users');
const dayCares = require('./dayCares');

router.use('/users', users);
router.use('/daycares', dayCares);

module.exports = router;
