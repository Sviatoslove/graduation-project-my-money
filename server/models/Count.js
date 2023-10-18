const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String ,
    currency: String,
    icon: String,
    content: String,
    balance: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Count', schema);