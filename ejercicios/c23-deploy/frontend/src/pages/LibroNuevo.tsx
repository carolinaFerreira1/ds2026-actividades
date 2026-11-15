import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';

function LibroNuevo() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      disponible: true
    }
  });

  const onSubmit = async (data: LibroValidado) => {
    try {
      setSubmitError(null);

      // Enviamos el POST a la API utilizando apiFetch
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          autorId: Number(data.autor), 
          precio: data.precio,
          disponible: data.disponible,
          imagen: IMG_PLACEHOLDER
        }),
      });

      navigate('/catalogo');
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Error al guardar el libro');
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Alta de Libro</h2>

          {submitError && (
            <Alert variant="danger" onClose={() => setSubmitError(null)} dismissible>
              {submitError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label>Título del Libro</Form.Label>
              <Form.Control 
                {...register('titulo')} 
                isInvalid={!!errors.titulo} 
                placeholder="Ej: El Aleph"
              />
              <Form.Control.Feedback type="invalid">
                {errors.titulo?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID de Autor</Form.Label>
              <Form.Control 
                type="number"
                {...register('autor')} 
                isInvalid={!!errors.autor} 
                placeholder="Ej: 1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.autor?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control 
                type="number"
                {...register('precio', { valueAsNumber: true })}
                isInvalid={!!errors.precio} 
              />
              <Form.Control.Feedback type="invalid">
                {errors.precio?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check 
              className="mb-4"
              type="checkbox"
              label="Disponible para la venta"
              {...register('disponible')}
            />

            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar en Catálogo'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LibroNuevo;