import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import type { libroCardProps } from './types/libroCardProps';

import 'bootstrap/dist/css/bootstrap.min.css';

const librosIniciales: libroCardProps[] = [
  {
    id: 1,
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 15000,
    disponible: true,
    imagen: "https://placehold.co/300x400?text=El+Aleph"
  },
  {
    id: 2,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 18000,
    disponible: true,
    imagen: "https://placehold.co/300x400?text=Rayuela"
  }
];

function App() {
  const [libros, setLibros] = useState<libroCardProps[]>(librosIniciales);

  const agregarLibro = (nuevo: libroCardProps) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/" element={<Home libros={libros} />} />
        
      </Routes>
    </Layout>
  );

}
  


export default App;