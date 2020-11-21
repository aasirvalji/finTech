const mongoose = require("mongoose");
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...".yellow);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
