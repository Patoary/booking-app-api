const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("People", peopleSchema);
