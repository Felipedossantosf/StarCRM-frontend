import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Header from "./otros/Header";
import { fetchData, updateData } from "../redux/apiSlice";

const actualizarEstados = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Actualizar Estados");
  const { inactivos } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData("/Cliente/Inactivos"));
  }, [dispatch]);

  const handleActualizarEstado = (id) => {
    // Lógica para actualizar el estado
    Swal.fire({
      title: "¿Actualizar estado?",
      text: "¿Estás seguro de que quieres activar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateData({ id, estado: "activo" })); 
        Swal.fire("Actualizado", "El estado ha sido actualizado", "success");
      }
    });
  };

  console.log(inactivos);
  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C] p-6">
    <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <h1 className="text-white text-2xl font-bold mb-4">Lista de Inactivos</h1>

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
