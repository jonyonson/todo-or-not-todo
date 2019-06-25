const router = require('express').Router();

const Users = require('./users-model.js');

router.post('/', async (req, res) => {
  try {
    const user = await Users.add(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', verifyId, async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', verifyId, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const user = await Users.update(id, changes);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

function verifyId(req, res, next) {
  try {
    const user = Users.findById(req.params.id);
    if (user) next();
    else res.status(404).json({ message: 'id not found' });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = router;
