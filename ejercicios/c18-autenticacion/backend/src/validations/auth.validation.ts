import { z } from "zod";
const emailNormalizado = z.string()
  .trim()
  .toLowerCase()
  .email({ message: "Debe proporcionar un correo electrónico válido" });
export const registroSchema = z.object({
  nombre: z
    .string({ message: "El nombre es obligatorio" })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  
  email: emailNormalizado,
  
  password: z
    .string({ message: "La contraseña es obligatoria" })
    .min(8, "La contraseña necesita al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña necesita al menos una mayúscula")
    .regex(/[1-9]/, "La contraseña necesita al menos un número"),
});

export const loginSchema = z.object({
  email: emailNormalizado,
  password: z.string().min(1, "La contraseña es obligatoria"), 
});