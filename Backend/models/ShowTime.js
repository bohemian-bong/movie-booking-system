const mongoose = require('mongoose');

const ShowtimeSchema = mongoose.Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('ShowTime', ShowtimeSchema);
