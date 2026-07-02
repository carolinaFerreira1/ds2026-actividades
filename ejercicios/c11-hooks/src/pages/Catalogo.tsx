import type { libroCardProps } from '../types/libroCardProps'; 
import LibroCard from '../components/LibroCard';
import { Row, Col, Container } from 'react-bootstrap';

interface Props {
  libros: libroCardProps[]; 
}

function Catalogo({ libros }: Props) {
  return (
    <Container>
      <h2 className="my-4">Nuestro Catálogo</h2>
      <Row>
        {libros.map((libro) => (
          <Col key={libro.id} sm={12} md={6} lg={4} className="mb-4">
            <LibroCard {...libro} /> 
          </Col>
        ))}
        {libros.length === 0 && <p>No hay libros disponibles en este momento.</p>}
      </Row>
    </Container>
  );
}

export default Catalogo;