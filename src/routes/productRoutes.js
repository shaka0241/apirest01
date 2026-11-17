import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Al montarse en /api/products, "/" corresponde a /api/products y "/:id"
// captura el identificador enviado en la URL.
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Exportación por defecto: el archivo principal importa este router y lo monta en /api/products.
export default router;
