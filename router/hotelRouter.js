//external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../middlewares/common/verifyToken");

// create
router.post("/", verifyAdmin, createHotel);
// update
router.put("/:id", verifyAdmin, updateHotel);
// delete
router.delete("/:id", verifyAdmin, deleteHotel);
// get
router.get("/:id", getHotel);
// get all
router.get("/", getHotels);

module.exports = router;
