import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect } from "vitest";
import app from "../app";
const JWT_SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

const libroNuevo = { titulo: "Rayuela", precio: 7000, imagen: "https://img/r.jpg", autorId: 1 };

describe("POST /api/libros - Matriz de Permisos", () => {
  it("con token de CLIENTE responde 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido responde 400 (no 403)", async () => {
    const res = await request(app)
  .post("/api/libros")
  .set("Authorization", `Bearer ${tokenAdmin}`)
  .send({ ...libroNuevo, precio: -5 });
    expect(res.status).toBe(400);
  });
});
