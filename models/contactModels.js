const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  description: String,
  category: String,
});
