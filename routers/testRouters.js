const express = require("express");
const testControllers = require("../controllers/testControllers");

const router = express.Router();

// GET

router.get("/test", testControllers.test);

// POST

module.exports = router;
