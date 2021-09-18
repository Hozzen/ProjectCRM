const { validationResult } = require("express-validator");
const { User } = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET

const protect = async (req, res, next) => {
  try {
   const data = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
   req.cookies.jwtData = data;
   next();
  } catch {
    return res.status(401).json({
      message: "The token is not valid !"
    })
  }
}

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
  // Permet de hashé le mdp
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    console.log("register is working");
    console.log(`email : ${req.body.email}, password : ${req.body.password}`)
    let user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(`user : ${user}`)
    // Creation de l'utilisateur 
    res.status(201).json({
      status: "OK",
      data: `New user has been created : ${req.body.email}`,
    });
  } catch {
    res.status(401).json({
      message: `${req.body.email} This email is taken already.`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //  Vérification de l'email 
    const userEmail = await User.findOne({email: email})
    console.log("login is working");
    if (!userEmail) {
      return res.status(400).json({
        meassage: "Invalid Email !"
      })
    }

  //  Vérification du password
    const userPassword = await bcrypt.compare(password, userEmail.password)
    if (!userPassword) {
      return res.status(400).json({
        message: "Invalid Password !"
      })
    }

  // Creation du token 
    const token = jwt.sign({id: userEmail._id}, process.env.JWT_SECRET);
    console.log("token : ", token);

  // Creation du cookie
  res.cookie("jwt", token, { httpOnly: true, secure: false});
  return res.status(200).json({
    success: true,
    message: `${req.body.email} is now connected !`
  })

};

// EXPORTS
module.exports = {
  register: register,
  login: login,
  protect: protect
};
