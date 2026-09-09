import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; 
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroNuevo from './pages/LibroNuevo';
import LibroDetalle from './pages/LibroDetalle';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}

export default App;