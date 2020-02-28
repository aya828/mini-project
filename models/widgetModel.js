const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WidgetSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },

  description: {
    type: String,
    trim: true
  },

  price: {
    type: Number
  },

  quantity: {
    type: Number,
    default: 100
  }
});

const Widget = mongoose.model("Widget", WidgetSchema);
module.exports = Widget;
