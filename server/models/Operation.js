const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    countId: { type: Schema.Types.ObjectId, ref: 'Count', required: true },
    name: String,
    content: String,
    date: String,
    balance: String,
    status: String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Operation', schema);