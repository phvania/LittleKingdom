const router = require('express').Router();
const { Bookings, Daycares, Kids, Users } = require('../../models');

// The `/api/daycares` endpoint

// find all daycares
router.get('/', async (req, res) => {
  try {
    const daycaresData = await Daycares.findAll();
    res.status(200).json(daycaresData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single daycare by its `id`
router.get('/:id', async (req, res) => {
  // include its associated booking data
  try {
    // find daycare by id
    const daycaresData = await Daycares.findByPk(req.params.id);
    res.status(200).json(daycaresData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new daycare
router.post('/', async (req, res) => {

  /* req.body should look like this...
    {
    "daycare_name": "Daycare name",
    "daycare_description": "Daycare description text",
    "daycare_address": "Daycare address as text",
    "daycare_phone": 3136843434,
    "daycare_contact_name": "Contact name"
  }
  */
  Daycares.create(req.body)
    .then((newDaycare) => {
      // return the category
      res.status(200).json(newDaycare);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// update a daycare's name by its `id` value
router.put('/:id', async (req, res) => {
  // update daycare data
  try{
  const putDaycare = await Daycares.update(req.body, { where: { id: req.params.id } });
  // console.log(putDaycare);
  if (!putDaycare) {
    res.status(404).json({ message: 'No category found with this id!' });
    return;
  }
  res.status(200).json(putDaycare);
  } catch (err) {
  // console.log(err);
  res.status(400).json(err);
  }
});
// delete on daycare by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteDaycare = await Daycares.destroy({ where: {id: req.params.id} });

    if (!deleteDaycare) {
      res.status(404).json({ message: 'No daycare found with this id!' });
      return;
    }
    res.status(200).json(deleteDaycare);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
