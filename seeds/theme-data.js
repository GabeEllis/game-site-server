require("dotenv").config();

let themeData = [
  {
    id: 1,
    name: "default",
    light: "white",
    dark: "grey",
  },
  {
    id: 2,
    name: "green",
    light: "#eeeed2",
    dark: "#769656",
  },
  {
    id: 3,
    name: "rust",
    light: "#ffffff",
    dark: "#964d37",
  },
  {
    id: 4,
    name: "sandcastle",
    light: "rgb(227, 193, 111)",
    dark: "rgb(184, 139, 74)",
  },
  {
    id: 5,
    name: "marine",
    light: "rgb(157, 172, 255)",
    dark: "rgb(111, 115, 210)",
  },
  {
    id: 6,
    name: "dusk",
    light: "rgb(204, 183, 174)",
    dark: "rgb(112, 102, 119)",
  },
  {
    id: 7,
    name: "coral",
    light: "rgb(177, 228, 185)",
    dark: "rgb(112, 162, 163)",
  },
  {
    id: 8,
    name: "new",
    light: "",
    dark: "",
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("theme").del();
  await knex("theme").insert(themeData);
};
