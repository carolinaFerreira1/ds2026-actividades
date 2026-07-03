import { useParams, Link } from 'react-router-dom';
import { Container, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { libroCardProps } from '../types/libroCardProps'; // ✅ Usando PascalCase

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();

  const { data: libros, loading, error } = useFetch<libroCardProps[]>('/libros.json');

  const libro = libros?.find((l) => l.id === Number(id));

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Cargando información del libro...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">
        <Alert.Heading>Error de conexión</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  if (!libro) {
    return (
      <Container className="py-5 text-center">
        <h2 className="display-4">404</h2>
        <h3>Libro no encontrado</h3>
        <p className="text-muted">El libro con ID {id} no existe en nuestro catálogo.</p>
        <Button as={Link as any} to="/catalogo" variant="primary" className="mt-3">
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={5} className="mb-4 mb-md-0">
          <img 
            src={libro.imagen} 
            alt={libro.titulo} 
            className="img-fluid rounded shadow-lg w-100" 
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={7}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li>
              <li className="breadcrumb-item active">{libro.titulo}</li>
            </ol>
          </nav>
          
          <h1 className="display-5 fw-bold">{libro.titulo}</h1>
          <h3 className="text-secondary mb-4">por {libro.autor}</h3>
          
          <div className="bg-light p-4 rounded-3 border">
            <h2 className="text-primary h1 mb-3">${libro.precio.toLocaleString('es-AR')}</h2>
            <p className="mb-0">
              <strong>Estado:</strong> {libro.disponible 
                ? <span className="text-success">✅ En Stock</span> 
                : <span className="text-danger">❌ Agotado</span>}
            </p>
          </div>

          <div className="mt-5 d-grid d-md-block gap-2">
            <Button variant="primary" size="lg" disabled={!libro.disponible} className="me-md-3">
              Añadir al carrito
            </Button>
            <Button as={Link as any} to="/catalogo" variant="outline-secondary" size="lg">
              ← Volver
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LibroDetalle;