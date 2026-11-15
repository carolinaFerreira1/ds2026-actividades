import { Autor } from "../types/autor.types";

let autores: Autor[] = [
  { id: 1, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { id: 2, nombre: "Isabel Allende", nacionalidad: "Chilena" },
  { id: 3, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" }
];

let proximoId = 4;

export const findAll = () => {
  return autores;
};

export const findById = (id: number) => {
  return autores.find((a) => a.id === id);
}
export const create = (data: Omit<Autor, "id">) => {
  const nuevoAutor = {
    id: proximoId++,
    ...data,
  };
  autores.push(nuevoAutor);
  return nuevoAutor;
};

export const update = (id: number, data: Omit<Autor, "id">) => {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return undefined;
  autores[index] = { id, ...data };
  return autores[index];
};

export const remove = (id: number) => {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return false;

  autores.splice(index, 1); 
  return true;
};