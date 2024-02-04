//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;
dotenv.config();

// internal imports
const hotelRouter = require("./router/hotelRouter");
const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const roomsRouter = require("./router/roomsRouter");
const { errorHandler } = require("./middlewares/common/errorHandler");

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
//
app.use(cors());
// request parsers
/*

In an Express.js application, the app.use(express.json()) middleware is used to parse incoming requests with JSON payloads. When a client sends data to the server, it's often sent in the body of the HTTP request, especially in the case of POST, PUT, and PATCH requests. This data is typically in JSON format.
The express.json() middleware parses the incoming JSON payload and makes it available in the request.body object. This allows you to easily work with the data sent by the client in your route handlers.
*/
app.use(express.json());

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// router setup
app.use("/hotel", hotelRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
//error handling

//common error handler
app.use(errorHandler);
// port
app.listen(port, () => {
  console.log(`Connected To Hotel Booking in ${port}`);
});
