const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { Users, Kids, Bookings, Daycares } = require('../models');

// GET All Daycares
router.get('/', async (req, res) => {
  try {
    // Get all daycares and JOIN with user data
    const daycaresData = await Daycares.findAll();

    // Serialize data so the template can read it
    const daycares = daycaresData.map((dc) => dc.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      daycares, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
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
