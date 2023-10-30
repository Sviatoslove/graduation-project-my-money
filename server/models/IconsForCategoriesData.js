const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    active: Boolean,
    color: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('IconsForCategoriesData', schema);
