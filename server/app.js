require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/channels-app';

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const app = express();

const PORT = process.env.PORT || 3000;

console.log(`Listening on port ${PORT}`);

app.listen(PORT);
