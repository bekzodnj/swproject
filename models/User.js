const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  secretQuestion: {
    type: String
  },
  secretAnswer: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  is_teacher: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
