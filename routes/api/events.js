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

// @route   POST api/events/update
// @desc    Create or update user profile - 2nd WAY TO UPDATE MANY
// @access  Private
router.post(
  "/update/:event_id",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("category", "category is required")
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
      //let event = await Event.find({ user: req.user.id, title: title });

      const event1 = await Event.find({
        user: req.user.id,
        _id: req.params.event_id
      }).populate("user", ["name"]);

      if (!event1) return res.status(400).json({ msg: "Event1 is not found" });

      const event_name = event1[0].title;
      //if exists update

      if (event1) {
        await Event.updateMany(
          { user: req.user.id, title: event_name },
          { $set: eventFields },
          { new: true }
        );

        const event = await Event.find({
          user: req.user.id,
          title: title
        }).populate("user", ["name"]);

        return res.json(event);
      } else {
        return res.status(400).json({ msg: "There is no event for this user" });
      }

      // create a new profile
      // profile = new Profile(profileFields);

      // await profile.save();
      // res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/events/edit/:event_id
// @desc    Create or update user profile
// @access  Private
router.post(
  "/edit/:event_id",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("category", "category is required")
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
      const event1 = await Event.findOne({
        user: req.user.id,
        _id: req.params.event_id
      }).populate("user", ["name"]);

      if (!event1) return res.status(400).json({ msg: "Event1 is not found" });

      if (event1) {
        const event2 = await Event.findOneAndUpdate(
          { user: req.user.id, _id: req.params.event_id },
          { $set: eventFields },
          { neew: true }
        );

        return res.json(event2);
      } else {
        return res.status(400).json({ msg: "There is no event for this user" });
      }

      // create a new profile
      // profile = new Profile(profileFields);

      // await profile.save();
      // res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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

// @route   DELETE api/events/:event_id
// @desc    Delete event by its id
// @access  Private
router.delete("/:event_id", auth, async (req, res) => {
  try {
    // deletes the profile
    await Event.findOneAndRemove({
      user: req.user.id,
      _id: req.params.event_id
    });

    res.json({ msg: "Event deleted" });
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post is not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
