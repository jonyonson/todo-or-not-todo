const router = require('express').Router();
const verifyId = require('../middleware/verifyId');
const Todos = require('./todos-model.js');

// POST /api/todos
router.post('/', async (req, res) => {
  try {
    const todo = await Todos.add(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/todos/:id
router.get('/:id', verifyId, async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /api/todos/:id
router.put('/:id', verifyId, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const todo = await Todos.update(id, changes);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
