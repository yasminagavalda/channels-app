require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const api = require('./api');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/channels-app';

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api', api);

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
