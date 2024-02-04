//external imports
const express = require("express");
const router = express.Router();

// internal imports

const { verifyAdmin } = require("../middlewares/common/verifyToken");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} = require("../controllers/roomController");
// create
router.post("/:hotelId", verifyAdmin, createRoom);
// update
router.put("/:id", verifyAdmin, updateRoom);
// delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
// get
router.get("/:id", verifyAdmin, getRoom);
// get all
router.get("/", verifyAdmin, getRooms);

module.exports = router;
