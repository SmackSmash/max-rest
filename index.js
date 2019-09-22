const express = require('express');
const morgan = require('morgan');
const { port } = require('./config/keys');

const app = express();
require('./services/dbConnect');

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Server logging
app.use(morgan('tiny'));

// Serve images from static folder
app.use('/uploads', express.static('uploads'));

// CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.send({});
  }
  next();
});

// Routes
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    errors: [error.message]
  });
});

// Initialization
app.listen(port, () => console.log(`Listening on port ${port}`));
