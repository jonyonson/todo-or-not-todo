const db = require('../data/dbConfig');

module.exports = {
  add,
  findById,
  update,
  remove,
};

async function add(todo) {
  const [id] = await db('todos').insert(todo);
  return findById(id);
}

function findById(id) {
  return db('todos')
    .where({ id })
    .first();
}

function update(id, changes) {
  return db('todos')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
