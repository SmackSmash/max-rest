const router = require('express').Router();
const Product = require('../models/product');

// @route   GET /products
// @desc    Get products
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   POST /products
// @desc    Add product
// @access  Private
router.post('/', async (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({
    name,
    price
  });
  try {
    await product.save();
    res.status(201).send({
      message: 'Add product',
      product
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   GET /products/:id
// @desc    Get product
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }
    res.send(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   PATCH /products/:id
// @desc    Update product
// @access  Private
router.patch('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }
    res.send(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }
    res.send(product);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
