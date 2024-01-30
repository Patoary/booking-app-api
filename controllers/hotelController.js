
// internal imports
const Hotel = require("../models/Hotel");

// createHotel
const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
       const saveHotel = await newHotel.save();
       res.status(200).json(saveHotel);
      } catch (err) {
        next(err);
      }
};
// updateHotel
const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};
// deleteHotel
const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findOneAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
// getHotel
const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
// getAllHotels
const getHotels = async (req, res, next) => {
    try {
        const hotel = await Hotel.find();
        res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
};
