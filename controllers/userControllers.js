const { validationResult } = require("express-validator");
const { User } = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET

// POST

const register = async (req, res) => {
  const errors = validationResult(req);
  console.log("register check passed!");
  if (errors.isEmpty() === false) {
    console.log("Register check didn't passed!");
    return res.status(400).json({
      message: "error",
      errors: errors.array(),
    });
  }

  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    console.log("register is working");
    let user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({
      status: "OK",
      data: user,
    });
  } catch {
    res.status(401).json({
      message: "error detected ! ",
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("login is working");
    res.json({
      status: "OK",
    });
  } catch {
    res.status(401).json({
      message: "error detected ! ",
    });
  }
};

// EXPORTS
module.exports = {
  register: register,
  login: login,
};
