import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "./otros/Header";
import { fetchData, updateData, postData } from "../redux/apiSlice";

const actualizarEstados = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");
  const { inactivos, clientes, asignaciones } = useSelector((state) => state.api);
  const usuario_id = localStorage.getItem('usuarioId');

  useEffect(() => {
    dispatch(fetchData("/Cliente/Inactivos"));
    dispatch(fetchData("/Cliente"));
    dispatch(fetchData('asignacion'));
    
  }, [dispatch]);

  const handleActualizarEstado = async (id) => {
    console.log("🔵 Iniciando handleActualizarEstado", id);

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

    if (!result.isConfirmed) {
        console.log("🟡 Usuario canceló la acción");
        return;
    }

    try {
        console.log("🔵 Buscando cliente...");
        const cliente = clientes.find((cliente) => cliente.id == id);
        if (!cliente) {
            throw new Error("❌ Cliente no encontrado");
        }
        console.log("✅ Cliente encontrado:", cliente);

        console.log("🔵 Actualizando cliente...");
        const updateCliente = { ...cliente, esInactivo: true, usuario_id: usuario_id };
        await dispatch(updateData({ url: 'cliente', id: updateCliente.id, data: updateCliente }));
        console.log("✅ Cliente actualizado");

        console.log("🔵 Buscando asignación...");
        const notificacionAsignacion = asignaciones.find(asignacion => asignacion.cliente_id === cliente.id);
        if (notificacionAsignacion) {
          console.log("🔵 Enviando notificación...");
        const response = await dispatch(
          postData({
            url: "notificacion",
            data: { 
              cliente_id: notificacionAsignacion.cliente_id, 
              mensaje: `Cliente ${cliente.nombre} asignado a usted, pasado a inactivo`, 
              usuariosId: [notificacionAsignacion.comun_id] 
            },
          })
        );
        console.log("✅ Notificación enviada", response);
        }
        

        

        Swal.fire({
          title: "Cliente actualizado",
          text: "El cliente ha sido actualizado a inactivo.",
          icon: "success",
          confirmButtonColor: "#56C3CE"
        });

    } catch (error) {
        console.error("❌ Error en handleActualizarEstado:", error);
        Swal.fire("Error", "No se pudo pasar a inactivo", "error");
    }
};


  const handleActualizarEstadoLista = async () => {
    // Lógica para actualizar el estado de múltiples clientes
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Los clientes seleccionados quedaran inactivos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Liberar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const clientesAActualizar = clientes.filter(cliente =>
        inactivos.some(inactivo => inactivo.id === cliente.id)
      );
      for (const cliente of clientesAActualizar) {
        const updateCliente = { ...cliente, esInactivo: true, usuario_id: usuario_id };
        await dispatch(updateData({ url: 'cliente', id: updateCliente.id, data: updateCliente }));
      }
 // Notificaciones
     const notificacionesAsignacion = asignaciones.filter(asignacion => clientesAActualizar.some(cliente => cliente.id === asignacion.cliente_id));

      for (const notificacion of notificacionesAsignacion) {
          const cliente = clientes.find((c) => c.id === notificacion.cliente_id);
          const listaUsuarios = notificacion.comun_id ? [notificacion.comun_id] : [];
          const response = await dispatch(
              postData({
                url: "notificacion",
                data: { cliente_id: notificacion.cliente_id, mensaje: `Cliente ${cliente.nombre} asignado a usted, pasado a inactivo`, usuariosId: listaUsuarios },
                })
            );
      }

      Swal.fire({
        title: "Clientes actualizados",
        text: "Los clientes han sido actualizados a Inactivo.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });
    } catch (error) {
      Swal.fire("Error", "No se pudieron actualizar los clientes", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="text-white text-center pt-4">
        <h2 className="text-3xl font-semibold">Clientes activos sin cargas en los últimos 6 meses</h2>
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
            onClick={() => handleActualizarEstadoLista()}
          >
            Actualizar todos
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {inactivos.map((inactivo) => (
          <div
            key={inactivo.id}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-500"
          >
            <p className="text-gray-800"><strong>Razón Social:</strong> {inactivo.razonSocial}</p>
            <p className="text-gray-800"><strong>RUT:</strong> {inactivo.rut}</p>
            <p className="text-gray-800"><strong>Correo:</strong> {inactivo.correo}</p>

            <button
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => handleActualizarEstado(inactivo.id)}
            >
              Actualizar Estado
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default actualizarEstados;
