const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  productName: String,
  orderId: String,
  price: Number,
  orderDate: Date,
  status: String,
  expectedDelivery: Date,
});

module.exports = mongoose.model('Order', orderSchema);
