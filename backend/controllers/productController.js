import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all products with filtering, sorting, pagination, search
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = {};

  if (req.query.category) filter.category = req.query.category;
  if (req.query.brand) filter.brand = { $regex: req.query.brand, $options: 'i' };
  if (req.query.featured) filter.isFeatured = req.query.featured === 'true';
  if (req.query.newArrival) filter.isNewArrival = req.query.newArrival === 'true';
  if (req.query.bestSeller) filter.isBestSeller = req.query.bestSeller === 'true';

  // Price range
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  // Rating filter
  if (req.query.rating) {
    filter.averageRating = { $gte: Number(req.query.rating) };
  }

  // Sale items (has discount)
  if (req.query.sale === 'true') {
    filter.discountPercentage = { $gt: 0 };
  }

  // Text search
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  // Sort
  let sort = {};
  if (req.query.sort) {
    const sortMap = {
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
      'newest': { createdAt: -1 },
      'rating': { averageRating: -1 },
      'popular': { numOfReviews: -1 },
    };
    sort = sortMap[req.query.sort] || { createdAt: -1 };
  } else {
    sort = { createdAt: -1 };
  }

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate('category', 'name slug')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  ApiResponse.success(res, 200, 'Products fetched successfully', {
    products,
    page,
    pages: Math.ceil(total / limit),
    total,
    count: products.length,
  });
});

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name slug');

  if (!product) {
    return next(new ApiError('Product not found', 404));
  }

  ApiResponse.success(res, 200, 'Product fetched successfully', product);
});

// @desc    Create a product (admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  ApiResponse.success(res, 201, 'Product created successfully', product);
});

// @desc    Update a product (admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ApiError('Product not found', 404));
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  ApiResponse.success(res, 200, 'Product updated successfully', product);
});

// @desc    Delete a product (admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ApiError('Product not found', 404));
  await product.deleteOne();
  ApiResponse.success(res, 200, 'Product deleted successfully', {});
});
