const router = require('express').Router();
const auth = require('../middleware/auth');
const { getOrders, addOrder, getOrder, deleteOrder } = require('../controllers/orders');

// @route   GET /orders
// @desc    Get orders
// @access  Public
router.get('/', getOrders);

// @route   POST /orders
// @desc    Add order
// @access  Private
router.post('/', auth, addOrder);

// @route   GET /orders/:id
// @desc    Get order
// @access  Public
router.get('/:id', getOrder);

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete('/:id', auth, deleteOrder);

module.exports = router;
