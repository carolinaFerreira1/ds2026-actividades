import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

export async function registrar(datos: { nombre: string; email: string; password: string }) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(datos.password, saltRounds);
 
  const nuevoUsuario = await prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash,
      rol: "CLIENTE", 
    }, 
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
    },
  });

  return nuevoUsuario;
}

export async function login(datos: { email: string; password: string }) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
  });

  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
  };
}

export async function obtenerPorId(id: number) {
  return await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
    },
  });
}