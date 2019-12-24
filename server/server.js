const express = require("express");
const expressStaticGzip = require("express-static-gzip");

require("dotenv").config();
const next = require("next");

const clientRoutes = require("./clientRoutes");
const app = next({ dev: true, dir: "./client" });
const handle = app.getRequestHandler();

const prepareApp = () => {
  return new Promise(async (resolve, reject) => {
    await app.prepare();

    const expressServer = express();

    expressServer.use(express.json());
    expressServer.use(express.urlencoded({ extended: true }));
    const PORT = process.env.PORT || 8080;

    expressServer.use("/_next", expressStaticGzip("./_next"));

    expressServer.use(clientRoutes(app));

    require("./routes")(expressServer);

    // db config & connecting
    require("./services/db").connect();

    // routes

    // dialogflow
    require("./bot/dialogflow");
    // require("./bot/slack");

    expressServer.listen(PORT, () => {
      console.log(`The Hacathon is 🏃‍♂️ on port ${PORT}`);
    });
  });
};

module.exports = prepareApp();
