import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

async function main() {
  const saltRounds = 10;
  const hashAdmin = await bcrypt.hash("admin123", saltRounds);
  const hashCliente = await bcrypt.hash("cliente123", saltRounds);

  // ---------- Usuarios ----------
  await prisma.usuario.upsert({
    where: { email: "admin@libreria.test" },
    update: {},
    create: {
      email: "admin@libreria.test",
      nombre: "Ana Admin",
      passwordHash: hashAdmin,
      rol: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "cliente@libreria.test" },
    update: {},
    create: {
      email: "cliente@libreria.test",
      nombre: "Carlos Cliente",
      passwordHash: hashCliente,
      rol: "CLIENTE",
    },
  });

  // ---------- Autores ----------
  const autores = [
    { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
    { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
    { nombre: "Isabel Allende", nacionalidad: "Chilena" },
    { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  ];
  for (const a of autores) {
    await prisma.autor.upsert({
      where: { nombre: a.nombre },
      update: {},
      create: a,
    });
  }

  // ---------- Categorías ----------
  const categorias = ["Novela", "Cuento", "Realismo mágico"];
  for (const nombre of categorias) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  // ---------- Libros (no se duplican si el seed se corre más de una vez) ----------
  const libros = [
    { titulo: "Rayuela", autor: "Julio Cortázar", precio: 7000, categorias: ["Novela"] },
    { titulo: "Bestiario", autor: "Julio Cortázar", precio: 5500, categorias: ["Cuento"] },
    { titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 6500, categorias: ["Cuento"] },
    { titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 6000, categorias: ["Cuento"] },
    { titulo: "La casa de los espíritus", autor: "Isabel Allende", precio: 8000, categorias: ["Novela", "Realismo mágico"] },
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 9000, categorias: ["Novela", "Realismo mágico"] },
  ];

  for (const l of libros) {
    const autor = await prisma.autor.findUniqueOrThrow({ where: { nombre: l.autor } });
    const existe = await prisma.libro.findFirst({
      where: { titulo: l.titulo, autorId: autor.id },
    });
    if (existe) continue;

    await prisma.libro.create({
      data: {
        titulo: l.titulo,
        precio: l.precio,
        imagen: `https://placehold.co/300x400?text=${encodeURIComponent(l.titulo)}`,
        disponible: true,
        autorId: autor.id,
        categorias: { connect: l.categorias.map((nombre) => ({ nombre })) },
      },
    });
  }

  console.log("Seed listo: usuarios, autores, categorías y libros de ejemplo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
