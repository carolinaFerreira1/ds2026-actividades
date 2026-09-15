import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(3, "El nombre del autor debe tener al menos 3 caracteres")
    .max(100, "El nombre del autor no puede superar los 100 caracteres"),
  
  nacionalidad: z
    .string({ required_error: "La nacionalidad es obligatoria" })
    .min(3, "La nacionalidad debe tener al menos 3 caracteres")
    .max(50, "La nacionalidad no puede superar los 50 caracteres"),
});

export const autorUpdateSchema = autorCreateSchema.partial();