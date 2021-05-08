const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userStorageSchema = new Schema({
  email: {
    required: true,
    type: String,
  },
  likedArray: {
    required: true,
    type: [Object],
  },
});

module.exports = mongoose.model("userStorage", userStorageSchema);
