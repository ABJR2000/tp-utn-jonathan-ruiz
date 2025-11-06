import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio.'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio.'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio.'],
    min: 0,
    default: 0
  },
  category: {
    // Referencia al modelo Category
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: [true, 'La categoría es obligatoria.']
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;