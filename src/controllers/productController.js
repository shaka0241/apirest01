const Product = require("../models/Product");
const User = require("../models/User"); // Importado para registrar ambos modelos en Mongoose

// 1. GET /api/products - Obtener todos los productos
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

// 2. GET /api/products/:id - Obtener un producto por ID
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

// 3. POST /api/products - Crear un nuevo producto
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

// 4. PUT /api/products/:id - Actualizar un producto existente
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

// 5. DELETE /api/products/:id - Eliminar un producto
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
