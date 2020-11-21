const mongoose = require('mongoose');

const DayEntrySchema = new mongoose.Schema({
    user: {
        //each post must be associated to a user, post can only be deleted by creating user
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      date: {
        type: String
      },
      query: {
          type: String
      },
      actions: [
        {
          // One comment template
          text: {
            type: String,
            required: true,
          },
          score: {
            type: Number,
            required: false
          }
        },
      ],
      totalScore: {
        type: Number
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('dayentry', DayEntrySchema);