const mongoose = require("mongoose");

// non-used model
const EventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  logo: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  payment_type: {
    type: String
  },
  min_no_of_students: {
    type: Number
  },
  max_no_of_students: {
    type: Number
  },
  event_type: {
    type: String
  },
  no_of_repetitions: {
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

module.exports = Event = mongoose.model("event", EventSchema);
