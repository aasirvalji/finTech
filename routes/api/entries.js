const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Entry = require("../../models/Entry");
const { query } = require("express");

// POST api/entries
// Create an entry
router.post(
  "/",
  async (req, res) => {
    try {
      // const {actions} = (await Action.find())[0];
      // console.log(req.body)
      // var queryActions = [];
      // var totalScore = 0;

      // for (var i = 0; i < actions.length; i++){
      //   var splitActions = actions[i].split(":");
      //   for (var j = 0; j < splitActions.length - 1; j++){
      //     var querySplit = req.body.query.split(' ');
      //     for (var k = 0; k < querySplit.length; k++){
      //       if (querySplit[k] === splitActions[j]){
      //         queryActions.push({ text: querySplit[k], score: parseFloat(splitActions[splitActions.length - 1])});
      //         totalScore += parseFloat(splitActions[splitActions.length - 1])
      //       }
      //     }
      //   }
      // }


      // const newEntry = {
      //   user: req.user.id,
      //   date: req.body.date,
      //   query: req.body.query,
      //   actions: queryActions,
      //   totalScore: totalScore
      // }

      console.log(req.body);

      // const entry = await newEntry.save();

      // res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// GET api/entries
// Get all entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/entries/:id
// @desc     Get entry by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    const user = await User.findById(req.user.id);
   
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// GET api/entries/:demo_user_id
// Get (DEMO) all entries
router.get("/demo/:demo_user_id", async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.params.demo_user_id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
