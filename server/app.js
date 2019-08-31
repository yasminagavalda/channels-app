require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

console.log(`Listening on port ${PORT}`);

app.listen(PORT);