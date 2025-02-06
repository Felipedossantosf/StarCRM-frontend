import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "./otros/Header";
import { fetchData, updateData } from "../redux/apiSlice";

const actualizarEstados = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Actualizar Estados");
  const { inactivos, clientes } = useSelector((state) => state.api);
  const usuario_id = localStorage.getItem('usuarioId');

  useEffect(() => {
    dispatch(fetchData("/Cliente/Inactivos"));
    dispatch(fetchData("/Cliente"));
  }, [dispatch]);

  const handleActualizarEstado = async (id) => {
    // Lógica para actualizar el estado
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
              const cliente = clientes.find((cliente) => cliente.id === id);
            if (cliente){
              const updateCliente = { ...cliente, esInactivo: true,usuario_id: usuario_id}
              await dispatch(updateData({url: 'cliente', id: updateCliente.id, data: updateCliente}));
            }
              Swal.fire({
                      title: "Cliente actualizado",
                      text: "El cliente ha sido actualizado a Inactivo.",
                      icon: "success",
                      confirmButtonColor: "#56C3CE"
                    });
            } catch (error) {
              Swal.fire("Error", "No se pudo pasar a inactivo", "error");
            }
             
   
  };

  const handleActualizarEstadoLista = async () => {
    // Lógica para actualizar el estado de múltiples clientes
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Los clientes seleccionados serán marcados como libres y sus asignaciones serán eliminadas.",
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
         console.log(clientesAActualizar);
        for (const cliente of clientesAActualizar) {
            const updateCliente = { ...cliente, esInactivo: true, usuario_id: usuario_id };
            await dispatch(updateData({ url: 'cliente', id: updateCliente.id, data: updateCliente }));
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


  console.log(inactivos);
  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C] p-6">
    <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <h1 className="text-white text-2xl font-bold mb-4">Clientes Activos sin carga los ultimos 6 meses</h1>
      <div className="flex space-x-2 w-full md:w-auto justify-end">

          <button
            className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
            onClick={() => handleActualizarEstadoLista()}
          >
            <div className="flex space-x-1 items-center">
              <p>Actualizar todos</p>
              <svg
                className="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </button>
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
