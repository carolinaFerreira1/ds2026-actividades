import prisma from "../config/prisma";

export const findAll = () => {
  return prisma.autor.findMany({ orderBy: { nombre: "asc" } });
};

export const findById = (id: number) => {
  return prisma.autor.findUnique({ where: { id } });
};

export const create = (data: { nombre: string; nacionalidad: string }) => {
  return prisma.autor.create({ data });
};

export const update = (id: number, data: { nombre?: string; nacionalidad?: string }) => {
  return prisma.autor.update({ where: { id }, data });
};

export const remove = (id: number) => {
  return prisma.autor.delete({ where: { id } });
};