const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dataType:String,
    name: String,
    content: String,
    icon: String,
    iconColor: String,
    textColor: String,
    bgColor: String,
    status: String,
    iconId: String,
    like: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model('Category', schema);
