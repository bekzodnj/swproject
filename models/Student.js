const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Student = mongoose.model("student", StudentSchema);
