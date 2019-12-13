const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  min_no_of_students: {
    type: Number
  },
  max_no_of_students: {
    type: Number
  },
  duration: {
    type: Number
  },
  address: {
    type: String
  },
  cost: {
    type: Number
  },
  valid_from: {
    type: Date,
    default: Date.now
  },
  expiriy_date: {
    type: Date
  },
  info: {
    type: String
  },
  detailed_info: {
    type: String
  }
});

module.exports = Service = mongoose.model("service", EventSchema);
