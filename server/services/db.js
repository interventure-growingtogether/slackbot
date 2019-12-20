const mongoose = require("mongoose");

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connection.on("error", err => console.error("Mongoose error:", err));

mongoose.connection.on("connected", () =>
  console.log("🗃  Connection to DB established successfully")
);

mongoose.Promise = global.Promise;

module.exports.connect = () => {
  mongoose.connect(process.env.MONGO_URI, dbOptions);
};
