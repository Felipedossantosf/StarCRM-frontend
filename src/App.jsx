import { useState } from 'react'
import Registro from './Componentes/Registro'
import Login from './Componentes/Login'
import Dashboard from './Componentes/Dashboard'
import Asignaciones from './Componentes/Asignaciones'
import Cotizaciones from './Componentes/Cotizaciones'
import Eventos from './Componentes/Eventos'
import HistorialActividad from './Componentes/HistorialActividad'
import Clientes from './Componentes/Clientes'


function App() {

  return (
    <div>
      <Registro />
      <Login />
      <Dashboard />
      <Asignaciones />
      <Cotizaciones />
      <Clientes />
      <Proveedores />
      <Eventos />
      <HistorialActividad />
     
    </div>
  )
}

export default App
