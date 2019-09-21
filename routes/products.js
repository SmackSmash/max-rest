const router = require('express').Router();
const Product = require('../models/product');

// @route   GET /products
// @desc    Get products
// @access  Public
router.get('/', (req, res) => {
  res.send('Get products');
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
    console.log(error.message);
    next(error);
  }
});

// @route   GET /products/:id
// @desc    Get product
// @access  Public
router.get('/:id', (req, res) => {
  res.send('Get product');
});

// @route   PATCH /products/:id
// @desc    Update product
// @access  Private
router.patch('/:id', (req, res) => {
  res.send('Update product');
});

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete product');
});

module.exports = router;
