import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetch, borrarCliente } from "../redux/clientesSlice";
import { useNavigate } from 'react-router-dom';
import {fetchA, agregarAsignaciones} from "../redux/AsignacionesSlice";

function Clientes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetch('/cliente'));
    dispatch(fetch('/usuario'));
    dispatch(fetchA('/asignacion'));
  }, [dispatch]);

  const verAsignado = (cli) => {
    const asignado = asignaciones.find((asignacion) => asignacion.cliente_id === cli.id);
    if (!asignado) return "Libre";
    const resultado = cliente.find((cliente) => cliente.id === asignado.comun_id);
    return resultado ? resultado.nombre : "Libre";
  }

  const { cliente, assignees, status, error } = useSelector((state) => state.cliente);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Clientes");
  const { asignaciones } = useSelector((state) => state.Asignacion);

  const handleAsignar = async (clienteId) => {
    const data = {
      id: 0,
      cliente_id: clienteId,
      comun_id: 61,
      fecha: "2025-01-08T13:54:51.805Z",
      descripcion: "Prueba de asignación",
      estado: "Pendiente"
    }

    dispatch(agregarAsignaciones({ url: '/asignacion', data }));
   }

   const handleREAsignar = async (clienteId) => {
    const result = await Swal.fire({
      title: "EL cliente ya tiene un usuario asignado",
      text: "¿Estas seguro de re Asignar el cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const { value: userId } = await Swal.fire({
      title: 'Selecciona un usuario',
      input: 'select',
      inputOptions: assignees.reduce((options, assignee) => {
        options[assignee.userId] = `${assignee.nombre} ${assignee.apellido}`;
        return options;
      }, {}),
      inputPlaceholder: 'Selecciona un usuario',
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
      });

      if (userId) {
        const data = {
          id: 0,
          cliente_id: clienteId,
          comun_id: userId,
          fecha: new Date().toISOString(),
          descripcion: "Reasignación de cliente",
          estado: "Aprobada"
        };

        dispatch(agregarAsignaciones({ url: '/asignacion', data }));
      }
    }
  }

  const handleDeleteCliente = async (clienteId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este cliente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(borrarCliente({ url: '/cliente', id: clienteId }));

      await Swal.fire({
        title: "Eliminado",
        text: "El cliente ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el cliente. Intenta nuevamente.", "error");
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Filter clients based on assignedFilter, statusFilter, and search
  const filteredClients = cliente.filter((client) => {
    if (statusFilter && (client.estado !== statusFilter && client.esInactivo.toString() !== statusFilter)) return false;
    if (assignedFilter && client.assigned !== assignedFilter) return false;
    if (search && !client.nombre.toLowerCase().startsWith(search.toLowerCase())) return false;

    return true;
  });

  const clearFilters = () => {
    setAssignedFilter("");
    setStatusFilter("");
    setSearch("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap justify-between px-6 pt-6 space-y-4 md:space-y-0 md:flex-row">
        <div className="flex flex-wrap sm:space-x-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Buscar"
              className="pl-9 py-2 rounded bg-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-wrap space-x-2 w-full sm:w-auto sm:flex-row mt-2 sm:mt-0">
            <select
              className="px-4 py-2 rounded bg-white w-full sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="" disabled>
                Filtrar por
              </option>
              <option value="Asignado">Asignados</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Libre">Libres</option>
              <option value="false">Activos</option>
              <option value="true">Inactivos</option>
              <option value="Perdido">Perdidos</option>
            </select>
            <select
              className="px-4 py-2 rounded bg-white w-full sm:w-auto"
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
            >
              <option value="" disabled>
                Asignado a
              </option>
              <option value="JRW">JRW</option>
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.nombre} {assignee.apellido}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
              onClick={clearFilters}
            >
              Limpiar
            </button>
          </div>
        </div>
        <div className="!mt-0 flex space-x-2 w-full sm:w-auto justify-between sm:justify-start pt-2 894-screen:pt-0">
          <button className="px-4 py-2 rounded bg-white hover:bg-gray-200 transition-all w-full sm:w-auto">
            Generar reporte
          </button>
          <button
            className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
            onClick={() => navigate("/crearCliente")}
          >
            <div className="flex space-x-1">
              <p>Nuevo</p>
              <svg class="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
            </div>
          </button>
        </div>
      </div>

      {/* Client List */}
      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          {/* Client List Table */}
          <div className="overflow-x-auto">
            {filteredClients.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No hay clientes para mostrar.
              </div>
            ) : (
              <table className="table-auto w-full truncate">
                <tbody>
                  {filteredClients.map((client, index) => (
                    <tr key={client.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                      <td className="px-4 py-2 border-b border-gray-300 hover:text-gray-700 hover:underline">
                        <Link to={`/clientes/${client.id}`} className="flex">
                          <b>{client.nombre}</b>
                          <svg
                            className="h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                      {(() => {
                        let asignado = null;
                        for (let i = 0; i < asignaciones.length; i++) {
                          if (asignaciones[i].cliente_id === client.id) {
                            asignado = asignaciones[i];
                            break;
                          }
                        }
                        console.log(assignees);
                        for (let i = 0; i < assignees.length; i++) {
                          if (assignees[i].userId === asignado?.comun_id) {
                            asignado = assignees[i];
                            break;
                          }
                        }
                        return asignado ? `Asignado a: ${asignado.nombre}` : "Libre";
                      })()}
                    </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        <div className="flex space-x-1">
                          <span>
                            Última carga:{" "}
                            {client.fechaUltCarga != null ? client.fechaUltCarga : "--"}
                          </span>
                          <svg className="h-3" viewBox="0 0 24 24" fill="none">
                            <circle
                              fill={`${client.esInactivo ? "red" : "green"}`}
                              cx="12"
                              cy="12"
                              r="9"
                            />
                          </svg>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300">
                        <div className="flex justify-end space-x-2">
                          {/* WhatsApp Button */}
                          <a target="blank" href={`https://wa.me/${client.telefono}`} className="text-green-600 hover:text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                          </a>
                          
                          {/* Edit Button */}
                          <button className="text-black hover:text-gray-600" title="Editar"
                            onClick={() => navigate(`/modificarCliente/${client.id}`)}>
                            <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                          </button>
                          {/* Asignar Button */}
                          {client.estado == "Libre" ? (
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              title="Asignar"
                              onClick={() => handleAsignar(client.id)}
                            >
                              <svg
                                className="h-8 w-8"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              title="Asignar"
                              onClick={() => handleREAsignar(client.id)}
                            >
                              <svg
                                className="h-8 w-8"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                          )}
                                                    
                          {/* Delete Button */}
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Eliminar"
                            onClick={() => handleDeleteCliente(client.id)}
                          >
                            <svg
                              className="h-8 w-8"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                          

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

export default Clientes;
