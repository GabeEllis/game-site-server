const express = require("express");
const router = express.Router();
require("dotenv").config();
const authorize = require("../middleware/authorize");
const knex = require("knex")(require("../knexfile"));

router.get("/", authorize, (req, res) => {
  knex("preferences")
    .where({ user_id: req.userId })
    .then((preferences) => {
      return res.json(preferences);
    });
});

router.put("/:id", (req, res) => {
  // Check for an empty field in the PUT body request.
  if (!req.body.name || !req.body.elo || !req.body.theme) {
    res.status(400).json({
      message: "All fields are required.  Please check your entries.",
    });
  }
  knex("preferences")
    .update(req.body)
    .where({ user_id: req.params.id })
    .then(() => {
      res.status(200).send(`User with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating user data ${req.params.id} ${err}`)
    );
});

module.exports = router;
