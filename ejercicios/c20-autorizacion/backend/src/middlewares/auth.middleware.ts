import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

interface TokenPayload {
  id: number;
  rol: "ADMIN" | "CLIENTE";
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token" });
  }

  const token = authHeader.split(" ")[3];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const authorize = (...rolesPermitidos: Array<"ADMIN" | "CLIENTE">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tenés permiso para esta operación" });
    }

    next();
  };
};