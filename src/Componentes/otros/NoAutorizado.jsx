import React from "react";
import { Link } from "react-router-dom";

function NoAutorizado() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
      <p className="text-lg text-gray-700 mb-6">No tienes permiso para acceder a esta página.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Regresar al inicio
      </Link>
    </div>
  );
}

export default NoAutorizado;