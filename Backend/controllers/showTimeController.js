const ShowTime = require('../models/ShowTime');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createShowTime = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No showtime with id : ${productId}`);
  }

  const showtime = await ShowTime.create(req.body);
  res.status(StatusCodes.CREATED).json({ showtime });
};
const getAllShowTime = async (req, res) => {
  const showtimes = await ShowTime.find({});

  res.status(StatusCodes.OK).json({ showtimes, count: showtimes.length });
};
const getSingleShowTime = async (req, res) => {
  const { id: showtimeId } = req.params;

  const showtime = await ShowTime.findOne({ _id: showtimeId });

  if (!showtime) {
    throw new CustomError.NotFoundError(`No showtime with id ${showtimeId}`);
  }

  res.status(StatusCodes.OK).json({ showtime });
};
const updateShowTime = async (req, res) => {
  const { id: showtimeId } = req.params;
  const { startAt, startDate, endDate , price} = req.body;
  if (!startAt || !startDate || !endDate || !price) {
    throw new CustomError.BadRequestError('Please provide all values : startAt, startDate, endDate, price');
  }
  const showtime = await ShowTime.findOne({ _id: showtimeId });

  if (!showtime) {
    throw new CustomError.NotFoundError(`No showtime with id ${showtimeId}`);
  }

  showtime.endDate = endDate;
  showtime.startDate = startDate;
  showtime.startAt = startAt;
  showtime.price = price;

  await showtime.save();
  res.status(StatusCodes.OK).json({ showtime });
};
const deleteShowTime = async (req, res) => {
  const { id: showtimeId } = req.params;

  const showtime = await ShowTime.findOne({ _id: showtimeId });

  if (!showtime) {
    throw new CustomError.NotFoundError(`No showtime with id ${showtimeId}`);
  }

  await showtime.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! showtime removed' });
};

const getSingleProductShowTimes = async (req, res) => {
  const { id: productId } = req.params;
  const showtimes = await ShowTime.find({ product: productId });
  res.status(StatusCodes.OK).json({ showtimes, count: showtimes.length });
};




module.exports = {
    createShowTime,
    getAllShowTime,
    getSingleShowTime,
    updateShowTime,
    deleteShowTime,
    getSingleProductShowTimes
  };
