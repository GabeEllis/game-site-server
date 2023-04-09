const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user-routes");
const preferenceRoutes = require("./routes/preferences-routes");

// Create some routes: POST /login, POST /register, GET /user-profile
app.use("/users", userRoutes);
app.use("/preferences", preferenceRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
