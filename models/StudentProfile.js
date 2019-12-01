const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student"
  },
  lastname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  billing_address: {
    type: String
  },
  preferred_lang: {
    type: String
  },
  date_of_birth: {
    type: Date
  },
  type: {
    type: String
  },
  place_of_study: {
    type: String
  },
  is_prepayment: {
    type: Boolean,
    default: false
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = StudentProfile = mongoose.model(
  "studentProfile",
  StudentProfileSchema
);
