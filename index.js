require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta raíz informativa para comprobar que la API vive en Vercel
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API RESTful operativa y conectada a MongoDB Atlas",
    endpoints: {
      products: "/api/products",
    },
  });
});

// Rutas de la API
app.use("/api/products", productRoutes);

// Middlewares de gestión de errores (SIEMPRE después de las rutas)
app.use(notFound);
app.use(errorHandler);

// Arranque del servidor en local
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

// Exportación obligatoria para el despliegue en Vercel
module.exports = app;
