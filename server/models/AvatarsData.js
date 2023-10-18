const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    names: [String],
    keys: [String],
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('AvatarsData', schema);
