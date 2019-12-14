const mongoose = require("mongoose");

const EnrolledSchema = mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service"
  },
  is_approved: {
    type: Boolean,
    default: false
  }
});

module.exports = Enrolled = mongoose.model("enrolled", EnrolledSchema);
