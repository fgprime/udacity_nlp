var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
const { getMeaning } = require("./API.js");
var cors = require("cors");

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/api", async (req, res) => {
  const text = req.body?.text;
  const meaning = await getMeaning(text);
  res.json(meaning);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
