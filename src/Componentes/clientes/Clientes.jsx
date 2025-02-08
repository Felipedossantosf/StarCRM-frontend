import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "../otros/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData, postData, updateData } from "../../redux/apiSlice";
import { useNavigate } from 'react-router-dom';

function Clientes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData('cliente'));
    dispatch(fetchData('usuario'));
    dispatch(fetchData('asignacion'));
  }, [dispatch]);

  const { clientes, usuarios, asignaciones } = useSelector((state) => state.api);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Clientes");
  const usuario_id = parseInt(localStorage.getItem('usuarioId'));


  const asignado = (clienteId) => {
    // Buscar todas las asignaciones para un cliente específico
    let lista = asignaciones.filter((asignacion) => asignacion.cliente_id === clienteId);

    if (lista.length === 0) return "Libre"; // Si no hay asignaciones, el cliente está libre

    // En caso de que haya asignaciones, seleccionamos la primera y mostramos el nombre del usuario asignado
    const resultado = lista[0]; // Suponemos que solo hay una asignación por cliente
    if (resultado) {
      // Verificamos que haya un usuario asignado y mostramos su nombre completo
      const usuario = usuarios.find((usuario) => usuario.userId === resultado.comun_id);
      return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Usuario no encontrado";
    }

    return "Libre"; // En caso de que no se haya encontrado un usuario asignado
  };


  const handleAsignar = async (clienteId) => {
    // Verificar si el cliente está asignado o no
    if (asignado(clienteId) !== "Libre") {
      const result = await Swal.fire({
        title: "El cliente ya tiene un usuario asignado.",
        text: "¿Deseas reasignar el cliente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#56C3CE",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;  // Si no confirma, no hacemos nada

      // Buscar la asignación existente y eliminarla
      let asignacionExistente = asignaciones.find((asignacion) => asignacion.cliente_id === clienteId);
      if (asignacionExistente) {
        // Eliminar la asignación existente
        await dispatch(deleteData({ url: 'asignacion', id: asignacionExistente.id }));
      }
    }

    const { value: userId } = await Swal.fire({
      title: 'Selecciona un usuario',
      input: 'select',
      inputOptions: usuarios.reduce((options, u) => {
        options[u.userId] = `${u.nombre} ${u.apellido}`;
        return options;
      }, {}),
      inputPlaceholder: 'Selecciona un usuario',
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
    });

    if (userId) {
      // Crear nueva asignación
      const data = {
        cliente_id: clienteId,
        comun_id: userId,
        descripcion: "Reasignación de cliente",
        estado: "Aprobada",
        fecha: new Date().toISOString(),
      };

      // Realizar el POST para crear la nueva asignación
      dispatch(postData({ url: 'asignacion', data }));

      //Creo notificacion
      const listaUsuarios = data.comun_id ? [data.comun_id] : [];
      const clienteNotificacion = clientes.find((cliente) => cliente.id == clienteId ) 
      const response = await dispatch(
        postData({
          url: "notificacion",
          data: { cliente_id: data.cliente_id, mensaje: `Cliente ${clienteNotificacion.nombre} asignado`, usuariosId: listaUsuarios },
        })
      );
      Swal.fire({
        title: "Cliente reasignado",
        text: "El cliente ha sido reasignado correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });
    }
  };

  const handleLiberarCliente = async (clienteId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este cliente será marcado como libre y su asignación será eliminada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Liberar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      let asignacionExistente = asignaciones.find((asignacion) => asignacion.cliente_id === clienteId);
      if (!asignacionExistente) {
        throw new Error("No se encontró la asignación del cliente.");
      }
      // Eliminar asignación
      await dispatch(deleteData({ url: "asignacion", id: asignacionExistente.id }));

      // Marcar cliente como libre
      const cliente = clientes.find((c) => c.id === clienteId);
      if (!cliente) {
        throw new Error("No se encontró el cliente.");
      }
      const updatedCliente = { ...cliente, estado: "Libre", usuario_id: usuario_id };
      await dispatch(updateData({ url: "cliente", id: updatedCliente.id, data: updatedCliente }));


     
      await dispatch(fetchData('asignacion'));
      // Enviar notificación
      const listaUsuarios = asignacionExistente.comun_id ? [asignacionExistente.comun_id] : [];

      const response = await dispatch(
        postData({
          url: "notificacion",
          data: { cliente_id: asignacionExistente.cliente_id, mensaje: `Cliente ${updatedCliente.nombre} liberado`, usuariosId: listaUsuarios },
        })
      );
      Swal.fire({
        title: "Cliente liberado",
        text: "El cliente ha sido liberado correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo liberar el cliente. Intenta nuevamente.", "error");
    }
  };


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
      const response = await dispatch(deleteData({ url: 'cliente', id: clienteId, data: usuario_id }));
      if (response.error) {
        throw new Error();
      }
      await dispatch(fetchData('cliente'));

      Swal.fire({
        title: "Eliminado",
        text: "El cliente ha sido eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el cliente. Intenta nuevamente.", "error");
    }
  };

  const filteredClients = clientes.filter((cliente) => {
    if (statusFilter) {
      if (statusFilter === 'activo' && cliente.esInactivo !== false) return false;
      if (statusFilter === 'inactivo' && cliente.esInactivo !== true) return false;
      if (statusFilter === 'libre' && cliente.estado.toLowerCase() !== statusFilter) return false;
    }

    // Filtrar asignados por comun_id (usuario_id)
    if (assignedFilter) {
      // Verifica si el cliente tiene una asignación
      const asignacion = asignaciones.find((asignacion) => asignacion.cliente_id === cliente.id);
      if (!asignacion) return false;  // Si no tiene asignación, se excluye el cliente

      const usuario = usuarios.find((usuario) => usuario.userId === asignacion.comun_id);
      if (!usuario || usuario.userId !== parseInt(assignedFilter)) return false;
    }

    if (search && !cliente.nombre.toLowerCase().startsWith(search.toLowerCase())) return false;

    return true;
  });


  const clearFilters = () => {
    setAssignedFilter("");
    setStatusFilter("");
    setSearch("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap justify-between px-6 pt-6 space-y-4 md:space-y-0">
        <div className="flex flex-wrap w-full md:w-auto md:space-x-4 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-auto">
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar"
              className="pl-9 py-2 rounded bg-white w-full focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 rounded bg-white w-full md:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="" disabled>Filtrar por</option>
            <option value="libre">Libres</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>

          <select
            className="px-4 py-2 rounded bg-white w-full md:w-auto"
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
          >
            <option value="" disabled>Asignado a</option>
            {/* <option value="JRW">JRW</option> */}
            {usuarios.length > 0 ? usuarios.map((usuario) => (
              <option key={usuario.userId} value={usuario.userId}>
                {usuario.nombre} {usuario.apellido}
              </option>
            )) : (
              <option value="" disabled>No hay usuarios disponibles</option>
            )}
          </select>

          <button
            className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
            onClick={clearFilters}
          >
            Limpiar
          </button>
        </div>

        <div className="flex space-x-2 w-full md:w-auto justify-end">
          <button
            className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
            onClick={() => navigate("/clientes/crear")}
          >
            <div className="flex space-x-1 items-center">
              <p>Nuevo</p>
              <svg
                className="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* lista de clientes */}
      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-4 rounded">
          <div className="overflow-x-auto">
            {filteredClients.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No hay clientes para mostrar.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:hidden gap-4">
                {filteredClients.map((cliente) => (
                  <div key={cliente.id} className="p-4 border rounded-lg shadow bg-gray-100">
                    <Link to={`/clientes/${cliente.id}`} className="flex font-bold hover:underline">
                      {cliente.nombre}
                    </Link>
                    <p>{asignado(cliente.id)}</p>
                    <div className="flex">
                      <p>Última carga: {cliente.fechaUltCarga || "--"}</p>
                      <svg className="h-3" viewBox="0 0 24 24" fill="none">
                        <circle
                          fill={cliente.esInactivo ? "red" : "green"}
                          cx="12"
                          cy="12"
                          r="9"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <div className="flex justify-end space-x-2">
                        {asignado(cliente.id) !== "Libre" && (
                          <button
                            className="text-orange-500 hover:text-orange-700"
                            title="Liberar"
                            onClick={() => handleLiberarCliente(cliente.id)}
                          >Liberar</button>
                        )}

                        <a
                          target="_blank"
                          href={`https://wa.me/${cliente.telefono}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                        </a>

                        <button
                          className="text-black hover:text-gray-600"
                          title="Editar"
                          onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                        >
                          <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                          </svg>
                        </button>

                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="Asignar"
                          onClick={() => handleAsignar(cliente.id)}
                        >
                          <svg
                            className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>

                        <button
                          className="text-red-500 hover:text-red-700"
                          title="Eliminar"
                          onClick={() => handleDeleteCliente(cliente.id)}
                        >
                          <svg
                            className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
            <table className="hidden md:table table-auto w-full text-left">
              <tbody>
                {filteredClients.map((cliente, index) => (
                  <tr key={cliente.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <Link to={`/clientes/${cliente.id}`} className="flex items-center font-bold">
                        {cliente.nombre}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">{asignado(cliente.id)}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <div className="flex space-x-1">
                        <span>
                          Última carga: {cliente.fechaUltCarga == null ? "--" : new Date(cliente.fechaUltCarga).toISOString().split("T")[0]}
                        </span>
                        <svg className="h-3" viewBox="0 0 24 24" fill="none">
                          <circle
                            fill={cliente.esInactivo ? "red" : "green"}
                            cx="12"
                            cy="12"
                            r="9"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <div className="flex justify-end space-x-2">
                        {asignado(cliente.id) !== "Libre" && (
                          <button
                            className="text-orange-500 hover:text-orange-700"
                            title="Liberar"
                            onClick={() => handleLiberarCliente(cliente.id)}
                          >Liberar</button>
                        )}

                        <a
                          target="_blank"
                          href={`https://wa.me/${cliente.telefono}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                        </a>

                        <button
                          className="text-black hover:text-gray-600"
                          title="Editar"
                          onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
                        >
                          <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                          </svg>
                        </button>

                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="Asignar"
                          onClick={() => handleAsignar(cliente.id)}
                        >
                          <svg
                            className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>

                        <button
                          className="text-red-500 hover:text-red-700"
                          title="Eliminar"
                          onClick={() => handleDeleteCliente(cliente.id)}
                        >
                          <svg
                            className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
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
          </div>
        </div>
      </div>
    </div>

  );
}

export default Clientes;