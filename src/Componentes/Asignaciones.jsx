import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchA, editarAsignaciones, eliminarAsignaciones } from "../redux/AsignacionesSlice";


function Asignaciones() {
  const [activeTab, setActiveTab] = useState("Asignaciones");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { asignaciones } = useSelector((state) => state.Asignacion);
  const { cliente, assignees } = useSelector((state) => state.cliente);
  

  useEffect(() => {
    dispatch(fetchA('/asignacion'));
    console.log(asignaciones);
  }, [dispatch]);

  const handleAceptar = (as) => {
    console.log(as);
    const data = {
        comun_id: as.comun_id,
        admin_id: 61,
        estado: "Aprobada"
    };
    const response = dispatch(editarAsignaciones({ url: '/asignacion', id: as.id, data: data }));
    if (response?.payload?.success) {
            Swal.fire({
              icon: 'success',
              title: 'asignado exitosamente.',
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/asignaciones');
          } else {
            setError('Hubo un problema al crear asignacion Por favor, inténtalo de nuevo.');
          }
  }

  const handleCancelar = (id) => {
  dispatch(eliminarAsignaciones({ url: '/asignacion', id: id }));
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container mx-auto p-4">
        
        {/* Tabla para pantallas más grandes */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Usuario</th>
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Fecha Emitida</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.filter((a) => a.estado == "pendiente").map((asignacion) => (
                <tr key={asignacion.id} className="border-b">
                  {assignees.filter((d) => d.userId == asignacion.comun_id).map((d) => (
                    <td className="py-2 px-4">{d.username}</td>
                  ))}
                  {cliente.filter((c) => c.id === asignacion.cliente_id).map((c) => (
                    <td className="py-2 px-4">{c.nombre}</td>
                  ))}
                  <td className="py-2 px-4">{asignacion.fecha}</td>

                  <td className="py-2 px-4">
                  <button
                    onClick={() => handleAceptar(asignacion)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleCancelar(asignacion.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => navigate(`/clientes/${asignacion.cliente_id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Ver Cliente
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="md:hidden space-y-4">
        {asignaciones.filter((a) => a.estado == "pendiente").map((asignacion) => (
          <div key={asignacion.id} className="bg-white shadow-md rounded-lg p-4">
            {assignees.filter((d) => d.userId == asignacion.comun_id).map((d) => (
            <p className="font-semibold">{d.username}</p>
            ))}

            {cliente.filter((c) => c.id === asignacion.cliente_id).map((c) => (
              <p className="font-semibold">{c.nombre}</p>
            ))}
        
            <p className="text-xs text-gray-500 mt-1">{asignacion.fecha}</p>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleAceptar(asignacion)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleCancelar(asignacion.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => navigate(`/clientes/${asignacion.cliente_id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Ver Cliente
              </button>
            </div>
          </div>

          
        ))}
      </div>

      </div>
      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          <div className="overflow-x-auto"> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Asignaciones;