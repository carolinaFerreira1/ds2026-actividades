import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="mt-4">
      <Alert variant="danger">
        <Alert.Heading>Acceso Denegado</Alert.Heading>
        <p>No tienes los permisos necesarios para acceder a esta sección.</p>
        <hr />
        <Link to="/catalogo" className="btn btn-outline-danger">Volver al catálogo</Link>
      </Alert>
    </Container>
  );
}