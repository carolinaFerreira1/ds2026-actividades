import { useParams } from 'react-router-dom';
import type { Libro } from '../types/libro';

const libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, descripcion: "Una de las obras cumbre de Borges que explora el infinito.",},
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000,  descripcion: "La novela contranovela de Cortázar que cambió la literatura." },
  { id: 3, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, descripcion: "La obra fundamental de Jorge Luis Borges y un clásico de la literatura fantástica y universal. Compuesta por los libros El jardín de senderos que se bifurcan (1941) y Artificios (1944), reúne cuentos que exploran laberintos, mundos inventados, la filosofía, el infinito y tramas policiales" },
];

function LibroDetalle() {
  const { id } = useParams<{ id: string }>(); 

  const libroEncontrado = libros.find(l => l.id === Number(id));

  if (!libroEncontrado) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">Libro no encontrado</h2>
        <p>Lo sentimos, el libro con ID {id} no existe en nuestro catálogo.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src="https://via.placeholder.com/300x450" alt={libroEncontrado.titulo} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{libroEncontrado.titulo}</h1>
          <h3 className="text-muted">Autor: {libroEncontrado.autor}</h3>
          <p className="h4 mt-4 text-primary">Precio: ${libroEncontrado.precio}</p>
          <hr />
          <p className="lead">
            {libroEncontrado.descripcion} 
        </p>
          <button className="btn btn-success btn-lg mt-3">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default LibroDetalle;