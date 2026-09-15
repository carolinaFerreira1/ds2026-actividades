import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout/Layout'; 
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroNuevo from './pages/LibroNuevo';
import LibroDetalle from './pages/LibroDetalle';
import Login from './pages/Login';
import { SinPermiso } from './pages/SinPermiso';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;