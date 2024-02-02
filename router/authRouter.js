// external imports
const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// user registration router
router.post("/", register);

//login router
router.post("/login", login);

module.exports = router;
