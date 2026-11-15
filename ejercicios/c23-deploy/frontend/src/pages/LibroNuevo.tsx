import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import type { Autor } from '../types/libroCardProps';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';
const AUTOR_NUEVO = 'nuevo';

function LibroNuevo() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [nuevoAutor, setNuevoAutor] = useState({ nombre: '', nacionalidad: '' });
  const { data: autores, loading: cargandoAutores, error: errorAutores } = useFetch<Autor[]>('/autores');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      disponible: true
    }
  });

  const esAutorNuevo = watch('autor') === AUTOR_NUEVO;

  const onSubmit = async (data: LibroValidado) => {
    try {
      setSubmitError(null);

      let autorId: number;
      if (data.autor === AUTOR_NUEVO) {
        const nombre = nuevoAutor.nombre.trim();
        const nacionalidad = nuevoAutor.nacionalidad.trim();
        if (nombre.length < 3 || nacionalidad.length < 3) {
          setSubmitError('Completá el nombre y la nacionalidad del autor nuevo (mínimo 3 letras cada uno).');
          return;
        }
        const creado = await apiFetch<Autor>('/autores', {
          method: 'POST',
          body: JSON.stringify({ nombre, nacionalidad }),
        });
        autorId = creado.id;
      } else {
        autorId = Number(data.autor);
      }

      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          autorId,
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
              <Form.Label>Autor</Form.Label>
              <Form.Select
                {...register('autor')}
                isInvalid={!!errors.autor}
                disabled={cargandoAutores}
              >
                <option value="">
                  {cargandoAutores ? 'Cargando autores...' : 'Seleccioná un autor'}
                </option>
                {autores?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre} ({a.nacionalidad})
                  </option>
                ))}
                <option value={AUTOR_NUEVO}>➕ Agregar autor nuevo…</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.autor?.message}
              </Form.Control.Feedback>
              {errorAutores && (
                <div className="text-danger small mt-1">
                  No se pudo cargar la lista de autores: {errorAutores}
                </div>
              )}
            </Form.Group>

            {esAutorNuevo && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del autor nuevo</Form.Label>
                  <Form.Control
                    value={nuevoAutor.nombre}
                    onChange={(e) => setNuevoAutor({ ...nuevoAutor, nombre: e.target.value })}
                    placeholder="Ej: Alfonsina Storni"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nacionalidad</Form.Label>
                  <Form.Control
                    value={nuevoAutor.nacionalidad}
                    onChange={(e) => setNuevoAutor({ ...nuevoAutor, nacionalidad: e.target.value })}
                    placeholder="Ej: Argentina"
                  />
                </Form.Group>
              </>
            )}

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