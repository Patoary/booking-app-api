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
const {
  verifyUser,
  verifyAdmin,
} = require("../middlewares/common/verifyToken");

// update
router.put("/:id", verifyUser, updateUser);
// delete
router.delete("/:id", verifyUser, deleteUser);
// get
router.get("/:id", verifyUser, getUser);
// get all
router.get("/", verifyAdmin, getUsers);

module.exports = router;
