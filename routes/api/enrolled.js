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

// @route   POST api/enrolled/:enroll_id
// @desc    Change enroll to approved = add event
// @access  Private
router.post("/:enroll_id", auth, async (req, res) => {
  try {
    const enrolled = await Enrolled.findOne({
      teacher: req.user.id,
      _id: req.params.enroll_id
    });

    if (!enrolled) {
      return res.status(400).json({ msg: "There is service for this user" });
    }

    enrolled.is_approved = true;

    await enrolled.save();

    res.json(enrolled);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/enrolled/teacher/me
// @desc    Get current enrolls created, view by teacher
// @access  Private
router.get("/teacher/me", auth, async (req, res) => {
  try {
    const enrolled = await Enrolled.find({
      teacher: req.user.id
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

// @route   DELETE api/enrolled/:enroll_id
// @desc    Delete enroll application by teacher
// @access  Private
router.delete("/:enroll_id", auth, async (req, res) => {
  try {
    // deletes the profile
    await Enrolled.findOneAndRemove({
      teacher: req.user.id,
      _id: req.params.enroll_id
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
