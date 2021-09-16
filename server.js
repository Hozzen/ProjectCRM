const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// IMPORT ROUTES
const userRouters = require("./routers/userRouters");
const contactRouters = require("./routers/contactRouters");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", userRouters);
app.use("/contact", contactRouters);

app.listen(process.env.PORT, () => {
  console.log("Listening on port : ", process.env.PORT);
});
