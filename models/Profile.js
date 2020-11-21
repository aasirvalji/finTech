const mongoose = require("mongoose");
const geocoder = require('../utils/geocoder');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 200
  },
  gender: {
    type: String,
    required: true,
  },
  student: {
    type: Boolean,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  transactions: [
    {
      name: {
        type: String,
        required: false,
      },
      amount: {
        type: Number,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode & create location field
ProfileSchema.pre('save', async function (next) {
  
  // if new address
  if (this.address !== undefined){
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  }
  // Do not save address in DB
  this.address = undefined;
  next();
});


const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
