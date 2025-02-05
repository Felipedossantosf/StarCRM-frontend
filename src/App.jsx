import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Componentes/Dashboard';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Cotizaciones from './Componentes/Cotizaciones';
import Clientes from './Componentes/clientes/Clientes';
import Proveedores from './Componentes/proveedores/Proveedores';
import Eventos from './Componentes/Eventos';
import HistorialActividad from './Componentes/HistorialActividad';
import NoAutorizado from './Componentes/otros/NoAutorizado';
import DetalleCliente from './Componentes/clientes/DetalleCliente';
import ErrorPage from './Componentes/otros/ErrorPage';
import DetalleProveedor from './Componentes/proveedores/DetalleProveedor';
import CrearProveedor from './Componentes/proveedores/CrearProveedor';
import ModificarProveedor from './Componentes/proveedores/ModificarProveedor';
import CrearCliente from './Componentes/clientes/CrearCliente';
import ModificarCliente from './Componentes/clientes/ModificarCliente';
import EditarUsuario from './Componentes/EditarUsuario';
import Notificaciones from './Componentes/Notificaciones';
import AgregarEvento from './Componentes/AgregarEvento';
import DetalleEvento from './Componentes/DetalleEvento';
import ModificarEvento from './Componentes/ModificarEvento';
import CrearCotizacion from './Componentes/CrearCotizacion';
import ModificarCotizacion from './Componentes/ModificarCotizacion';
import ActualizarEstados from './Componentes/actualizarEstados';




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
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/:clienteId" element={<DetalleCliente />} />
        <Route path="/proveedores" element={<Proveedores />} />
       <Route path="/proveedores/:proveedorId" element={<DetalleProveedor />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/historial" element={<HistorialActividad />} />
        <Route path="/acceso-denegado" element={<NoAutorizado />} />
        <Route path="/proveedores/crear" element={<CrearProveedor />} />
        <Route path="/proveedores/editar/:proveedorId" element={<ModificarProveedor />} />
        <Route path="/clientes/editar/:clienteId" element={<ModificarCliente />} />
        <Route path="/clientes/crear" element={<CrearCliente />} />
        <Route path="/perfil" element={<EditarUsuario />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/AgregarEvento" element={<AgregarEvento />} />
        <Route path="/DetalleEvento" element={<DetalleEvento />} />
        <Route path="/ModificarEvento" element={<ModificarEvento />} />
        <Route path="/CrearCotizacion" element={<CrearCotizacion />} />
        <Route path="/ModificarCotizacion" element={<ModificarCotizacion />} />
        <Route path="/actualizarEstados" element={<ActualizarEstados />} />
 







        


        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
