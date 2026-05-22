import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true,
      maxLength: [50, 'Name cannot be more than 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxLength: [500, 'Description cannot be more than 500 characters'],
    },
    image: {
      public_id: String,
      url: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null, // If null, it's a top-level category
    },
  },
  {
    timestamps: true,
  }
);

// Reverse populate with virtuals
categorySchema.virtual('subCategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
