const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    content: String,
    type: String,
    dataType: String,
    currency: String,
    icon: String,
    like: Boolean,
    balance: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalBalance: String,
    masterCount: String,
    active: Boolean,
    color: String,
    textColor: String,
    typeName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Count', schema);
