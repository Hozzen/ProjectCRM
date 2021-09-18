const express = require("express");
const userControllers = require("../controllers/userControllers");
const userMiddlewares = require("../middlewares/userMiddleswares");
const  { protect } = require("../controllers/userControllers")

const router = express.Router();

// GET

// POST

router.post("/register", userMiddlewares.userCheck(), userControllers.register);

router.post("/login", userControllers.login);

module.exports = router;
