import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import Login from './Componentes/Login'
import Registro from './Componentes/Registro'
import ErrorPage from './Componentes/ErrorPage'
import Dashboard from './Componentes/Dashboard'
import { store } from './redux/store'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage /> 
  },
   {
    path: "/Registro",
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
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
  </Provider>
)
