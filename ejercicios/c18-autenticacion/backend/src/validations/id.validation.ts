import { z } from "zod";

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número entero válido" })
    .transform((val) => Number(val)),
});