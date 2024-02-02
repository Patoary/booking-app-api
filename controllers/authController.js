// external imports
const bcrypt = require("bcrypt");
// internal imports
const User = require("../models/People");
const createError = require("http-errors");
// registration process
const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// login process
const login = async (req, res, next) => {
  try {
    // find a user defend on username
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) throw createError("Login failed! Please try again");
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) throw createError("Login failed! Please try again");

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
