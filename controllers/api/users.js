const router = require('express').Router();
const { Users, Bookings, Daycares, Kids} = require('../../models');

// gets all user info from users table 
router.get('/', async (req, res) => {
  try{
    const userData = await Users.findAll();
    res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  
});
// gets a user's info from db 
// - including their kids and bookings
router.get('/:id', async (req, res) => {
  try{
    const userData = await Users.findByPk(req.params.id, {
      include: [Kids, Bookings]
      });
    res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
});
// adds a new user to the DB and starts current session
router.post('/', async (req, res) => {
  try {
    console.log("IN / *********");
    console.log(req.body);

    const userData = await Users.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});
// checks to see if user is registered and starts session if so
router.post('/login', async (req, res) => {
  try {

    console.log("ROUTE: /api/users/login");
    console.log(req.body.email);

    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    // console.log("could not find any user");

    }

    // const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res
    //     .status(400)
    //     .json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // }

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;
      
    //   res.json({ user: userData, message: 'You are now logged in!' });
    // });

  } catch (err) {
    res.status(400).json(err);
  }
});
// logs the user out and destroys the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
