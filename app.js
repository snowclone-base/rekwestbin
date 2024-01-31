const express = require("express");
const uuid4 = require("uuid4");
const PgPersistence = require("./lib/pg-persistence");

const app = express();
const port = 3001;

const generateBinId = () => {
  return uuid4();
};

app.listen(port, () => {
  console.log(`server running :) on ${port}`);
});

app.get("/", (req, res) => {
  let binId = generateBinId();
  res.redirect(`/${binId}/view`);
});

app.get("/:binId/view", (req, res) => {
  // let binId = req.params.binId;
  res.send("you lookin at me?");
});

app.post("/:binId/receiver", (req, res) => {
  // do something with webhook
  res.sendStatus(200);
});

app.get("/new", (req, res) => {
  let id = generateBinId();
  let binPath = generateBinId();
  let timeStamp = '2004-10-19 10:23:54'
  let hack = new PgPersistence();
  hack.insertBin(id, binPath, timeStamp)
  res.send("you inserted a bin!")
});