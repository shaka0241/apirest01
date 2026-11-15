const Product = require("../models/Product");
const User = require("../models/User"); // Importado para registrar ambos modelos en Mongoose

// Los controladores implementan cada operación HTTP y traducen su resultado a JSON.
// Los errores de Mongoose se pasan al middleware central mediante next(error).

// GET /api/products: devuelve todos los productos, del más reciente al más antiguo.
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id: busca un producto por el identificador de MongoDB.
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado con ese ID",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products: crea un producto con los datos enviados en el cuerpo JSON.
const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id: actualiza los campos enviados y devuelve el documento nuevo.
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Devuelve el objeto actualizado y aplica validaciones del esquema
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "No se pudo actualizar: Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id: elimina el producto y devuelve el documento eliminado.
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "No se pudo eliminar: Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Exporta los controladores para que el router los asocie con sus endpoints.
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
