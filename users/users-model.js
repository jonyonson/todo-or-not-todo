const db = require('../data/dbConfig');

module.exports = {
  add,
  getAll,
  findById,
  update,
  remove,
};

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function getAll() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
