const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Schedule = require('../../models/Schedule');

// @route   POST api/schedule/
// @desc    Create a new schedule
// @access  Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recur_weeks, working_times } = req.body;

  const schedule_obj = {};

  //adding userId
  schedule_obj.user = req.user.id;

  // adding other fields
  if (recur_weeks) schedule_obj.recur_weeks = recur_weeks;
  if (working_times) schedule_obj.working_times = working_times;

  try {
    // CreateOrUpdate schedule
    // Filter by UserId

    const schedule_new = await Schedule.findOneAndUpdate(
      { user: req.params.id },
      { $set: schedule_obj },
      { upsert: true }
    );

    return res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
