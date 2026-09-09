import LibroCard from '../components/LibroCard';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { libroCardProps } from '../types/libroCardProps'; 

function Home() {
 
  const { data: libros, loading, error } = useFetch<libroCardProps[]>('/libros.json');

  const destacados = libros?.slice(-3) || [];

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p>Cargando novedades...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="warning">No pudimos cargar los destacados en este momento.</Alert>
    </Container>
  );

  return (
    <Container>
      <div className="text-center my-5 py-5 bg-light rounded shadow-sm">
        <h1>Bienvenidos a Mi Librería</h1>
        <p className="lead">Descubrí nuestras últimas novedades y clásicos imperdibles.</p>
      </div>

      <h2 className="my-4">Libros Destacados</h2>
      <Row>
        {destacados.map((libro) => (
          <Col key={libro.id} sm={12} md={4} className="mb-4">
            <LibroCard {...libro} /> 
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;