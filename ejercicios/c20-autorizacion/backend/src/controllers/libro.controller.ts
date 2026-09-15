import { Request, Response, NextFunction } from "express";
import * as libroService from "../services/libro.services";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const disponible = req.query.disponible ? req.query.disponible === "true" : undefined;
  const libros = await libroService.findAll(disponible);
  res.json(libros);
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const libro = await libroService.findById(Number(id));
  
  if (!libro) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  
  res.json(libro);
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const nuevoLibro = await libroService.create(req.body);
  res.status(201).json(nuevoLibro);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const libroActualizado = await libroService.update(Number(id), req.body);
  res.json(libroActualizado);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await libroService.remove(Number(id));
  res.status(204).send();
};
