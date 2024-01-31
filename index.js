//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 4000;
dotenv.config();

app.use(cors());
app.use(express.json());

// internal imports
const hotelRouter = require("./router/hotelRouter");
const authRouter = require("./router/authRouter");

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("db connection successful");
  })
  .catch((err) => console.log(err));

//handle errors after initial connection was established
mongoose.connection.on("error", (err) => {
  logError(err);
});

// router setup
app.use("/hotel", hotelRouter);
app.use("/auth", authRouter);

// port
app.listen(port, () => {
  console.log(`Connected To Hotel Booking in ${port}`);
});
