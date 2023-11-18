const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide movie name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide movie description'],
      maxlength: [2000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    genre: {
      type: [String],
      required: [true, 'Please provide movie genre'],
      enum: {
        values: ['Action', 'Adventure', 'Comedy','Horror','Romance','Thriller','Sci-Fi','Drama'],
        message: '{VALUE} is not supported as genre',
      },
    },
    cast: {
      type: [String], 
      required: false,
    },
    director: {
      type: String,
      required: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

movieSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'movie',
  justOne: false,
});

movieSchema.virtual('showtimes', {
  ref: 'ShowTime',
  localField: '_id',
  foreignField: 'movie',
  justOne: false,
});

movieSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ movie: this._id });
  await this.model('ShowTime').deleteMany({ movie: this._id });
});

module.exports = mongoose.model('movie', movieSchema);
