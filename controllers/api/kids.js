const router = require('express').Router();
const { Kids } = require('../../models');

// Get all kids
router.get('/', async (req, res) => {
  try {
    const kidsData = await Kids.findAll({
      //   sorted by name
      // order: [['name', 'ASC']],
    });

    // UNCOMMENT NEXT to send
    // Serialize user data so templates can read it
    // const cleanedkids = kidsData.map((kid) => kid.get({ plain: true }));
    // and then send serialized data into Handlebars.js
    // res.render('kid', { kids });

    res.status(200).json(kidsData);

  } catch (err) {
    res.status(500).json(err);
  }
});
// get a specific kid by id
router.get('/:id', async (req, res) => {
  try {
    const getKid = await Kids.findByPk(req.params.id);

    if (!getKid) {
      res.status(404).json({ message: 'No kid found with this id!' });
      return;
    }

    res.status(200).json(getKid);
  } catch (err) {
    res.status(500).json(err);
  }
});
// add a kid using info in req.body
router.post('/', async (req, res) => {
  /* req.body should look like this...
  {
    "kid_firstname":"Don",
    "kid_lastname":"Donon",
    "kid_age":2,
    "kid_allergies":"none",
    "user_id":1,
},
*/
  try {
    const addedKid = await Kids.create({...req.body});

    res.status(200).json(addedKid);
  } catch (err) {
    res.status(400).json(err);
  }
  // res.json({"message":"you hit post api/kids/"});
});
// update a kid's info by its `id` value
router.put('/:id', async (req, res) => {
  // update kids data
  try {
    console.log(req.body);
  const putKid = await Kids.update(req.body, { where: { id: req.params.id } });
  if (!putKid) {
    res.status(404).json({ message: 'No kid found with this id!' });
    return;
  }
  res.status(200).json(putKid);
  } catch (err) {
  // console.log(err);
  res.status(400).json(err);
  }
});
// delete a specific kid by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedKid = await Kids.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedKid) {
      res.status(404).json({ message: 'No kid found with this id!' });
      return;
    }

    res.status(200).json(deletedKid);
  } catch (err) {
    res.status(500).json(err);
  }
  res.json({ "message": "you hit post api/kids/" });

});

module.exports = router;
