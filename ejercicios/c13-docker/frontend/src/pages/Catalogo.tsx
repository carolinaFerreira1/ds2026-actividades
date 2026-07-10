import { Spinner, Alert, Row, Col, Container } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { libroCardProps } from '../types/libroCardProps';

function Catalogo() {
  const { data: libros, loading, error } = useFetch<libroCardProps[]>('/libros.json');

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p>Cargando libros...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">Error: {error}</Alert> 
    </Container>
  );

  return (
    <Container>
      <h2 className="my-4">Nuestro Catálogo</h2>
      <Row>
        {(libros ?? []).map((libro) => (
          <Col key={libro.id} sm={12} md={6} lg={4} className="mb-4">
            <LibroCard {...libro} /> 
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;