const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
// db config & connecting
require("./services/db").connect();

// routes
require("./routes")(app);

app.listen(PORT, () => {
  console.log(`The Hacathon is 🏃‍♂️ on port ${PORT}`);
});
