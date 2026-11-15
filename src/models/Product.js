const mongoose = require("mongoose");

// El esquema define los campos, tipos y reglas que debe cumplir cada producto.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: ["hardware", "perifericos", "software", "accesorios"],
    },
  },
  // Mongoose agrega createdAt/updatedAt y omite el campo interno __v.
  { timestamps: true, versionKey: false },
);

// El modelo conecta este esquema con la colección de productos de MongoDB.
module.exports = mongoose.model("Product", productSchema);
