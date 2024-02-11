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
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../middlewares/common/verifyToken");

// create
router.post("/", verifyAdmin, createHotel);
// update
router.put("/:id", verifyAdmin, updateHotel);
// delete
router.delete("/:id", verifyAdmin, deleteHotel);
// get
router.get("/find/:id", getHotel);
// get all
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
