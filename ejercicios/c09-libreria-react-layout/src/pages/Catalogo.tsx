import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

const libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, descripcion: "Una de las obras cumbre de Borges que explora el infinito."},
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, descripcion: "La novela contranovela de Cortázar que cambió la literatura." },
  { id: 3, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, descripcion: "La obra fundamental de Jorge Luis Borges y un clásico de la literatura fantástica y universal. Compuesta por los libros El jardín de senderos que se bifurcan (1941) y Artificios (1944), reúne cuentos que exploran laberintos, mundos inventados, la filosofía, el infinito y tramas policiales" },
];

function Catalogo() {
  return (
    <div className="container">
      <h2 className="my-4 text-center">Nuestro Catálogo de Libros</h2>
      <p className="text-muted text-center mb-5">
        Explora nuestra selección completa de obras clásicas y contemporáneas.
      </p>
      
      <div className="row g-4">
        {libros.map((l) => (
          <div key={l.id} className="col-md-4">
            <LibroCard libro={l} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;