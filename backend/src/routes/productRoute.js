import express from 'express';
import * as productController from '../controllers/productController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Rutas protegidas (Requieren token para crear, actualizar y eliminar)
router.route('/')
  .post(verifyToken, productController.createProduct)
  .get(productController.getProducts); // Leer es público

router.route('/:id')
  .get(productController.getProduct) // Leer es público
  .put(verifyToken, productController.updateProduct)
  .delete(verifyToken, productController.deleteProduct);

export default router;