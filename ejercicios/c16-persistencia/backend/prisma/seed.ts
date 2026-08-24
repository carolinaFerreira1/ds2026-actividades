import { prisma } from "../src/config/prisma"; 

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300",
    disponible: true
  },
  {
    titulo: "Rayuela", 
    autor: "Julio Cortázar",
    precio: 7500,
    imagen: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300",
    disponible: true
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 6800,
    imagen: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300",
    disponible: false
  }
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" }
];

async function main() {
  console.log("Iniciando el sembrado de datos (Seed)...");
  
  // Limpiamos tablas previas para evitar duplicados
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();

  // Insertamos los registros
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });

  console.log("¡Base de datos sembrada con éxito!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.\$disconnect();
  });
