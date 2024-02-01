const config = require("./lib/config");
const mongoose = require("mongoose");

const url =
  config.MONGO_URL;

mongoose
  .connect(url)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error));

const requestSchema = new mongoose.Schema({
  // TODO: change binId type to 'UUID'
  binId: String,
  payload: {},
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
