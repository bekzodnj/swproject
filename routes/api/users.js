const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('secretQuestion', 'Secret question is required').not().isEmpty(),
    check('secretAnswer', 'Secret answer is required').not().isEmpty(),
    check('role', 'User role is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with minimum 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, secretQuestion, secretAnswer, role } =
      req.body;

    try {
      // check if user/email exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        secretQuestion,
        secretAnswer,
        role,
      });

      // hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/admin
// @desc    Get all teachers
// @access  Public
router.get('/admin', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).sort({ date: -1 });
    res.json(teachers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/teacher/:teacher_id
// @desc    Activate
// @access  Public
router.get('/teacher/:teacher_id', async (req, res) => {
  try {
    const teacher = await Profile.findOne({
      user: req.params.teacher_id,
    }).populate('user', ['_id', 'name', 'email']);

    res.json(teacher);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/admin
// @desc    Activate
// @access  Public
router.post('/admin/activate/:teacher_id', async (req, res) => {
  try {
    const teacher = await User.findOne({
      role: 'teacher',
      _id: req.params.teacher_id,
    });

    teacher.is_teacher = true;
    await teacher.save();

    res.json(teacher);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/admin
// @desc    Deactivate
// @access  Public
router.post('/admin/deactivate/:teacher_id', async (req, res) => {
  try {
    const teacher = await User.findOne({
      role: 'teacher',
      _id: req.params.teacher_id,
    });

    teacher.is_teacher = false;
    await teacher.save();

    res.json(teacher);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
