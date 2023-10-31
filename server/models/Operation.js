const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    count: { type: Schema.Types.ObjectId, ref: 'Count', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    balance: String,
    content: String,
    date: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Operation', schema);