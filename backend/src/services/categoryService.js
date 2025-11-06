import Category from '../models/categoryModel.js';

// CREATE
export const createCategory = async (categoryData) => {
  // Se podría incluir lógica de negocio adicional aquí
  const category = new Category(categoryData);
  await category.save();
  return category;
};

// READ ALL
export const getAllCategories = async () => {
  return await Category.find({});
};

// READ BY ID
export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  // La lógica de verificar si existe el recurso queda en el Servicio
  if (!category) {
    throw new Error('Categoría no encontrada.');
  }
  return category;
};

// UPDATE
export const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, {
    new: true, // Devuelve el documento actualizado
    runValidators: true // Ejecuta validaciones del esquema
  });
  
  if (!category) {
    throw new Error('Categoría no encontrada para actualizar.');
  }
  return category;
};

// DELETE
export const deleteCategory = async (id) => {
  // Nota: En un entorno real, se debería verificar si hay productos asociados antes de eliminar.
  const category = await Category.findByIdAndDelete(id);
  
  if (!category) {
    throw new Error('Categoría no encontrada para eliminar.');
  }
  return { message: 'Categoría eliminada exitosamente.' };
};