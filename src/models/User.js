const mongoose = require("mongoose");

// Esquema de usuario disponible para ampliar la API; actualmente no hay rutas de usuarios.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  // Mantiene fechas de creación y modificación sin exponer el contador interno __v.
  { timestamps: true, versionKey: false },
);

// Mongoose usa el modelo para validar y consultar documentos de usuario.
module.exports = mongoose.model("User", userSchema);
