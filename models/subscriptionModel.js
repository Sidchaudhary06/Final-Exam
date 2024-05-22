const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  user_id: { type: String, required: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);