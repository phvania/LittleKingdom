const router = require('express').Router();
const users = require('./users');
const daycares = require('./daycares');
const kids = require('./daycares');
const bookings = require('./bookings');

router.use('/users', users);
router.use('/daycares', daycares);
router.use('/kids', kids);
router.use('/bookings', bookings);

module.exports = router;
