const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  recur_weeks: {
    type: Number,
    default: 0,
  },
  working_times: [
    {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    },
  ],
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);
