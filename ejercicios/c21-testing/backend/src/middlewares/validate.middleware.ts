import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

// Middleware para validar el BODY de una petición POST/PUT
export const validateBody = (schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return next(result.error);
    }
    
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    
    if (!result.success) {
      return next(result.error);
    }
    
    req.params = result.data as any;
    next();
  };
};