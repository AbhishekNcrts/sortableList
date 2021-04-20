const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var cors = require("cors");
var path = require("path");

const index = require("./routes/index");

const app = express();

//@ mongodb connection
const db = require("./config/mongoDb").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine","ejs");

app.use( 
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors());

app.use("/admin", index);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(422).send({
    error: err.message
  });
});

//listen for request
app.listen(process.env.PORT || 4000, () => {
  console.log("now listening for request");
});