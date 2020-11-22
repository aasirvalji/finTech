const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const path = require('path')
const auth = require("../../middleware/auth");

// get logged in user profile
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id, //find profile by user id
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create new profile
router.post('/', auth, async (req, res, next) => {
    let profile = await Profile.findOne({ user: req.user.id})

    if (profile) return res.status(400).json({ message: 'Profile already exists'});

    var body = req.body;
    body.user = req.user.id;
    body.age = parseInt(body.age);
    body.gender = body.gender.toUpperCase();
    body.student = body.student.toUpperCase() === 'Y' ? true : false;
    body.salary = parseInt(body.salary);
    // body.address = body.address

    profile = await Profile.create(req.body);
  
    return res.status(200).json({ success: true, data: profile });
  });


// Update profile info
router.put('/', auth, async (req, res, next) => {
    let profile = await Profile.findOne({ user: req.user.id});
    
    if (!profile) return res.status(400).json({ message: 'Profile does not exist'});

    var body = req.body;
    body.user = req.user.id;
    body.age = parseInt(body.age);
    body.gender = body.gender.toUpperCase();
    body.student = body.student.toUpperCase() === 'Y' ? true : false;
    body.salary = parseInt(body.salary);

    if (req.body.address){
      profile.address = req.body.address
      await profile.save();
    }

    if (req.body.transactions){
        profile.transactions.push(req.body.transactions);
        await profile.save();
        delete req.body.transactions
      }
  
    profile = await Profile.findByIdAndUpdate(req.user.id, body, {
      new: true,
      runValidators: true,
    });
  
    return res.status(200).json({ success: true, data: profile });
  });

  // Update profile info
router.post('/aws/image', auth, async (req, res, next) => {
  console.log('reached', req.body)
  let profile = await Profile.findOne({ user: req.user.id});
  let user = await User.findById(req.user.id);

  if (!profile) return res.status(400).json({ message: 'Profile does not exist'});

  var newReceipts = [];

  if (profile.receipts.length > 0) newReceipts = profile.receipts

  var unique = true;
  for (var i = 0; i < newReceipts.length; i++){
    if (newReceipts[i] === req.body.imgUrl) {
    unique = false;
    break;
    }
  }

  if (unique){
  newReceipts.push(`${user.email}-${req.body.imgUrl}`)

  profile.receipts = newReceipts;

  await profile.save();

  return res.status(200).json({ success: true, data: profile });
  }
  else return res.status(200).json({ success: true, data: profile });
});

  module.exports = router;