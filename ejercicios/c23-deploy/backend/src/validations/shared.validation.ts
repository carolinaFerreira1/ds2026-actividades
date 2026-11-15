import { z } from "zod";

export const idParamSchema = z.object({
  id: z
    .string({ required_error: "El ID es requerido" })
    .regex(/^\d+$/, "El ID debe ser un número entero válido")
    .transform(Number), 
});