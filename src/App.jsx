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
        <Route path="/clientes/:clientId" element={<DetalleCliente />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/historialActividad" element={<HistorialActividad />} />
        <Route path="/accesoDenegado" element={<NoAutorizado />} />

        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
