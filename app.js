const path = require("path");
const config = require("./lib/config");
const express = require("express");
const uuid4 = require("uuid4");
const { insertBin, insertRequest } = require("./lib/pg-methods");

const Request = require("./mongoose");

const app = express();
const port = config.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", (req, res) => {
  const id = uuid4();
  const binId = uuid4();
  insertBin(id, binId, getCurrentTimestamp())
  res.redirect(`/${binId}/view`);
});

app.get("/:binId/view", async (req, res) => {
  const binId = req.params.binId;

  const requests = await Request.find({ binId: binId });
  res.render("binView", { binId: binId, requests: requests });
});

app.post("/:binId/receiver", async (req, res) => {
  var mongoObj;

  try {
    const newRequest = new Request({
      binId: req.params.binId,
      payload: req.body,
    });

    mongoObj = await newRequest.save();

    res.status(201).send("Request saved");
  } catch (error) {
    res.status(500).send("Error saving request");
  }

  const requestId = uuid4();
  insertRequest(requestId, req.params.binId, mongoObj._id, getCurrentTimestamp(), req.method, req.originalUrl)

});

app.listen(port, () => {
  console.log(`server running :) on ${port}`);
});

// testing inserting new bin into db
app.get("/new", (req, res) => {
  let id = uuid4();
  let binPath = uuid4();
  insertBin(id, binPath, getCurrentTimestamp())
  res.send("you inserted a bin!")
});

function getCurrentTimestamp () {
  const currentDate = new Date();

// Get the individual components of the date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Format the date as PostgreSQL timestamp
  const postgresTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return postgresTimestamp;
}