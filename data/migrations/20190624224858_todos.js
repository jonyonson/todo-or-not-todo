exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', t => {
    t.increments();

    t.string('todo', 256).notNullable();

    t.boolean('completed').defaultTo(false);

    t.integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos');
};
