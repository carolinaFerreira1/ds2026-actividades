import { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
};

function LibroCard({ titulo, autor, precio }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text className="fw-bold mt-auto">${precio.toLocaleString()}</Card.Text>
        {}
        <Button 
          variant={likes > 0 ? "danger" : "outline-danger"} 
          onClick={() => setLikes(likes + 1)}
        >
          ❤ {likes} likes
        </Button>
      </Card.Body>
    </Card>
  );
}

function MiNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">📚 Mi Librería React</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">Inicio</Nav.Link>
          <Nav.Link href="#">Catálogo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function MiFooter() {
  return (
    <footer className="bg-light text-center py-4 mt-5 border-top">
      <Container>
        <p className="mb-0 text-secondary">© 2026 - Desarrollo de Software UTN FRLP</p>
      </Container>
    </footer>
  );
}

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <MiNavbar />
      
      <Container className="flex-grow-1">
        <header className="text-center mb-5">
          <h1>Bienvenidos a Mi Librería</h1>
          <p className="lead">Explora nuestra colección de libros destacados.</p>
        </header>

        {}
        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <LibroCard titulo="El Aleph" autor="Jorge Luis Borges" precio={15000} />
          </Col>
          <Col>
            <LibroCard titulo="Rayuela" autor="Julio Cortázar" precio={18000} />
          </Col>
          <Col>
            <LibroCard titulo="Ficciones" autor="Jorge Luis Borges" precio={14000} />
          </Col>
          <Col>
            <LibroCard titulo="100 años de soledad" autor="Gabriel García Márquez" precio={22000} />
          </Col>
        </Row>
      </Container>

      <MiFooter />
    </div>
  );
}

export default App;