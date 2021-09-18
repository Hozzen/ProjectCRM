const express = require("express");

const  { protect } = require("../controllers/userControllers")

const router = express.Router();


// GET

router.get("/", protect, /* contactControllers */)

// POST

module.exports = router;
