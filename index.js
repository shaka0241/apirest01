// Carga .env al importar este módulo, antes de leer MONGODB_URI o PORT.
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";

// Crea la aplicación de Express; en este archivo se conectan sus piezas principales.
const app = express();

// Inicia la conexión a la base de datos usando la configuración del entorno.
connectDB();

// Los middlewares procesan cada petición antes de que llegue a una ruta.
// CORS permite solicitudes desde otros orígenes y express.json interpreta cuerpos JSON.
app.use(cors());
app.use(express.json());

// Endpoint de comprobación: informa que el servidor está activo y qué recurso ofrece.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API RESTful operativa y conectada a MongoDB Atlas",
    endpoints: {
      products: "/api/products",
    },
  });
});

// Todas las rutas de productos quedan agrupadas bajo el prefijo /api/products.
app.use("/api/products", productRoutes);

// Se colocan después de las rutas: primero se detectan endpoints inexistentes
// y luego se centraliza el tratamiento de los errores enviados con next(error).
app.use(notFound);
app.use(errorHandler);

// En desarrollo se inicia un servidor HTTP local; en producción la plataforma
// (por ejemplo, Vercel) importa la exportación por defecto de este módulo.
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

// La exportación por defecto permite que la plataforma de despliegue importe la aplicación.
export default app;
