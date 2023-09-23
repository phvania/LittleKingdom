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
    kid_firstname: "Basketball",
    kid_lastname: ""
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/
  try {
    const addedKid = await Kids.create({
      ...req.body,
      //   user_id: req.session.user_id,
    });

    res.status(200).json(addedKid);
  } catch (err) {
    res.status(400).json(err);
  }
  // res.json({"message":"you hit post api/kids/"});
});

// delete a specific kid by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedKid = await Kids.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!deletedKid) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(deletedKid);
  } catch (err) {
    res.status(500).json(err);
  }
  res.json({ "message": "you hit post api/kids/" });

});

module.exports = router;
