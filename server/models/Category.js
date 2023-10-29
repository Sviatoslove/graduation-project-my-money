const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    content: String,
    icon: String,
    iconColor: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Category', schema);