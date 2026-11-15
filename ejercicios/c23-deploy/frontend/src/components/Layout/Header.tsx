import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Usar NavLink
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Mi librería</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo completo</Nav.Link>
            
            {tieneRol('ADMIN') && (
              <Nav.Link as={NavLink} to="/libros/nuevo">Agregar libro nuevo</Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {usuario ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, {usuario.nombre}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                  Salir
                </Button>
              </>
            ) : (
              <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                Ingresar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;