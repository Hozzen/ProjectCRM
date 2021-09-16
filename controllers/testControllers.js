const { validationResult } = require("express-validator");
const { Test } = require("../models/testModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET

const test = async (req, res) => {
  try {
    res.json({
      name: "success",
      number: 700,
    });
  } catch {
    res.status(401).json({
      message: "error detected ! ",
    });
  }
};

const login = (req, res) => {
  console.log("We are gooood my guy");
};

module.exports = {
  test: test,
  login: login,
};
