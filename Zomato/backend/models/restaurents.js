const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: [String], // Array of cuisines
  contact: { type: String },
  rating: { type: Number, default: 0 },
  images: [String], // Array of image URLs
  description: { type: String },
  priceRange: { type: String },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
