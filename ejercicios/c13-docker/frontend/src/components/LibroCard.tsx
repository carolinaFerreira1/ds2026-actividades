import { Card, Button } from 'react-bootstrap';
import type { libroCardProps } from '../types/libroCardProps'; 
import { Link } from 'react-router-dom';

function LibroCard({ id, titulo, autor, imagen }: libroCardProps) {
  return (
    <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>Autor: {autor}</Card.Text>
        
        <Button as={Link as any} to={`/libros/${id}`} variant="primary" className="mt-auto">
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;