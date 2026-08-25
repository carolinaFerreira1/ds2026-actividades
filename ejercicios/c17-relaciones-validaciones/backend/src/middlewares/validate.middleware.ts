import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// Middleware para validar el BODY de una petición POST/PUT
export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return next(result.error);
    }
    
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    
    if (!result.success) {
      return next(result.error);
    }
    
    req.params = result.data as any;
    next();
  };
};