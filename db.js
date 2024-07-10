const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  const URI = process.env.MONGODB_URI;
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
module.exports = connectDB;
