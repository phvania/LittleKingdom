const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { Users, Kids, Bookings, Daycares } = require('../models');

// GET About US page 
router.get('/aboutUs', async (req, res) => {
  // render about us page
  res.sendFile(path.join(__dirname, '../public/pages/aboutUs.html'));
});

// GET 404 page 
router.get('*', async (req, res) => {
  // render not found page
  res.sendFile(path.join(__dirname, '../public/pages/404.html'));
});
module.exports = router;
