const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    countId: { type: Schema.Types.ObjectId, ref: 'Count', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    balance: Number,
    content: String,
    date: String,
    status: String,
    prevBalance: Number
  },
  {
    timestamps: true,
  }
);

module.exports = model('Operation', schema);