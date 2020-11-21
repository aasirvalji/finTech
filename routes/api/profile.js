const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const path = require('path')
const auth = require("../../middleware/auth");

// Create profile
router.post('/', auth, async (req, res, next) => {
    let profile = await Profile.findById(req.params.id)

    if (profile) return res.status(400).json({ message: 'Profile already exists'});
  
    profile = await Profile.create(req.body);
  
    return res.status(200).json({ success: true, data: user });
  });


// Update profile info
router.put('/:id', auth, async (req, res, next) => {
    let user = await User.findById(req.user.id);
    
    if (!user) return res.status(400).json({ message: 'User does not exist'});

    let profile = await Profile.findById(req.params.id)
  
    // Make sure user is bootcamp owner
    if (profile.user !== req.user.id)  return status(400).json({ message: 'Unauthorized'})
  
    if (req.body.address){
      profile.address = req.body.address
      await profile.save();
    }

    if (req.body.transactions){
        profile.transactions.push(req.body.transactions);
        await profile.save();
        delete req.body.transactions
      }
  
    profile = await Profile.findByIdAndUpdate(user.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    return res.status(200).json({ success: true, data: user });
  });

  module.exports = router;