import React, { useState, useEffect } from "react";
import Header from "./otros/Header";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";



function Eventos() {
  const [activeTab, setActiveTab] = useState("Eventos");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientes, usuarios, eventos, proveedores } = useSelector((state) => state.api);
  useEffect(() => {
    dispatch(fetchData('cliente'));
    dispatch(fetchData('usuario'));
    dispatch(fetchData('evento'));
    dispatch(fetchData('proveedor'));

  }, [dispatch])

  const [filtroUsuario, setFiltroUsuario] = useState('')
  const [filtroFecha, setFiltroFecha] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroCliente, setFiltroCliente] = useState('')
  const [filtroProveedor, setFiltroProveedor] = useState('')

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
    
    if (!e.fecha || isNaN(new Date(e.fecha).getTime())) {
        console.log("Fecha inválida:", e.fecha);
        return false;
    }
    const eventoFecha = new Date(e.fecha).toISOString().split("T")[0];
    if (filtroFecha && filtroFecha != eventoFecha) return false;
    if (filtroCliente && !e.comercialesId.includes(parseInt(filtroCliente))) return false;
    if (filtroProveedor && !e.comercialesId.includes(parseInt(filtroProveedor))) return false;
    if (filtroTipo && filtroTipo == e.esCarga.toString()) return false;

    return true;
});


  const clearFilters = () => {
    setFiltroUsuario("");
    setFiltroFecha("");
    setFiltroCliente("");
    setFiltroProveedor("");
    setFiltroTipo("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto p-4">
        {/* Filtros y botones */}
        <div className="mb-4 space-y-4">
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
              <option value="" disabled>
                Filtrar por tipo
              </option>
              <option value="false">Reunión comercial</option>
              <option value="true">Carga</option>
            </select>
            <select
              value={filtroUsuario}
              className="p-2 rounded bg-white w-full sm:w-auto"
              onChange={(e) => setFiltroUsuario(e.target.value)}
            >
              <option value="" disabled>
                Filtrar por usuario
              </option>
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
              <option value="" disabled>
                Filtrar por cliente
              </option>
              {clientes.length > 0 ? clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              )) : (
                <option value="" disabled>No hay clientes disponibles</option>
              )}
            </select>
            <select
              value={filtroProveedor}
              className="p-2 rounded bg-white w-full sm:w-auto"
              onChange={(e) => setFiltroProveedor(e.target.value)}
            >
              <option value="" disabled>
                Filtrar por proveedor
              </option>
              {proveedores.length > 0 ? proveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              )) : (
                <option value="" disabled>No hay proveedores disponibles</option>
              )}
            </select>
            <button
              className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
              onClick={clearFilters}
            >
              Limpiar
            </button>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => navigate("/AgregarEvento", { state: { esCarga: false } })}
            >
              Agregar Reunion
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={() => navigate("/AgregarEvento", { state: { esCarga: true } })}
            >
              Agregar Carga
            </button>
          </div>
        </div>


        {/* Tabla para pantallas más grandes */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Descripción</th>
                <th className="py-2 px-4 text-left">Fecha</th>
                <th className="py-2 px-4 text-left">Usuarios</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEventos.map((event) => (
                <tr
                  key={event.id}
                  className={`border-b ${event.esCarga ? "bg-green-300" : "bg-blue-300"
                    }`}
                >
                  <td className="py-2 px-4">{event.nombre}</td>
                  <td className="py-2 px-4">{event.descrpicion}</td>
                  <td className="py-2 px-4">{event.fecha}</td>
                  <td className="py-2 px-4">
                    <ul>
                      {event.usuariosId.map((userId) => {
                        const user = usuarios.find((u) => u.userId === userId);
                        return user ? <li key={userId}>{user.nombre}</li> : null;
                      })}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Detalle"
                      onClick={() => navigate("/DetalleEvento", { state: event })}
                    >
                      Detalle
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Eliminar"
                      onClick={() => handleDeleteEvento(event.id)}
                    >
                      Eliminar
                    </button>

                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Modificar"
                      onClick={() => navigate("/ModificarEvento", { state: event })}
                    >
                      Modificar
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
        <p className="text-xs text-gray-500 mt-1">{event.fecha}</p>

        <p className="text-xs text-gray-500 mt-1">
          <ul>
            {event.usuariosId && Array.isArray(event.usuariosId) ? (
              event.usuariosId.map((userId) => {
                const user = usuarios.find((u) => u.userId === userId);
                return user ? <li key={userId}>{user.nombre}</li> : null;
              })
            ) : (
              <li>No hay usuarios</li>
            )}
          </ul>
        </p>

        <div className="flex justify-between mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
            title="Detalle"
            onClick={() => navigate("/DetalleEvento", { state: event })}
          >
            Detalle
          </button>
        </div>

        <div className="flex justify-between mt-2">
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
      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          <div className="overflow-x-auto">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eventos;