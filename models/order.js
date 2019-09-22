const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
