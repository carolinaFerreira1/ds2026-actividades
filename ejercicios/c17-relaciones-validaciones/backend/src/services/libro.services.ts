import { Libro } from "../types/libro.types";

let libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, imagen: "...", disponible: true },
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, imagen: "...", disponible: true }
];
let proximoId = 3;

export const findAll = (disponible?: boolean) => {
  if (disponible !== undefined) return libros.filter(l => l.disponible === disponible);
  return libros;
};

export const findById = (id: number) => libros.find(l => l.id === id);

export const create = (data: Omit<Libro, "id">) => {
  const nuevo = { id: proximoId++, ...data };
  libros.push(nuevo);
  return nuevo;
};

export const update = (id: number, data: Omit<Libro, "id">) => {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return undefined;
  libros[index] = { id, ...data };
  return libros[index];
};

export const remove = (id: number) => {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
};