const router = require('express').Router();

// @route   GET /orders
// @desc    Get orders
// @access  Public
router.get('/', (req, res) => {
  res.send('Get orders');
});

// @route   POST /orders
// @desc    Add order
// @access  Private
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  const order = {
    productId,
    quantity
  };
  res.status(201).send({
    message: 'Add order',
    order
  });
});

// @route   GET /orders/:id
// @desc    Get order
// @access  Public
router.get('/:id', (req, res) => {
  res.send('Get order');
});

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete order');
});

module.exports = router;
