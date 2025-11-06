import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la categoría es obligatorio.'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
}, {
  timestamps: true // Añade createdAt y updatedAt
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;