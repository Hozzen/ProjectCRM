const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Test = mongoose.model("Test", TestSchema);

module.exports = {
  Test: Test,
};
