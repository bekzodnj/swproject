const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const BlogPost = require('../../models/BlogPost');

// @route   POST api/blogpost/
// @desc    Create a new blogpost
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Blogpost Title is required').not().isEmpty(),
      check('textBody', 'Body is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, textBody } = req.body;

    //setting up a new blogpost object
    const blog_obj = {};

    //required fields
    //same as BlogPostSchema
    blog_obj.user = req.user.id;
    if (title) blog_obj.title = title;
    if (textBody) blog_obj.textBody = textBody;

    try {
      newBlog_obj = new BlogPost(blog_obj);

      await newBlog_obj.save();
      res.json(newBlog_obj);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/blogpost/edit/:post_id
// @desc    Edit a blogpost with id
// @access  Private
router.post(
  '/edit/:post_id',
  [
    auth,
    [
      check('title', 'Blogpost Title is required').not().isEmpty(),
      check('textBody', 'Body is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, textBody } = req.body;

    //setting up a new blogpost object
    const blog_obj = {};

    //required fields
    //same as BlogPostSchema
    blog_obj.user = req.user.id;
    if (title) blog_obj.title = title;
    if (textBody) blog_obj.textBody = textBody;

    try {
      const new_blog_obj = await BlogPost.findOne({
        user: req.user.id,
        _id: req.params.post_id,
      }).populate('user', ['name']);

      if (!new_blog_obj)
        return res.status(400).json({ msg: 'Post is not found' });

      if (new_blog_obj) {
        const new_blog_obj2 = await BlogPost.findOneAndUpdate(
          { user: req.user.id, _id: req.params.post_id },
          { $set: blog_obj },
          { new: true }
        );

        return res.json(new_blog_obj2);
      } else {
        return res.status(400).json({ msg: 'There is no event for this user' });
      }

      // create a new profile
      // profile = new Profile(profileFields);

      // await profile.save();
      // res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/services/me
// @desc    Get current events created by teacher
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await BlogPost.find({ user: req.user.id }).populate('user', [
      'name',
    ]);

    if (!posts) {
      return res.status(400).json({ msg: 'There is post for this user' });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/blogpost/:post_id
// @desc    Get specific post by id
// @access  Public
router.get('/:post_id', async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      _id: req.params.post_id,
    }).populate('user', ['name']);

    if (!post) return res.status(400).json({ msg: 'Post is not found' });

    return res.json(post);
    // create a new profile
    // profile = new Profile(profileFields);

    // await profile.save();
    // res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/blogpost/
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/services/:service_id
// @desc    Delete post by its id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    // deletes the profile
    await BlogPost.findOneAndRemove({
      user: req.user.id,
      _id: req.params.post_id,
    });

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);

    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
