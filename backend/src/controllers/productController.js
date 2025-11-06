import * as productService from '../services/productService.js';

// Crear un nuevo producto (POST /api/products)
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ 
      success: true, 
      data: product,
      message: 'Producto creado exitosamente.'
    });
  } catch (error) {
    // 400 Bad Request si falla la validación de Mongoose
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Obtener todos los productos (GET /api/products)
export const getProducts = async (req, res) => {
  try {
    // Parámetros de paginación opcionales
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const products = await productService.getAllProducts(page, limit);
    res.status(200).json({ 
      success: true, 
      ...products 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener productos.' 
    });
  }
};

// Obtener un producto por ID (GET /api/products/:id)
export const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    res.status(404).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Actualizar un producto (PUT /api/products/:id)
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ 
      success: true, 
      data: product,
      message: 'Producto actualizado exitosamente.'
    });
  } catch (error) {
    res.status(error.message.includes('encontrado') ? 404 : 400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Eliminar un producto (DELETE /api/products/:id)
export const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({ 
      success: true, 
      data: {}, 
      message: result.message
    });
  } catch (error) {
    res.status(404).json({ 
      success: false, 
      message: error.message 
    });
  }
};