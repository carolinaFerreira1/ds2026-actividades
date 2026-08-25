import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z
    .string({ required_error: "El título es obligatorio" })
    .min(1, "El título no puede estar vacío")
    .max(150, "El título no puede superar los 150 caracteres"),
  
  precio: z
    .number({ required_error: "El precio es obligatorio" })
    .positive("El precio debe ser un número positivo"),
  
  imagen: z
    .string({ required_error: "La URL de la imagen es obligatoria" })
    .url("La imagen debe ser una URL válida (ej: http://...)"),
  
  disponible: z
    .boolean()
    .optional()
    .default(true),
  
  autorId: z
    .number({ required_error: "El autorId es obligatorio" })
    .int("El autorId debe ser un número entero")
    .positive("El autorId debe ser un ID válido"),
  
  categorias: z
    .array(z.number().int().positive())
    .optional(),
});

export const libroUpdateSchema = libroCreateSchema.partial();