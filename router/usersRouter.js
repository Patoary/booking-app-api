//external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

// update
router.put("/:id", updateUser);
// delete
router.delete("/:id", deleteUser);
// get
router.get("/:id", getUser);
// get all
router.get("/", getUsers);

module.exports = router;
