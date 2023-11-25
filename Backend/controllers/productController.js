const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const imagesFolderPath = './public/uploads';
const pythonScriptPath = './plot.py'; // Replace with the actual path

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate('reviews');

  if (!product) {
    throw new CustomError.NotFoundError(`No movie with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No movie with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No movie with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! movie removed.' });
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

const getStat = async (req, res) => {
  try {
    // Execute the Python script to generate images
    const { stdout, stderr } = await exec(`python ${pythonScriptPath}`);

    if (stderr) {
      console.error(`Error executing Python script: ${stderr}`);
      return res.status(500).send('Error generating images');
    }

    // Read the generated images
    const movieRatingsImagePath = path.join(imagesFolderPath, 'top_rated_movies.jpg');
    const numOfReviewsImagePath = path.join(imagesFolderPath, 'top_reviewed_movies.jpg');

    if (!fs.existsSync(movieRatingsImagePath) || !fs.existsSync(numOfReviewsImagePath)) {
      console.error('Error: Plot images not found');
      return res.status(500).send('Error generating images');
    }

    const movieRatingsImage = fs.readFileSync(movieRatingsImagePath);
    const numOfReviewsImage = fs.readFileSync(numOfReviewsImagePath);

    // Set the content type to image/jpeg
    res.contentType('image/jpeg');

    // Send the images as the response
    res.write(movieRatingsImage, 'binary');
    res.write(numOfReviewsImage, 'binary');
    res.end(null, 'binary');
  } catch (error) {
    console.error(`Error executing Python script: ${error.message}`);
    res.status(500).send('Error generating images');
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getStat
};
