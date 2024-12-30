const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Reference to the orders collection
});

const User = mongoose.model('User', userSchema);

module.exports = User;
