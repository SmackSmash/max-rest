const Order = require('../models/order');
const Product = require('../models/product');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .select('-__v')
      .populate('product', '-__v');
    const response = {
      count: orders.length,
      orders: orders.map(({ _doc }) => ({
        ..._doc,
        request: {
          type: 'GET',
          url: `http://localhost:5000/orders/${_doc._id}`
        }
      }))
    };
    res.send(response);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.addOrder = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  const order = new Order({
    product: productId,
    quantity
  });
  try {
    await order.save();
    res.status(201).send({
      message: 'Added order',
      order,
      request: {
        type: 'GET',
        url: `http://localhost:5000/orders/${order._id}`
      }
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .select('-__v')
      .populate('product', '-__v');
    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }
    res.send({
      order,
      request: {
        type: 'GET',
        url: `http://localhost:5000/orders/${req.params.id}`
      }
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }
    const response = {
      message: 'Order deleted',
      order
    };
    res.send(response);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
