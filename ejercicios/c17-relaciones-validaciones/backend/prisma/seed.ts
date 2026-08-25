import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Fantasía" },
  { nombre: "Poesía" },
  { nombre: "Ficción" }
];

const libros = [
  {
    titulo: "El Principito",
    precio: 4500,
    imagen: "https://placehold.co/300x400?text=El+Principito",
    disponible: true,
    autorNombre: "Antoine de Saint-Exupéry",
    categoriasNombres: ["Novela", "Fantasía"]
  },
  {
    titulo: "Rayuela",
    precio: 6200,
    imagen: "https://placehold.co/300x400?text=Rayuela",
    disponible: true,
    autorNombre: "Julio Cortázar",
    categoriasNombres: ["Novela"]
  },
  {
    titulo: "Ficciones",
    precio: 5000,
    imagen: "https://placehold.co/300x400?text=Ficciones",
    disponible: true,
    autorNombre: "Jorge Luis Borges",
    categoriasNombres: ["Ficción"]
  }
];

async function main() {
  console.log("Iniciando sembrado de base de datos...");

  for (const autor of autores) {
    await prisma.autor.upsert({
      where: { nombre: autor.nombre },
      update: {},
      create: autor
    });
  }

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: cat.nombre },
      update: {},
      create: cat
    });
  }

  for (const libro of libros) {
    await prisma.libro.create({
      data: {
        titulo: libro.titulo,
        precio: libro.precio,
        imagen: libro.imagen,
        disponible: libro.disponible,
        autor: {
          connect: { nombre: libro.autorNombre } 
        },
        categorias: {
          connect: libro.categoriasNombres.map((name) => ({ nombre: name })) 
        }
      }
    });
  }

  console.log("¡Base de datos sembrada con éxito!");
}

main()
  .catch((e) => {
    console.error("Error al ejecutar el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });