const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    dataType: String

  },
  {
    timestamps: true,
  }
);

module.exports = model('IconsForCategoriesData', schema);
