const router = require('express').Router();
const { Bookings, Kids, Daycares, Users } = require('../../models');

// gets all bookings from db 
router.get('/', async (req, res) => {
  try{
    const bookingData = await Bookings.findAll();
    res.status(200).json(bookingData);
    } catch (err) {
      res.status(400).json(err);
    }
  
});
// gets a booking's info from db 
// - including the user, kid and daycare
router.get('/:id', async (req, res) => {
  try{
    const bookingData = await Bookings.findByPk(req.params.id, {
      include: [Users, Kids, Daycares] 
      });
    res.status(200).json(bookingData);
    } catch (err) {
      res.status(400).json(err);
    }
});
// create a new booking
router.post('/', async (req, res) => {
  /*  Body should look like:
  {
    "bookings_time": "00:00:00",
    "bookings_date": "2023-01-10T05:00:00.000Z",
    "bookings_type": "FT",
    "user_id": 1,
    "kid_id": 2,
    "daycare_id": 3,
  }
  */

  console.log(req.body);
  try {
    const newBooking = await Bookings.create({
      ...req.body
      // ...req.body,
    });

    res.status(200).json(newBooking);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a booking's info by its `id` value
router.put('/:id', async (req, res) => {
  // update booking data
  try{
  const putBooking = await Bookings.update(req.body, { where: { id: req.params.id } });
  // console.log(putDaycare);
  if (!putBooking) {
    res.status(404).json({ message: 'No daycare found with this id!' });
    return;
  }
  res.status(200).json(putBooking);
  } catch (err) {
  // console.log(err);
  res.status(400).json(err);
  }
});
// delete a new booking by its id
router.delete('/:id', async (req, res) => {
  try {
    const deleteBooking = await Bookings.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteBooking) {
      res.status(404).json({ message: 'No booking found with this id!' });
      return;
    }

    res.status(200).json(deleteBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
