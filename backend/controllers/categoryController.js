import Category from '../models/Category.js';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get all categories with product count
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  // Add product count for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const count = await Product.countDocuments({ category: cat._id });
      return { ...cat.toObject(), productCount: count };
    })
  );

  ApiResponse.success(res, 200, 'Categories fetched', categoriesWithCount);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new ApiError('Category not found', 404));
  ApiResponse.success(res, 200, 'Category fetched', category);
});

// @desc    Create category (admin)
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  ApiResponse.success(res, 201, 'Category created', category);
});
