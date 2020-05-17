const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
  },
  textBody: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BlogPost = mongoose.model('blogPost', BlogPostSchema);
