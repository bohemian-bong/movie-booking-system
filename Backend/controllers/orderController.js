const Order = require('../models/Order');
const Product = require('../models/Product');
const ShowTime = require('../models/ShowTime');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { showtime, amount , date } = req.body;

  if (!showtime) {
    throw new CustomError.BadRequestError('No showtime provided');
  }
  if (!amount || !date) {
    throw new CustomError.BadRequestError(
      'Please provide amount(of tickets) and the date of the movie'
    );
  }

    const dbShowTime = await ShowTime.findOne({ _id: showtime });
    if (!dbShowTime) {
      throw new CustomError.NotFoundError(
        `No showtime with id : ${showtime}`
      );
    }
    const { product, price,startAt, _id } = dbShowTime;
    const dbProduct = await Product.findOne({ _id: product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No movie with id : ${product}`
      );
    }

    const { name, image} = dbProduct;
    const singleOrderItem = {
      amount,
      name,
      image,
      price,
      startAt,
      showtime: _id,
      bookingDate: date
    };
    // calculate subtotal
    let subtotal = 0;
    subtotal = amount * price;
    let tax= subtotal * 0.18;
    let bookingFee = amount * 1;
  // calculate total
  const total =Math.ceil(tax + bookingFee + subtotal);

  // get client secret
  // const paymentIntent = await fakeStripeAPI({
  //   amount: total,
  //   currency: 'inr',
  // });
try{
      // create a payment intent with Stripe
 const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // amount in rupees
        currency: 'inr',
      });

  const order = await Order.create({
    orderItem: singleOrderItem,
    total,
    subtotal,
    tax,
    bookingFee,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    status: paymentIntent.status,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
}
    catch (error) {
      // Handle Stripe API errors
      console.error('Stripe API error:', error);
      throw new CustomError.InternalServerError('Error processing payment');
    }
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No booking with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No booking with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
