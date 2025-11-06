import * as categoryService from '../services/categoryService.js';

// Crear una nueva categoría (POST /api/categories)
export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ 
      success: true, 
      data: category,
      message: 'Categoría creada exitosamente.'
    });
  } catch (error) {
    // 400 Bad Request si falla la validación de Mongoose o es duplicada
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Obtener todas las categorías (GET /api/categories)
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ 
      success: true, 
      count: categories.length, 
      data: categories 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener categorías.' 
    });
  }
};

// Obtener una categoría por ID (GET /api/categories/:id)
export const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({ 
      success: true, 
      data: category 
    });
  } catch (error) {
    // 404 Not Found si el servicio lanza la excepción
    res.status(404).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Actualizar una categoría (PUT /api/categories/:id)
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({ 
      success: true, 
      data: category,
      message: 'Categoría actualizada exitosamente.'
    });
  } catch (error) {
    // 404 si no se encuentra, 400 si falla la validación
    res.status(error.message.includes('encontrada') ? 404 : 400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Eliminar una categoría (DELETE /api/categories/:id)
export const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
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