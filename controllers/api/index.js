const router = require('express').Router();
const userRoutes = require('./users');
const projectRoutes = require('./dayCares');

router.use('/users', users);
router.use('/daycares', dayCares);

module.exports = router;
