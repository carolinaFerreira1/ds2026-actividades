import type { Libro } from '../types/libro';
import { Link } from 'react-router-dom';

interface LibroCardProps { libro: Libro; }

function LibroCard({ libro }: LibroCardProps) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{libro.titulo}</h5>
        <p className="card-text text-muted">{libro.autor}</p>
        <p className="fw-bold">${libro.precio}</p>
        <Link to={`/libros/${libro.id}`} className="btn btn-primary">
  Ver más detalles
</Link>
      </div>
    </div>
  );
}
export default LibroCard;