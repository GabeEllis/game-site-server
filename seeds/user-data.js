const bcrypt = require("bcrypt");
require("dotenv").config();

let usersData = [
  {
    id: 1,
    email: "gabeellis830@gmail.com",
    password: "123",
  },
  {
    id: 2,
    email: "nknill@brainstation.io",
    password: "123",
  },
];

usersData = usersData.map((user) => ({
  ...user,
  password: bcrypt.hashSync(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  ),
}));

const preferencesData = [
  {
    user_id: 1,
    theme: "dark",
  },
  {
    user_id: 2,
    theme: "light",
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert(usersData);
  await knex("preferences").del();
  await knex("preferences").insert(preferencesData);
};
