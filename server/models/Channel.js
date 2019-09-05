const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const collection = 'channels';

const ChannelSchema = new Schema(
  {
    title: { type: String, required: true },
    language: { type: String, required: true },
    picture: { type: String, required: true },
    subchannels: [{ type: ObjectId, ref: 'Channel' }],
    contents: [{ type: ObjectId, ref: 'Content' }],
    groups: [{ type: String }]
  },
  { collection }
);

const deepPopulate = function(next) {
  this.populate('subchannels').populate('contents');
  next();
};

ChannelSchema.pre('find', deepPopulate).pre('findOne', deepPopulate);

module.exports = mongoose.model('Channel', ChannelSchema);
