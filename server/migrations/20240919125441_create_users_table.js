exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').notNullable().primary();
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};

// unique () only one mail - id primary
// npx knex migrate:latest
