import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import Login from './Componentes/Login'
import Registro from './Componentes/Registro'
import ErrorPage from './Componentes/ErrorPage'
import Dashboard from './Componentes/Dashboard'
import Cotizaciones from './Componentes/Cotizaciones'
import Eventos from './Componentes/Eventos'
import Asignaciones from './Componentes/Asignaciones'
import Proveedores from './Componentes/Proveedores'
import Clientes from './Componentes/Clientes'
import HistorialActividad from './Componentes/HistorialActividad'
import NoAutorizado from './Componentes/NoAutorizado'
import { store } from './redux/store'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage /> 
  },
   {
    path: "/registro",
    element: <Registro />,
    errorElement: <ErrorPage />
  },
  {
    path: "/ErrorPage",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/asignaciones",
    element: <Asignaciones />,
    errorElement: <ErrorPage />
  },
  {
    path: "/cotizaciones",
    element: <Cotizaciones />,
    errorElement: <ErrorPage />
  },
  {
    path: "/proveedores",
    element: <Proveedores />,
    errorElement: <ErrorPage />
  },
  {
    path: "/clientes",
    element: <Clientes />,
    errorElement: <ErrorPage />
  },
  {
    path: "/eventos",
    element: <Eventos />,
    errorElement: <ErrorPage />
  },
  {
    path: "/historialActividad",
    element: <HistorialActividad />,
    errorElement: <ErrorPage />
  },
  {
    path: "/no-autorizado",
    element: <NoAutorizado />,
    errorElement: <ErrorPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
  </Provider>
)
