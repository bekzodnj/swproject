const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   GET api/profle/me
// @desc    Get current users profile
// @access  Priate
router.get('/me', auth, async (req, res)=> {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profle/
// @desc    Create or update user profile
// @access  Priate
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
] ] , async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() }); 
    }
});

module.exports = router;