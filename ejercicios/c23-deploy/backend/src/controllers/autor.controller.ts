import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export const getAll = async (_req: Request, res: Response) => {
  const autores = await autorService.findAll();
  res.json(autores);
};

export const getById = async (req: Request, res: Response) => {
  const autor = await autorService.findById(Number(req.params.id));

  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(autor);
};

export const create = async (req: Request, res: Response) => {
  const nuevoAutor = await autorService.create(req.body);
  res.status(201).json(nuevoAutor);
};

export const update = async (req: Request, res: Response) => {
  const actualizado = await autorService.update(Number(req.params.id), req.body);
  res.json(actualizado);
};

export const remove = async (req: Request, res: Response) => {
  await autorService.remove(Number(req.params.id));
  res.status(204).send();
};