import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/apiSlice";

const DetalleEvento = () => {
    const location = useLocation();
    const event = location.state;
     const navigate = useNavigate();
     const dispatch = useDispatch();
    const {usuarios, clientes} = useSelector((state) => state.api);
    
     useEffect(() => {
         dispatch(fetchData('cliente'));
         dispatch(fetchData('usuario'));
       }, [dispatch])
   

 
  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <header className="flex items-center text-white pt-4 pb-1">
        <button
         onClick={() => navigate("/eventos")}
          className="pl-6 flex hover:text-gray-200 hover:underline"
        >
          <svg
            className="h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <b>Volver</b>
        </button>

        <div className="flex-grow text-center text-3xl font-semibold">
          <h2>{event.nombre}</h2>
        </div>

        <div className="w-12"></div>
      </header>

      <div className="bg-white my-6 mx-6 lg:mx-20 px-6 lg:px-40 py-10 lg:py-20 rounded flex flex-col lg:flex-row lg:space-x-20">
        {/* Información del evento */}
        <div className="bg-gray-200 p-6 rounded flex-1 space-y-6">
          <p>
            <b>Descripción:</b> {event.descrpicion|| "--"}
          </p>
          <p>
            <b>Fecha:</b> {event.fecha || "--"}
          </p>
        </div>

        {/* Lista de Clientes */}
        <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Clientes:</h3>
            {event.comercialesId?.length > 0 ? (
                <ul className="space-y-2">
                {event.comercialesId.map((cliente) => {
                    const cli = clientes.find((c) => c.id === cliente);
                    return cli ? (
                    <li
                        key={cli}
                        className="flex items-center justify-between p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                    >
                        <span className="text-sm font-medium text-blue-700">{cli.nombre}</span>
                        <span className="text-xs text-gray-600">{cli.correo || "Sin correo"}</span>
                    </li>
                    ) : null;
                })}
                </ul>
            ) : (
                <p className="text-gray-500">No hay asistentes registrados.</p>
            )}
        </div>

        {/* Lista de usaurios */}
        <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Usuarios:</h3>
            {event.usuariosId?.length > 0 ? (
                <ul className="space-y-2">
                {event.usuariosId.map((userId) => {
                    const user = usuarios.find((u) => u.userId === userId);
                    return user ? (
                    <li
                        key={userId}
                        className="flex items-center justify-between p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                    >
                        <span className="text-sm font-medium text-green-700">{user.nombre}</span>
                        <span className="text-xs text-gray-600">{user.email || "Sin correo"}</span>
                    </li>
                    ) : null;
                })}
                </ul>
            ) : (
                <p className="text-gray-500">No hay asistentes registrados.</p>
            )}
        </div>



        
      </div>
    </div>
  );
};

export default DetalleEvento;
