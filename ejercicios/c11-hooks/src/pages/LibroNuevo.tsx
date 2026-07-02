import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { libroCardProps } from '../types/libroCardProps';
import type { LibroValidado } from '../schemas/libroSchema';

interface Props {
  onAgregar: (libro: libroCardProps) => void;
}

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
  resolver: zodResolver(libroSchema),
  defaultValues: {
    disponible: true
  }
});

  const onSubmit = (data: LibroValidado) => {
    onAgregar({
      ...data,
      id: Date.now(),
      imagen: IMG_PLACEHOLDER
    });
    navigate('/catalogo');
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Alta de Libro</h2>
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
              <Form.Label>Autor</Form.Label>
              <Form.Control 
                {...register('autor')} 
                isInvalid={!!errors.autor} 
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

            <Button variant="primary" type="submit" className="w-100">
              Guardar en Catálogo
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LibroNuevo;