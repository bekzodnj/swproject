const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const StudentProfile = require("../../models/StudentProfile");
const Post = require("../../models/Post");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   GET api/studentProfile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      student: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/studentProfile/
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("lastname", "Last name is required")
        .not()
        .isEmpty(),
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("type", "Student type is required")
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
      lastname,
      name,
      billing_address,
      preferred_lang,
      date_of_birth,
      type,
      place_of_study,
      is_prepayment,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      date
    } = req.body;

    const profileFields = {};
    profileFields.student = req.user.id;

    if (lastname) profileFields.lastname = lastname;
    if (name) profileFields.name = name;
    if (billing_address) profileFields.billing_address = billing_address;
    if (preferred_lang) profileFields.preferred_lang = preferred_lang;
    if (date_of_birth) profileFields.date_of_birth = date_of_birth;
    if (type) profileFields.type = type;
    if (place_of_study) profileFields.place_of_study = place_of_study;
    if (is_prepayment) profileFields.is_prepayment = is_prepayment;
    if (date) profileFields.date = date;

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await StudentProfile.findOne({ student: req.user.id });

      //if exists update
      if (profile) {
        profile = await StudentProfile.findOneAndUpdate(
          { student: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // create a new profile
      profile = new StudentProfile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/studentProfile/
// @desc    get users profile
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await StudentProfile.find().populate("user", [
      "name",
      "avatar"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/studentProfile/student/:student_id
// @desc    get students profile by id
// @access  Public
router.get("/student/:student_id", async (req, res) => {
  try {
    const profile = await StudentProfile.find({
      student: req.params.student_id
    }).populate("students", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Student is not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "User is not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profle/
// @desc    Delete users profile and user, posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // here goes delete posts
    await Post.deleteMany({ user: req.user._id });

    // deletes the profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // deletes the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profle/experience
// @desc    Update profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company name is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
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
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // unshift added the elem to the start of array
      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profle/experience/:exp_id
// @desc    delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map(el => el.id)
      .indexOf(req.params.exp_id);

    // remove the experience from array
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profle/education
// @desc    Update profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // unshift added the elem to the start of array
      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profle/education/:edu_id
// @desc    delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map(el => el.id)
      .indexOf(req.params.edu_id);

    // remove the education from array
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
