const bcrypt = require("bcrypt");
require("dotenv").config();

let usersData = [
  {
    id: 1,
    email: "gabeellis830@gmail.com",
    password: "Password1!",
  },
  {
    id: 2,
    email: "marco@brainstation.io",
    password: "Password2!",
  },
  {
    id: 3,
    email: "roza@brainstation.io",
    password: "Password3!",
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
    theme: "option1",
    name: "GabeEllis",
    elo: "1732",
  },
  {
    user_id: 2,
    theme: "option2",
    name: "Marco",
    elo: "1121",
  },
  {
    user_id: 3,
    theme: "option3",
    name: "Roza",
    elo: "785",
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
