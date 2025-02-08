import React, { useState, useEffect } from "react";
import Header from "./otros/Header";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";

function Eventos() {
  const [activeTab, setActiveTab] = useState("Eventos");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientes, usuarios, eventos } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData('cliente'));
    dispatch(fetchData('usuario'));
    dispatch(fetchData('evento'));
  }, [dispatch]);

  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroCliente, setFiltroCliente] = useState('');

  const handleDeleteEvento = async (eventoid) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este evento.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await dispatch(deleteData({ url: 'evento', id: eventoid }));
      if (response.error) {
        throw new Error();
      }

     await dispatch(fetchData('evento'));
      Swal.fire({
        title: "Eliminado",
        text: "El Evento ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });

    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el evento. Intenta nuevamente.", "error");
    }
  };

  const filteredEventos = eventos.filter((e) => {
    if (filtroUsuario && !e.usuariosId.includes(parseInt(filtroUsuario))) return false;
    if (!e.fecha || isNaN(new Date(e.fecha).getTime())) return false;

    const eventoFecha = new Date(e.fecha).toISOString().split("T")[0];
    if (filtroFecha && filtroFecha !== eventoFecha) return false;
    if (filtroCliente && !e.comercialesId.includes(parseInt(filtroCliente))) return false;
    if (filtroTipo && filtroTipo !== e.esCarga.toString()) return false;

    return true;
  });

  const clearFilters = () => {
    setFiltroUsuario("");
    setFiltroFecha("");
    setFiltroCliente("");
    setFiltroTipo("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-wrap justify-between px-6 pt-6 space-y-4 md:space-y-0 md:flex-row">
        <div className="flex flex-wrap sm:space-x-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <input
              type="date"
              className="p-2 rounded w-full sm:w-auto"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={filtroTipo}
              className="p-2 rounded bg-white w-full sm:w-auto"
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="" disabled>Filtrar por tipo</option>
              <option value="false">Reunión comercial</option>
              <option value="true">Carga</option>
            </select>
            <select
              value={filtroUsuario}
              className="p-2 rounded bg-white w-full sm:w-auto"
              onChange={(e) => setFiltroUsuario(e.target.value)}
            >
              <option value="" disabled>Filtrar por usuario</option>
              {usuarios.length > 0 ? usuarios.map((usuario) => (
                <option key={usuario.userId} value={usuario.userId}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              )) : (
                <option value="" disabled>No hay usuarios disponibles</option>
              )}
            </select>
            <select
              value={filtroCliente}
              className="p-2 rounded bg-white w-full sm:w-auto"
              onChange={(e) => setFiltroCliente(e.target.value)}
            >
              <option value="" disabled>Filtrar por cliente</option>
              {clientes.length > 0 ? clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              )) : (
                <option value="" disabled>No hay clientes disponibles</option>
              )}
            </select>
            <button
              className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
              onClick={clearFilters}
            >
              Limpiar
            </button>
          </div>

          <button
            className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
            onClick={() => navigate("/AgregarEvento", { state: { esCarga: true } })}
          >
            <div className="flex space-x-1 items-center">
              <p>Carga</p>
              <svg className="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </button>
          <button
            className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
            onClick={() => navigate("/AgregarEvento", { state: { esCarga: false } })}
          >
            <div className="flex space-x-1 items-center">
              <p>Reunión</p>
              <svg className="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          {filteredEventos.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No hay eventos para mostrar.</div>
          ) : (
            <div>
              {/* Para pantallas grandes: Tabla */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full truncate">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Nombre</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Descripción</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Fecha</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Usuarios</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEventos.map((event) => (
                      <tr key={event.id} className={event.esCarga ? "bg-[#56C3CE] hover:bg-[#59b1ba]" : "bg-[#005469] hover:bg-[#00728F] text-white"}>
                        <td className="px-4 py-2 border-b border-gray-300">
                          <button onClick={() => navigate("/DetalleEvento", { state: event })} className="flex font-bold hover:underline">
                            {event.nombre}
                          </button>
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">{event.descrpicion}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{new Date(event.fecha).toISOString().split("T")[0]}</td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          <ul>
                            {event.usuariosId.map((userId) => {
                              const user = usuarios.find((u) => u.userId === userId);
                              return user ? <li key={userId}>{user.nombre}</li> : null;
                            })}
                          </ul>
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 flex justify-end space-x-2">
                          <button
                            className="text-black hover:text-gray-600"
                            title="Editar"
                            onClick={() => navigate("/ModificarEvento", { state: event })}
                          >
                            <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Eliminar"
                            onClick={() => handleDeleteEvento(event.id)}
                          >
                            <svg className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tabla para pantallas chicas */}
              <div className="md:hidden space-y-4">
                {eventos && Array.isArray(eventos) && eventos.length > 0 ? (
                  eventos.map((event) => (
                    <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
                      <p className="text-xs text-gray-500 mt-1">{event.nombre}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.descrpicion}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {event.fecha && !isNaN(new Date(event.fecha)) 
                          ? new Date(event.fecha).toISOString().split("T")[0] 
                          : "Fecha no disponible"}
                      </p>
                      <ul className="text-xs text-gray-500 mt-1">
                        {event.usuariosId && Array.isArray(event.usuariosId) ? (
                          event.usuariosId.map((userId) => {
                            const user = usuarios.find((u) => u.userId === userId);
                            return user ? <li key={userId}>{user.nombre}</li> : null;
                          })
                        ) : (
                          <li>No hay usuarios</li>
                        )}
                      </ul>
                      <div className="flex justify-between mt-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                          title="Detalle"
                          onClick={() => navigate("/DetalleEvento", { state: event })}
                        >
                          Detalle
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                          title="Eliminar"
                          onClick={() => handleDeleteEvento(event.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay eventos disponibles</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Eventos;
