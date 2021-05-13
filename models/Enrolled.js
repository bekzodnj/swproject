const mongoose = require('mongoose');

const EnrolledSchema = mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
  },
  requestedDates: {
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Enrolled = mongoose.model('enrolled', EnrolledSchema);
