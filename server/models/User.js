const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: String,
    sex: { type: String, enum: ['male', 'female'] },
    masterCount:String, 
    pageSizeOperations: Number
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
