// eslint-disable-next-line no-unused-vars
const Knex = require('knex');

/**
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable('developers', (table) => {
    table.bigIncrements('id').primary();
    table.string('name', 200).notNullable();
    table.enum('sex', ['M', 'F', 'X']).notNullable();
    table.date('birthday').notNullable();
    table.specificType('hobby', 'char(50)').defaultTo(null);
    table.timestamps(null, true);
    table.dateTime('deleted_at');
  });
};

/**
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('developers');
};
