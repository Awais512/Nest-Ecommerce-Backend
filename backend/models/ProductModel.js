import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add Product Name'],
      trim: true,
      maxlength: [20, 'Name Can not be exceeds more than 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add Product Description'],
      maxlength: [
        4000,
        'Description Can not be exceeds more than 4000 characters',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Please add Product Price'],
      maxlength: [8, 'Price can not be exceeds more than 8 characters'],
    },
    discountPrice: {
      type: String,
      maxlength: [
        4,
        'Discount Price can not be exceeds more than 4 characters',
      ],
    },
    color: { type: String },
    size: { type: String },
    ratings: { type: Number, default: 0 },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please add Product Category'],
    },
    Stock: {
      type: Number,
      required: [true, 'Please add Product Stocl'],
      maxlength: [3, 'Stock Can not be exceeds more than 3 characters'],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: { type: Number, required: true },
        comment: { type: String },
        time: { type: Date, default: Date.now() },
      },
    ],
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
