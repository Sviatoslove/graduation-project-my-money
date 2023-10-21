const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String ,
    content: String,
    type: String,
    currency: String,
    icon: String,
    balance: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Count', schema);