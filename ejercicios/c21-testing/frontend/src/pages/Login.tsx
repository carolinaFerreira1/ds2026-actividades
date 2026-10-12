import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { loginSchema } from '../schemas/login.Schema';
import type { LoginValidado } from '../schemas/login.Schema';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (valoresDelFormulario: LoginValidado) => {
    try {
      setErrorMensaje(null);

      await login({
        email: valoresDelFormulario.email,
        clave: valoresDelFormulario.password,
      });

      navigate('/catalogo');
    } catch (error: any) {
      setErrorMensaje(error.message || 'Error al iniciar sesión'); 
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          {errorMensaje && (
            <Alert variant="danger" onClose={() => setErrorMensaje(null)} dismissible>
              {errorMensaje}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                {...register('email')}
                isInvalid={!!errors.email}
                placeholder="usuario@ejemplo.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                {...register('password')}
                isInvalid={!!errors.password}
                placeholder="******"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;