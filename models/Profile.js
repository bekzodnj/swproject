const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  lastname: {
    type: String
  },
  phone: {
    type: String
  },
  date_of_birth: {
    type: String
  },
  ac_degree: {
    type: String
  },
  ac_title: {
    type: String
  },
  ac_activities: {
    type: String
  },
  ac_works: {
    type: String
  },
  general_info: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
