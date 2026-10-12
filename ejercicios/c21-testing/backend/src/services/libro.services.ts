import { Prisma } from "../generated/prisma/client"; 
import prisma from "../config/prisma";

export type LibroCompleto = Prisma.LibroGetPayload<{
  include: {
    autor: true;
    categorias: true;
  };
}>;

export async function findAll(disponible?: boolean): Promise<LibroCompleto[]> {
  return prisma.libro.findMany({
    // Si viene el parámetro 'disponible' filtramos, sino traemos todos
    where: disponible !== undefined ? { disponible } : {},
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function findById(id: number): Promise<LibroCompleto | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function create(data: {
  titulo: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  autorId: number;
  categorias?: number[]; 
}) {
  const { categorias, ...libroData } = data;

  return prisma.libro.create({
    data: {
      ...libroData,
      categorias: categorias
        ? {
            connect: categorias.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function update(
  id: number,
  data: {
    titulo?: string;
    precio?: number;
    imagen?: string;
    disponible?: boolean;
    autorId?: number;
    categorias?: number[];
  }
) {
  const { categorias, ...libroData } = data;

  return prisma.libro.update({
    where: { id },
    data: {
      ...libroData,
      categorias: categorias
        ? {
            set: categorias.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function remove(id: number) {
  return prisma.libro.delete({
    where: { id },
  });
}