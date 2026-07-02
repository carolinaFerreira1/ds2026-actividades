import type { libroCardProps } from '../types/libroCardProps';
import LibroCard from '../components/LibroCard';
import { Row, Col, Container } from 'react-bootstrap';

interface Props {
  libros: libroCardProps[];
}

function Home({ libros }: Props) {
  const destacados = libros?.slice(-3) || [];


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