import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'dairy', 'meat', 'grains'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
