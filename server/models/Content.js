const mongoose = require('mongoose');

const { Schema } = mongoose;
const collection = 'contents';

const ContentSchema = new Schema(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
    metadata: { type: Object, required: true },
    rating: { type: Number, required: true }
  },
  { collection }
);

module.exports = mongoose.model('Content', ContentSchema);
