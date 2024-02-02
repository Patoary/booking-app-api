// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    //generate token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_SECRET_EXPIRY,
      }
    );
    //set coolie for batter security

    // separate user info and don't send in client side
    const { password, isAdmin, mobile, ...otherDetails } = user._doc;
    res
      // set cookie for security
      .cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_SECRET_EXPIRY,
        httpOnly: true,
        signed: true,
      })
      .status(200)
      .send({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
