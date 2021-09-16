const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const testRouters = require("./routers/testRouters");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/users", testRouters);

app.listen(process.env.PORT, () => {
  console.log("Listening on port : ", process.env.PORT);
});
