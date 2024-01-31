const mongoose = require("mongoose");
const url =
  "mongodb+srv://sarah:hello@cluster0.z9kd34g.mongodb.net/?retryWrites=true&w=majority";

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
