const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balanceTo: String,
    balanceFrom: String,
    content: String,
    date: String,
    fromCount: String,
    toCount: String,
    dataType: String
  },
  {
    timestamps: true,
  }
);

module.exports = model('Translation', schema);
