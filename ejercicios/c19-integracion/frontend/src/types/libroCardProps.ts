export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface libroCardProps {
  id: number;
  titulo: string;
  autor: Autor;
  precio: number;
  disponible: boolean;
  imagen: string;
  descripcion?: string;
}