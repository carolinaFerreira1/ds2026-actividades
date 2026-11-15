import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Error de validación en los datos enviados",
      errors: err.issues.map((e) => ({
        campo: e.path.join("."),
        mensaje: e.message,
      })),
    });
  }

  if (err.code) {
    switch (err.code) {
      case "P2002": 
        return res.status(409).json({
          status: "error",
          message: `Ya existe un registro con ese valor único: ${err.meta?.target}`,
        });
      case "P2025": 
        return res.status(404).json({
          status: "error",
          message: "El registro solicitado no existe en la base de datos",
        });
      case "P2003": 
        return res.status(409).json({
          status: "error",
          message: "No se puede realizar la operación por un conflicto de relaciones",
        });
      default:
        break;
    }
  }

  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    status: "error",
    message: "Ocurrió un error interno en el servidor",
  });
};