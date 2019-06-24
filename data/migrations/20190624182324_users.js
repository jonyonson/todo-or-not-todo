exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', u => {
    u.increments();

    u.string('username', 128)
      .notNullable()
      .unique();

    u.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
