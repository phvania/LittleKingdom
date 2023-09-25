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
// GET User info
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
// POST A booking
router.get('/booknow', withAuth, async (req, res) => {
  try {

    // get the logged in user info
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });
    console.log("**** try *******");
    console.log(userData);
    // serialize for handlebars
    const user = userData.get({ plain: true });

    // get the logged in user's kids
    const userKidsfromDB = await Kids.findAll({
      where: {
        user_id: userData.id
      }
    });
    if (userKidsfromDB) {
      // serialize for handlebars
      userKidsfromDB.map((kid) => kid.get({ plain: true }));
    }

    // get all the daycares from DB
    const daycaresfromDB = await Daycares.findAll({});
    // serialize for handlebars
    daycaresfromDB.map((dc) => dc.get({ plain: true }));

    res.render('booknow', {
      user_fname: userData.user_firstname,
      user_id: userData.id,
      kids: userKidsfromDB,
      daycares: daycaresfromDB,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
// GET Profile route IF withAuth middleware returns true
router.get('/profile', withAuth, async (req, res) => {
  try {

    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const userBookingsfromDB = await Bookings.findAll({
      where: {
        user_id: userData.id
      }
    });

    const user = userData.get({ plain: true });

    if (!userBookingsfromDB) {
      console.log("here now");
      res.render('profile', {
        user_fname: user.user_firstname,
        bookings_exist: false,
        logged_in: true
      });
      return;
    }

    const userBookings = userBookingsfromDB.map((b) => b.get({ plain: true }));

    console.log(userBookings);
    console.log("about to render...profile...");
    res.render('profile', {
      user_fname: user.user_firstname,
      // ...booking,
      bookings_exist: true,
      userBookings,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET 404 page 
router.get('*', async (req, res) => {
  // render not found page
  res.sendFile(path.join(__dirname, '../public/pages/404.html'));
});

module.exports = router;
