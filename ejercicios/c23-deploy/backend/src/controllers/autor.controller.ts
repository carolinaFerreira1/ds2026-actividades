import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export const getAll = (_req: Request, res: Response) => {
  const autores = autorService.findAll();
  res.json(autores); 
};
export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id); 
  const autor = autorService.findById(id);

  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(autor); 
};

export const create = (req: Request, res: Response) => {
  
  const nuevoAutor = autorService.create(req.body);
  
  res.status(201).json(nuevoAutor);
};


export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const actualizado = autorService.update(id, req.body);

  if (!actualizado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(actualizado); 
};


export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const exito = autorService.remove(id);

  if (!exito) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.status(204).send();
};