const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Request:
 *         - email
 *         - password
 * Response:
 *         - 200 { token: jwtToken } -> how to generate the JWT? ✅
 *         - 401 email and password don't match a user ✅
 *         - 400 email or password are missing ✅
 */
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: "Email and password fields are required",
    });
  }

  // Instead of checking the array
  // let's find the user by their email
  // If we find a user by their email,
  // use bcrypt to validate their password
  knex("user")
    .where({ email: req.body.email })
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          error: "Invalid login credentials.",
        });
      }

      const foundUser = users[0];
      // based on this user we found, we need the password
      const isValidPassword = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (!isValidPassword) {
        return res.status(401).json({
          error: "Invalid login credentials.",
        });
      }

      // We have valid credentials
      // - 200 { token: jwtToken } -> how to generate the JWT?
      // Install jsonwebtoken, jwt.sign( payloadObject, SECRET_KEY);
      // Respond with the created JWT
      const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET_KEY);

      res.json({
        message: "Successfully logged in",
        token: token,
      });
    });
});

router.post("/register", async (req, res) => {
  const { email, password, name, elo } = req.body;

  if (!email || !password || !name || !elo) {
    return res.status(400).json({ error: "Registration requires all fields" });
  }

  const foundUsers = await knex("user").where({ email: email });

  if (foundUsers.length === 1) {
    // not found user
    return res
      .status(400)
      .json({ error: "User account with this email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  const newUserIds = await knex("user").insert({
    email,
    password: hashedPassword,
  });

  const newUserId = newUserIds[0];
  const newUsers = await knex("user").where({ id: newUserId });
  const newUser = newUsers[0];
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);

  const newUserData = {
    id: newUser.id,
    user_id: newUser.id,
    name: name,
    elo: elo,
    theme: "option1",
  };

  knex("preferences")
    .insert(newUserData)
    .then(() => {
      return knex("preferences").where("id", newUserData.id).first();
    })
    .catch((error) => {
      return res.status(400).json({
        message: "There was an issue with the request",
        error,
      });
    });

  res.json({
    message: "Successfully signed up",
    token,
  });
});

module.exports = router;
