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
},
{ timestamps: true }
);

module.exports = mongoose.model('ShowTime', ShowtimeSchema);