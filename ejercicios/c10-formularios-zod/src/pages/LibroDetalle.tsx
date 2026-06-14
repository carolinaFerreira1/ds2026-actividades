import { useParams, Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import type { libroCardProps } from '../types/libroCardProps';

interface Props {
  libros: libroCardProps[]; 
}

function LibroDetalle({ libros }: Props) {
  const { id } = useParams<{ id: string }>();

  const libro = libros.find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <Container className="py-5 text-center">
        <h2>Libro no encontrado</h2>
        <Button as={Link as any} to="/catalogo" variant="secondary" className="mt-3">
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <img src={libro.imagen} alt={libro.titulo} className="img-fluid rounded shadow" />
        </Col>
        <Col md={8}>
          <h1>{libro.titulo}</h1>
          <h3 className="text-muted">Autor: {libro.autor}</h3>
          <h4 className="text-primary mt-4">Precio: ${libro.precio}</h4>
          <p className="mt-3">
            <strong>Estado:</strong> {libro.disponible ? "✅ Disponible para la venta" : "❌ No disponible"}
          </p>
          <Button as={Link as any} to="/catalogo" variant="outline-secondary" className="mt-4">
            ← Volver al catálogo
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LibroDetalle;