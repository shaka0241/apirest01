// Middleware 404: Captura cualquier petición a una ruta no definida
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada (404)",
    message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
  });
};

// Middleware 500: Manejador central de errores
const errorHandler = (err, req, res, next) => {
  console.error("Error detectado:", err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  // Si el ID de MongoDB no tiene un formato válido de 24 caracteres hexadecimales
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Formato de ID inválido: ${err.value}`;
  }

  // Si fallan las validaciones del Schema de Mongoose (campos obligatorios, enum, min)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? "Internal Server Error" : "Bad Request",
    message: message,
  });
};

module.exports = { notFound, errorHandler };
