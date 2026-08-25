import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

export const getAll = (req: Request, res: Response) => {
  const disponible = req.query.disponible === 'true' ? true : req.query.disponible === 'false' ? false : undefined;
  const libros = libroService.findAll(disponible);
  res.json(libros);
};

export const getById = (req: Request, res: Response) => {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  res.json(libro);
};

export const create = (req: Request, res: Response) => {
  const nuevo = libroService.create(req.body);
  res.status(201).json(nuevo);
};

export const update = (req: Request, res: Response) => {
  const actualizado = libroService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  res.json(actualizado);
};

export const remove = (req: Request, res: Response) => {
  const ok = libroService.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  res.status(204).send();
};