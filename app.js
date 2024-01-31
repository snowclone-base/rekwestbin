const path = require("path");
const config = require("./lib/config");
const express = require("express");
const uuid4 = require("uuid4");
const {insertBin} = require("./lib/pg-methods");

const Request = require("./mongoose");

const app = express();
const port = config.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const generateBinId = () => {
  return uuid4();
};

app.post("/", (req, res) => {
  const binId = generateBinId();
  res.redirect(`/${binId}/view`);
});

app.get("/:binId/view", async (req, res) => {
  const binId = req.params.binId;

  const requests = await Request.find({ binId: binId });
  res.render("binView", { binId: binId, requests: requests });
});

app.post("/:binId/receiver", async (req, res) => {
  try {
    const newRequest = new Request({
      binId: req.params.binId,
      payload: req.body,
    });

    await newRequest.save();

    res.status(201).send("Request saved");
  } catch (error) {
    res.status(500).send("Error saving request");
  }
});

app.listen(port, () => {
  console.log(`server running :) on ${port}`);
});

app.get("/new", (req, res) => {
  let id = generateBinId();
  let binPath = generateBinId();
  let timeStamp = '2004-10-19 10:23:54'
  insertBin(id, binPath, timeStamp)
  res.send("you inserted a bin!")
});