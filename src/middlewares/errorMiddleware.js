// Middleware 404: se ejecuta si ninguna ruta anterior atendió la petición.
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada (404)",
    message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
  });
};

// Middleware de errores de Express: recibe los errores enviados con next(error)
// y mantiene un formato JSON común para las respuestas de error.
const errorHandler = (err, req, res, next) => {
  console.error("Error detectado:", err.message);

  // Si el error no especifica estado, se trata como un fallo interno (500).
  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  // Mongoose genera CastError cuando no puede convertir un valor al tipo esperado,
  // por ejemplo, cuando el parámetro :id no tiene formato válido.
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Formato de ID inválido: ${err.value}`;
  }

  // ValidationError agrupa los incumplimientos del esquema (required, enum, min, etc.).
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

// Exportaciones con nombre para que la aplicación monte ambos middlewares en el orden correcto.
export { notFound, errorHandler };
