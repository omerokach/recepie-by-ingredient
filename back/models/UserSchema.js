const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const validator = require("email-validator");

const userSchema = new Schema({
  email: {
    required: [true, "Email required"],
    type: String,
    validate: {
      validator: function(v) {
        return/\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid Email!`
    },
    required: [true, 'User phone number required']
  },
  firstName: {
    required: [true, "First name required"],
    type: String,
  },
  lastName: {
    required: [true, "Last name required"],
    type: String,
  },
  password: {
    required: [true, "Password required"],
    minlength: [6 ,"Password must be 6 length minimum"],
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
