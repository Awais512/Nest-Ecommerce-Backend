import asyncHandler from 'express-async-handler';

//Get all Products
const getProducts = asyncHandler(async (req, res) => {
  res.send('All Products');
});

//Get Sungle Product
const getProduct = asyncHandler(async (req, res) => {
  res.send('Get Single Product');
});

//Create Product
const createProduct = asyncHandler(async (req, res) => {
  res.send('Create Product');
});

//Update Product
const updateProduct = asyncHandler(async (req, res) => {
  res.send('Update Product');
});

//Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  res.send('Delete Product');
});

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
