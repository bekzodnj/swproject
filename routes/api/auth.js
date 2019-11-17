const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const nodemailer = require("nodemailer");

// @route   GET api/auth
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

// @route   POST api/auth
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
      let user = await User.findOne({ email });

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

// @route   POST api/auth/recovery
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

    const { email, password, secretQuestion, secretAnswer } = req.body;

    try {
      // check if user/email exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This user do not exist" }] });
      }

      //then check if entered info is correct
      user = await User.findOne({ email, secretQuestion, secretAnswer });
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

      var mailOptions = {
        from: "bekzodlev@gmail.com",
        to: "bekzodnx@gmail.com",
        subject: "Sending a pilot email :)",
        text: "<h1>Password Recovery</h1><p>Your password is: </p>!"
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

module.exports = router;
