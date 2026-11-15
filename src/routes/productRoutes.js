const express = require("express");
const router = express.Router();
// El router asocia los verbos y segmentos URL con las funciones de los controladores.
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Al montarse en /api/products, "/" corresponde a /api/products y "/:id"
// captura el identificador enviado en la URL.
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// El archivo principal monta este router bajo el prefijo /api/products.
module.exports = router;
