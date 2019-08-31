const mongoose = require('mongoose');

const { Schema } = mongoose;
const collection = 'contents';

const ContentSchema = new Schema(
  {
    content: { type: Buffer, required: true },
    metadata: { type: Object, required: true },
    rating: { type: Number, required: true }
  },
  { collection }
);

module.exports = mongoose.model('Content', ContentSchema);
