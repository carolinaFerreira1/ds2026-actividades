import express from "express";

const app = express();
const PORT = 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1PjlY63KWL56AKfGbvLaEv4P7x1plMPFet34WV57Ydw&s", disponible: true },
  { id: 2, titulo: "1984", autor: "George Orwell", precio: 5000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-Y6gvb_8OMCvYRWXJMrjqFoTOyOewj4hCHaLKvpxhQ&s=10", disponible: true },
  { id: 3, titulo: "Rayuela", autor: "Julio Cortázar", precio: 6000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWB7D6SXW1LKBezsRid1CUgm1xXJuHKijuYe8qoe7cA&s=10", disponible: false }
];

app.get("/libros", (_req, res) => {
  res.json(libros); 
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});