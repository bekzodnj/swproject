const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Event = require("../../models/Event");

// @route   POST api/events/
// @desc    Create a new event
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("category", "Category is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      logo,
      category,
      payment_type,
      min_no_of_students,
      max_no_of_students,
      event_type,
      no_of_repetitions,
      address,
      cost,
      valid_from,
      expiry_date,
      info,
      detailed_info,
      start,
      end
    } = req.body;

    const eventFields = {};

    eventFields.user = req.user.id;

    if (title) eventFields.title = title;
    if (logo) eventFields.logo = logo;
    if (category) eventFields.category = category;
    if (payment_type) eventFields.payment_type = payment_type;
    if (min_no_of_students) eventFields.min_no_of_students = min_no_of_students;
    if (max_no_of_students) eventFields.max_no_of_students = max_no_of_students;
    if (event_type) eventFields.event_type = event_type;
    if (no_of_repetitions) eventFields.no_of_repetitions = no_of_repetitions;
    if (address) eventFields.address = address;
    if (cost) eventFields.cost = cost;
    if (valid_from) eventFields.valid_from = valid_from;
    if (expiry_date) eventFields.expiry_date = expiry_date;
    if (info) eventFields.info = info;
    if (detailed_info) eventFields.detailed_info = detailed_info;
    if (start) eventFields.start = start;
    if (end) eventFields.end = end;

    try {
      event = new Event(eventFields);

      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/events/me
// @desc    Get current events created by teacher
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const event = await Event.find({ user: req.user.id }).populate("user", [
      "name"
    ]);

    if (!event) {
      return res.status(400).json({ msg: "There is event for this user" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
