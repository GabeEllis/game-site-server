const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.get("/", (req, res) => {
  knex("theme").then((theme) => {
    return res.json(theme);
  });
});

router.post("/", async (req, res) => {
  const { name, dark, light } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Registration requires all fields" });
  }

  const newThemeData = {
    name: name,
    dark: dark,
    light: light,
  };

  knex("theme")
    .insert(newThemeData)
    .then(() => {
      return knex("theme").then((theme) => {
        res.json(theme);
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "There was an issue with the request",
        error,
      });
    });
});

module.exports = router;
