const router = require('express').Router();
const upload = require('../middleware/uploadImage');
const auth = require('../middleware/auth');
const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

// @route   GET /products
// @desc    Get products
// @access  Public
router.get('/', getProducts);

// @route   POST /products
// @desc    Add product
// @access  Private
router.post('/', auth, upload.single('image'), addProduct);

// @route   GET /products/:id
// @desc    Get product
// @access  Public
router.get('/:id', getProduct);

// @route   PATCH /products/:id
// @desc    Update product
// @access  Private
router.patch('/:id', auth, updateProduct);

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', auth, deleteProduct);

module.exports = router;
