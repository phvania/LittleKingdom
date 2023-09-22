const router = require('express').Router();
const users = require('./users');
const daycares = require('./daycares');

router.use('/users', users);
router.use('/daycares', daycares);

module.exports = router;
