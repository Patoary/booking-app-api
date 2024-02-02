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

// create
router.post("/", createHotel);
// update
router.put("/:id", updateHotel);
// delete
router.delete("/:id", deleteHotel);
// get
router.get("/:id", getHotel);
// get all
router.get("/", getHotels);

module.exports = router;
