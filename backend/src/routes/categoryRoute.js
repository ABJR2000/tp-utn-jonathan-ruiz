import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Rutas protegidas (Requieren token para crear, actualizar y eliminar)
router.route('/')
  .post(verifyToken, categoryController.createCategory)
  .get(categoryController.getCategories); // Leer es público

router.route('/:id')
  .get(categoryController.getCategory) // Leer es público
  .put(verifyToken, categoryController.updateCategory)
  .delete(verifyToken, categoryController.deleteCategory);

export default router;