require("dotenv").config();
const { log } = require("console");
const jwt = require("jsonwebtoken");

/**
 * Validate JWT is formatted correctly, then verify the JWT, then add the user id to the request
 * Request:
 *          - token:  headers: authorization: "Bearer {token}"
 * Response:
 *          - 401 token is missing ✅
 *          - 403 invalid JWT ✅
 *          - 400 malformed bearer token ✅
 *          - attach userId to request and call next() if JWT is verified ✅
 */
module.exports = (req, res, next) => {
  const bearerTokenString = req.headers.authorization;
  console.log(bearerTokenString, "bearerToken");

  if (!bearerTokenString) {
    return res.status(401).json({
      error: "Resource requires Bearer token in Authorization header",
    });
  }

  const splitBearerToken = bearerTokenString.split(" ");

  if (splitBearerToken.length !== 2) {
    return res.status(400).json({
      error: "Bearer token is malformed",
    });
  }

  const token = splitBearerToken[1];
  console.log(token, "token");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid JWT",
      });
    }
    console.log(decoded.id);
    req.userId = decoded.id;
    next();
  });
};
