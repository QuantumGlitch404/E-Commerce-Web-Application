import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0.0,
    },
    originalPrice: {
      type: Number,
      default: 0.0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    colors: [String],
    sizes: [String],
    features: [String], // Array of short feature strings
    specifications: [
      {
        label: String,
        value: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create product slug from the name
productSchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  
  // Calculate discount percentage if original price is set and higher
  if (this.originalPrice > this.price) {
    this.discountPercentage = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  } else {
    this.discountPercentage = 0;
  }
});

// Create text index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1, price: 1, averageRating: -1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
