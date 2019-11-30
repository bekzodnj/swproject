const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");

const nodemailer = require("nodemailer");

// @route   GET api/studentsAuth
// @desc    Test Route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/studentsAuth
// @desc    Login user
// @access  Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user/email exists
      let user = await Student.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // comparing
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/studentsAuth/recovery
// @desc    Password Recovery
// @access  Public
router.post(
  "/recovery",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("secretQuestion", "Secret question is required")
      .not()
      .isEmpty(),
    check("secretAnswer", "Secret answer is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, secretQuestion, secretAnswer } = req.body;

    try {
      // check if user/email exists
      let user = await Student.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This user do not exist" }] });
      }

      //then check if entered info is correct
      user = await Student.findOne({ email, secretQuestion, secretAnswer });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect credentials" }] });
      }

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bekzodlev@gmail.com",
          pass: "zzome.ru"
        }
      });

      const message_text = `<h2>You requested password recovery.</h2>
      <br>Here is the password (hash): <b>${user.password}</b>`;

      var mailOptions = {
        from: "bekzodlev@gmail.com",
        to: email,
        subject: "Password Recovery",
        html: message_text
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.json("Email sent");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/studentsAuth/recovery/set
// @desc    Password Setting new password
// @access  Public
router.post(
  "/recovery/set",
  [
    check("hash", "Please enter a valid hash value")
      .not()
      .isEmpty(),
    check("new_password", "New password is required")
      .not()
      .isEmpty(),
    check("confirm_new_password", "Confirmation is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hash, new_password, confirm_new_password } = req.body;

    if (new_password !== confirm_new_password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords does not match" }] });
    }

    try {
      // check if hash exists
      let user = await Student.findOne({ password: hash });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This hash do not exist" }] });
      }

      // updating one sample
      // user = await User.updateOne({ password: hash }, { name: "Bekzodjon" });

      // hash the password
      // and save new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(new_password, salt);

      await user.save();

      res.json("Success");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
