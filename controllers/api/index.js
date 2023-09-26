const router = require('express').Router();
const users = require('../../Users');
const daycares = require('../../Daycares');
const kids = require('../../models/Kiddies');
const bookings = require('../../models/Bookings');

router.use('/users', users);
router.use('/daycares', daycares);
router.use('/kids', kids);
router.use('/bookings', bookings);

// export module
module.exports = router;
