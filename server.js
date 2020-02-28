const express = require("express");
const mongoose = require("mongoose");
var compression = require('compression');

const PORT = process.env.PORT || 3000;

const Widgets = require("./models/widgetModel.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(compression());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoprods", { useNewUrlParser: true });

app.get("/", (err, res) => {
  res.render("index.html");
});

app.get("/api/widgets", (err, res) => {
  Widgets.find({}).then( data => {
    res.json(data)
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
