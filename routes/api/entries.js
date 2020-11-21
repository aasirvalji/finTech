const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Entry = require("../../models/Entry");

const { query } = require("express");
const dotenv = require('dotenv');
const language = require('@google-cloud/language');
const path = require('path');

// Creates a client
const client = new language.LanguageServiceClient();

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env')  });

// POST api/entries
// Create an entry
router.post(
  "/",
  auth,
  async (req, res) => {
    console.log(req.body)
    var languageProcessed = false
    var categoryName;
    var categoryConfidence;

    try {
      // Run language processing on input 
      // ----------------------------------------
      // Prepares a document, representing the provided text

      try{
        const document = {
          content: req.body.query,
          type: 'PLAIN_TEXT',
          };
          
          // Classifies text in the document
          const [classification] = await client.classifyText({document});
          console.log('Categories:');
          classification.categories.forEach(category => {
          console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
          categoryName = category.name;
          categoryConfidence = category.confidence;
          })

          languageProcessed = true;
      }
      catch (err){
        console.log(err)
      }

          // ----------------------------------------


      // Format data for database
      // Today, i bought a - , a -, a-, ...
      // On x, i bought a - , a -, a-, ...
      const splitQuery = req.body.query.split(' a ');
      var profile = await Profile.findOne({ user: req.user.id });
      var transactions = profile.transactions;
      var items = [];
      var total = 0;

      for (q of splitQuery){
        if (q.includes(' for $')){
          var split = q.split(' for $');
          total += parseFloat(split[1])
          items.push({ name: split[0], amount: split[1].split(' ')[0]});
        }
      }

      console.log(total, items);

      if (languageProcessed) transactions.push({  formattedDate: req.body.date, category: categoryName.split('/')[1], total, items })
      else transactions.push({  formattedDate: req.body.date, category: '', total, items })

      profile.transactions = transactions;

      const updatedProfile = await profile.save();

      res.json(updatedProfile);
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
