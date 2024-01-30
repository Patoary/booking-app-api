//external imports
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// internal imports
const Hotel = require("../models/Hotel");

// create
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update
router.put("/:id", async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// get
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all
router.get("/", async (req, res) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
