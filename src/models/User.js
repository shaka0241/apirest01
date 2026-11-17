import mongoose from "mongoose";

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

// Exportación por defecto para que futuras rutas puedan importar el modelo de usuario.
export default mongoose.model("User", userSchema);
