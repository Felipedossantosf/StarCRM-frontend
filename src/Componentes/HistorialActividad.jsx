import React, { useState } from "react";
import Header from "./otros/Header";
import { useSelector } from "react-redux";
import { fetchData, fetchById } from "../redux/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function HistorialActividad() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData("usuario"));
    dispatch(fetchData("cliente"));
    dispatch(fetchData("proveedor"));
    dispatch(fetchData("actividad"));
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("Historial de actividad");
  const { usuarios, actividades, clientes, proveedores } = useSelector((state) => state.api);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProveedor, setFiltroProveedor] = useState("");

  const filteredActividades = actividades.filter((a) => {
    if (filtroUsuario && filtroUsuario != a.usuario_id) return false;
    const actividadFecha = new Date(a.fecha).toISOString().split("T")[0];
    if (filtroFecha && filtroFecha != actividadFecha) return false;
    if (filtroCliente && !actividadCoincide(a, filtroCliente)) return false;
    if (filtroProveedor && !actividadCoincide(a, filtroProveedor)) return false;
    return true;
  });

  const buscarUsuario = (id) => {
    return usuarios.find((usuario) => usuario.userId === id);
  };

  const clearFilters = () => {
    setFiltroUsuario("");
    setFiltroFecha("");
    setFiltroCliente("");
    setFiltroProveedor("");
  };

  function extraerComercial(desc) {
    const partes = desc.split(':');
    if (partes.length > 1)
      return partes[1].trim();
  }

  function actividadCoincide(actividad, filtro) {
      return extraerComercial(actividad.descripcion) === filtro;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Search and Filter Bar */}
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
          <div className="flex sm:flex-wrap space-x-2 w-full sm:w-auto sm:flex-row mt-2 sm:mt-0">
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
                <option key={c.id} value={c.nombre}>
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
                <option key={p.id} value={p.nombre}>
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
        </div>
      </div>

      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          <div className="overflow-x-auto">
            {filteredActividades.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No hay actividad para mostrar.
              </div>
            ) : (
              <table className="table-auto w-full truncate">
                <tbody>
                  <th className="text-left px-4 py-2 border-b border-gray-300">Usuario</th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">Descripción</th>
                  <th className="text-left px-4 py-2 border-b border-gray-300">Fecha</th>
                  {filteredActividades.map((actividad, index) => (
                    <tr key={actividad.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {buscarUsuario(actividad.usuario_id).nombre + " "}
                        {buscarUsuario(actividad.usuario_id).apellido + " ("}
                        {buscarUsuario(actividad.usuario_id).username + ")"}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        {actividad.descripcion}
                      </td>

                      <td className="px-4 py-2 border-b border-gray-300">
                        <div className="flex space-x-1">
                          <span>
                            {new Date(actividad.fecha).toISOString().split("T")[0]}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialActividad;