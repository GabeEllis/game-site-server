const express = require("express");
const router = express.Router();
require("dotenv").config();
const authorize = require("../middleware/authorize");
const knex = require("knex")(require("../knexfile"));

/**
 * Response:
 *    - 200 [ posts ]: use req.userId to filter post table by user_id ✅
 */
router.get("/", authorize, (req, res) => {
  knex("preferences")
    .where({ user_id: req.userId })
    .then((preferences) => {
      return res.json(preferences);
    });
});

module.exports = router;
