// external imports
const express = require("express");
const { register } = require("../controllers/authController");
const router = express.Router();

// user registration router
router.post("/", register);

module.exports = router;
