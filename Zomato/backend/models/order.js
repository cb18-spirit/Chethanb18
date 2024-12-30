const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Reference to the restaurant
  items: [{ type: String, required: true }], // List of ordered items
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
