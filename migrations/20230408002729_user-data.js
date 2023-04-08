/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", function (table) {
      table.increments("id");
      table.string("email").notNullable();
      table.string("password").notNullable();
    })
    .createTable("preferences", function (table) {
      table.increments("id");
      table.integer("user_id").unsigned();
      table.string("theme").notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("preferences").dropTable("user");
};
