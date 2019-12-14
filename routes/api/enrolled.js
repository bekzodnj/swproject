const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Event = require("../../models/Event");
const Service = require("../../models/Service");
const Enrolled = require("../../models/Enrolled");

// @route   POST api/enrolled/
// @desc    Create a new enrolled
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("teacher", "Teacher is required")
        .not()
        .isEmpty(),
      check("student", "Student is required")
        .not()
        .isEmpty(),
      check("service", "Service is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { student, teacher, service } = req.body;

    const eventFields = {};

    eventFields.student = req.user.id;
    eventFields.teacher = teacher;
    eventFields.service = service;

    try {
      enrolled = new Enrolled(eventFields);

      await enrolled.save();
      res.json(enrolled);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/services/edit/:event_id
// @desc    Edit an event with id
// @access  Private
router.post(
  "/edit/:service_id",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("category", "category is required")
        .not()
        .isEmpty(),
      check("subject", "Subject is required")
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
      subject,
      duration,
      category,
      min_no_of_students,
      max_no_of_students,
      address,
      cost,
      valid_from,
      expiry_date,
      info,
      detailed_info
    } = req.body;

    const eventFields = {};

    eventFields.user = req.user.id;

    if (title) eventFields.title = title;
    if (logo) eventFields.logo = logo;
    if (category) eventFields.category = category;
    if (subject) eventFields.subject = subject;
    if (duration) eventFields.duration = duration;

    if (min_no_of_students) eventFields.min_no_of_students = min_no_of_students;
    if (max_no_of_students) eventFields.max_no_of_students = max_no_of_students;

    if (address) eventFields.address = address;
    if (cost) eventFields.cost = cost;
    if (valid_from) eventFields.valid_from = valid_from;
    if (expiry_date) eventFields.expiry_date = expiry_date;
    if (info) eventFields.info = info;
    if (detailed_info) eventFields.detailed_info = detailed_info;

    try {
      const service = await Service.findOne({
        user: req.user.id,
        _id: req.params.service_id
      }).populate("user", ["name"]);

      if (!service)
        return res.status(400).json({ msg: "Service is not found" });

      if (service) {
        const service2 = await Service.findOneAndUpdate(
          { user: req.user.id, _id: req.params.service_id },
          { $set: eventFields },
          { new: true }
        );

        return res.json(service2);
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

// @route   GET api/enrolled/me
// @desc    Get current enrolls created by student
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const enrolled = await Enrolled.find({
      student: req.user.id
    }).populate("service");

    if (!enrolled) {
      return res.status(400).json({ msg: "There is service for this user" });
    }

    res.json(enrolled);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/services/:service_id
// @desc    Get specific service by id
// @access  Public
router.get("/:service_id", async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.service_id
    }).populate("user", ["name"]);

    if (!service) return res.status(400).json({ msg: "Service is not found" });

    return res.json(service);
    // create a new profile
    // profile = new Profile(profileFields);

    // await profile.save();
    // res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/services/
// @desc    Get all services
// @access  Public
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ created_at: -1 });

    return res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/services/:service_id
// @desc    Delete service by its id
// @access  Private
router.delete("/:service_id", auth, async (req, res) => {
  try {
    // deletes the profile
    await Service.findOneAndRemove({
      user: req.user.id,
      _id: req.params.service_id
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
