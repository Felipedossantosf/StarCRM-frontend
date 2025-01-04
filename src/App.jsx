import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componentes/Dashboard';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Asignaciones from './Componentes/Asignaciones';
import Cotizaciones from './Componentes/Cotizaciones';
import Clientes from './Componentes/Clientes';
import Proveedores from './Componentes/Proveedores';
import Eventos from './Componentes/Eventos';
import HistorialActividad from './Componentes/HistorialActividad';
import NoAutorizado from './Componentes/NoAutorizado';
import DetalleCliente from './Componentes/DetalleCliente';
import ErrorPage from './Componentes/ErrorPage';
import DetalleProveedor from './Componentes/DetalleProveedor';
import CrearProveedor from './Componentes/CrearProveedor';
import ModificarProveedor from './Componentes/ModificarProveedor';
import CrearCliente from './Componentes/CrearCliente';
import ModificarCliente from './Componentes/ModificarCliente';
import EditarUsuario from './Componentes/EditarUsuario';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Login />} />

        {/* Other Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/asignaciones" element={<Asignaciones />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/:clienteId" element={<DetalleCliente />} />
        <Route path="/proveedores" element={<Proveedores />} />
       <Route path="/proveedores/:proveedorId" element={<DetalleProveedor />} />
       <Route path="/detalleProveedor/:proveedorId" element={<DetalleProveedor />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/historialActividad" element={<HistorialActividad />} />
        <Route path="/accesoDenegado" element={<NoAutorizado />} />
        <Route path="/crearProveedor" element={<CrearProveedor />} />
        <Route path="/modificarProveedor/:proveedorId" element={<ModificarProveedor />} />
        <Route path="/modificarCliente/:clienteId" element={<ModificarCliente />} />
        <Route path="/crearCliente" element={<CrearCliente />} />
        <Route path="/EditarUsuario" element={<EditarUsuario />} />

        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
