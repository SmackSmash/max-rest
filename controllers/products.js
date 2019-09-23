const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().select('-__v');
    const response = {
      count: products.length,
      products: products.map(({ _doc }) => ({
        ..._doc,
        request: {
          type: 'GET',
          url: `http://localhost:5000/products/${_doc._id}`
        }
      }))
    };
    res.send(response);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  const { name, price } = req.body;
  const { destination, filename } = req.file;
  const product = new Product({
    name,
    price,
    image: destination + filename
  });
  try {
    await product.save();
    res.status(201).send({
      message: 'Added product',
      product
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }
    res.send({
      product,
      request: {
        type: 'GET',
        url: `http://localhost:5000/products/${req.params.id}`
      }
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
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
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }
    const response = {
      message: 'Product deleted',
      product
    };
    res.send(response);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
