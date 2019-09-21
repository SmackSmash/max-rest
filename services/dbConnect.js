const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => console.log('Connected to DB'));
