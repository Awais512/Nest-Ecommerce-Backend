import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Features from '../utils/Features.js';

//Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const features = new Features(Product.find(), req.query).search().filter();
  const products = await features.query;
  res.status(200).json({ success: true, products });
});

//Get Single Product
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return new ErrorResponse(
      `Product does not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json(product);
});

//Create Product By Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//Update Product by Admin
const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return new ErrorResponse(
      `Product does not found with the id of ${req.params.id}`,
      404
    );
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({ success: true, product });
});

//Delete Product By Admin
const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return new ErrorResponse(
      `Product does not found with the id of ${req.params.id}`,
      404
    );
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: 'Product Deleted Successfully' });
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
