const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const path = require('path')
const auth = require("../../middleware/auth");


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// POST api/users
// register user
router.post(
  "/",
  async (req, res) => {

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //checking to see if user exists  by email
      console.log(req.body)
      if (user) {
        //if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] }); //to keep consistent with line 25 errors.array()
      }

      user = new User({
        //create a new instance of the user model
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save(); //save to mongodb, returns a promise with user db info (including .id)

      const payload = {
        user: {
          id: user.id, //.id instead of _id due to mongoose abstraction
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //if no error, send token back to client
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


module.exports = router;
