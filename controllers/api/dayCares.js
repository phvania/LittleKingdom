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
    const daycaresData = await Daycares.findByPk(req.params.id, {
      // include associated bookings
      include: [{
          model: Bookings,
        }],
    });
    res.status(200).json(daycaresData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new category
router.post('/', async (req, res) => {

/* req.body should look like this...
  {
    category_name: 'Shirts',
  }
*/
  Category.create(req.body)
    .then((category) => {
      // return the category
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// update a category's name by its `id` value
router.put('/:id', (req, res) => {
  // update category data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })    
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
// delete on category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
