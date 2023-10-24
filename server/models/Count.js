const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String ,
    content: String,
    type: String,
    currency: String,
    icon: String,
    like: Boolean,
    balance: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalBalance: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Count', schema);