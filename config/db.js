const mongoose = require('mongoose');

// global var manager
const config = require('config');

// getting val from global var manager json file

// connecting db promise-based
const connectDB = async (MONGO_URI) => {
  try {
    // connecting, returns a promise
    // we should send some params to server
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database connected...');
  } catch (err) {
    console.error(err.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
