import LibroCard from '../components/LibroCard';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { libroCardProps } from '../types/libroCardProps';

function Catalogo() {
  const { data: libros, loading, error } = useFetch<libroCardProps[]>('/libros');

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Cargando catálogo...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">No pudimos cargar el catálogo: {error}</Alert>
    </Container>
  );

  return (
    <Container>
      <h1 className="my-4">Catálogo completo</h1>

      {!libros || libros.length === 0 ? (
        <Alert variant="info">Todavía no hay libros cargados en el catálogo.</Alert>
      ) : (
        <Row>
          {libros.map((libro: libroCardProps) => (
            <Col key={libro.id} sm={12} md={6} lg={4} className="mb-4">
              <LibroCard {...libro} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;
