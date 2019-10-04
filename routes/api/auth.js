const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', auth, async (req, res)=> {

    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(401).send('Server error');
    }
});

module.exports = router;