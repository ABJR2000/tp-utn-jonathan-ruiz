import Product from '../models/productModel.js';

// CREATE
export const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// READ ALL (con paginación y populate)
export const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  // Usamos .populate('category') para incluir los datos completos de la categoría referenciada
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate('category', 'name description') // Solo incluimos nombre y descripción de la categoría
    .exec();
    
  const total = await Product.countDocuments();
  
  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

// READ BY ID
export const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category', 'name description');
  
  if (!product) {
    throw new Error('Producto no encontrado.');
  }
  return product;
};

// UPDATE
export const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  }).populate('category', 'name description');
  
  if (!product) {
    throw new Error('Producto no encontrado para actualizar.');
  }
  return product;
};

// DELETE
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  
  if (!product) {
    throw new Error('Producto no encontrado para eliminar.');
  }
  return { message: 'Producto eliminado exitosamente.' };
};