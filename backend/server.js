const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = 5000;
// routes
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

// mongodb connection

const username = "kietnguyen";
const password = "thangdubathanh";
const cluster = "cluster0.on6wav6";
const dbname = "";

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error: "));
dbConnection.once("open", function () {
  console.log("Connect to MongoDB successfully !");
});

app.use("/users", userRouter);
app.get("/", (req, res) => res.send("hello World!"));
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});
