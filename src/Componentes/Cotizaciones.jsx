import React, { useState, useEffect } from "react";
import Header from "./otros/Header";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData, postData } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import QuotationPdf from "./QuotationPDF"; // Importa el componente del PDF


function Cotizaciones() {
  const [activeTab, setActiveTab] = useState("Cotizaciones");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cotizaciones, clientes, usuarios } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData('cotizacion'));
    dispatch(fetchData('cliente'));
    dispatch(fetchData('usuario'));
  }, [dispatch])

  const handleCopiar = async (cotizacion) => {
    try {
      const nuevaCotizacion = {
        ...cotizacion
      };
  
      const response = await dispatch(postData({ url: "cotizacion", data: nuevaCotizacion }));
  
      if (response.error) {
        throw new Error(response.error.message || "Error desconocido");
      }
    
      Swal.fire({
        icon: "success",
        title: "Cotización copiada exitosamente.",
        showConfirmButton: false,
        timer: 1500
      });
  
    } catch (error) {
      console.error("Error en agregarCotizacion:", error);
      Swal.fire({
        icon: "error",
        title: "Error al copiar la cotización",
        text: error.message
      });
    }
  };
  
  
  const handleDetalle = async (cotizacion) => {
    try {
      const doc = <QuotationPdf data={cotizacion} />;

      if (!doc) {
        throw new Error("Error: QuotationPdf no se generó correctamente.");
      }

      const blob = await pdf(doc).toBlob();

      if (!blob) {
        throw new Error("Error: No se pudo generar el Blob del PDF.");
      }

      const pdfURL = URL.createObjectURL(blob);
      window.open(pdfURL, "_blank");
    } catch (pdfError) {
      console.error("Error al generar el PDF:", pdfError);
      Swal.fire({
        icon: "error",
        title: "Error al generar el PDF",
        text: pdfError.message
      });
    }
  };

  const handleDeleteCotizacion = async (cotizacionId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar esta cotización.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const response = await dispatch(deleteData({ url: "cotizacion", id: cotizacionId }));
  
      if (response.error) {
        throw new Error();
      }
      await dispatch(fetchData("/cotizacion"));
  
      Swal.fire({
        title: "Eliminado",
        text: "La cotización ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonColor: "#56C3CE"
      });
  
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la cotización. Intenta nuevamente.", "error");
    }
  };
  

  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");

  const cotizacionesFiltradas = cotizaciones.filter((c) => {
    if (filtroCliente && filtroCliente != c.cliente_id) return false;
    if (filtroUsuario && filtroUsuario != c.usuario_id) return false;
    const cotiFecha = c.fecha ? c.fecha : null;
    if (filtroFecha && filtroFecha != cotiFecha) return false;
    return true;
  });

  const clearFilters = () => {
    setFiltroUsuario("");
    setFiltroFecha("");
    setFiltroCliente("");
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
          <select
            value={filtroCliente}
            className="p-2 rounded bg-white w-full sm:w-auto"
            onChange={(e) => setFiltroCliente(e.target.value)}
          >
            <option value="" disabled>
              Filtrar por cliente
            </option>
            {clientes.length > 0 ? clientes.map((cli) => (
              <option key={cli.id} value={cli.id}>
                {cli.nombre}
              </option>
            )) : (
              <option value="" disabled>No hay clientes disponibles</option>
            )}
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
          <button
            className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
            onClick={clearFilters}
          >
            Limpiar
          </button>
        </div>

        <button
          className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
          onClick={() => navigate("/CrearCotizacion")}
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

      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          {cotizacionesFiltradas.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No hay cotizaciones para mostrar.</div>
          ) : (
            <div>
              {/* Para pantallas grandes: Tabla */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full truncate">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">ID</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Fecha</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Cliente</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left">Usuario</th>
                      <th className="px-4 py-2 border-b border-gray-300 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizacionesFiltradas.map((coti, index) => (
                      <tr key={coti.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="px-4 py-2 border-b border-gray-300">{coti.id}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{new Date(coti.fecha).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {clientes.find(cli => cli.id == coti.cliente_id)?.nombre || 'N/A'}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {usuarios.find(user => user.userId == coti.usuario_id)?.nombre || 'N/A'}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 flex justify-end space-x-2">
                          <button
                            className="bg-[#005469] hover:bg-[#00728F] text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                            title="Detalle"
                            onClick={() => handleDetalle(coti)}
                          >
                            PDF
                          </button>

                          <button
                            className="bg-[#56C3CE] hover:bg-[#59b1ba] text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                            title="Modificar"
                            onClick={() => handleCopiar(coti)}
                          >
                            Copiar
                          </button>
                          <button
                            className="text-black hover:text-gray-600"
                            title="Editar"
                            onClick={() => navigate("/ModificarCotizacion", { state: coti })}
                          >
                            <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Eliminar"
                            onClick={() => handleDeleteCotizacion(coti.id)}
                          >
                            <svg
                              className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
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

              {/* Para pantallas pequeñas: Tarjetas */}
              <div className="md:hidden space-y-4">
                {cotizacionesFiltradas.map((coti) => (
                  <div key={coti.id} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-800"><strong>ID:</strong> {coti.id}</p>
                    <p className="text-gray-800"><strong>Fecha:</strong> {new Date(coti.fecha).toLocaleDateString()}</p>
                    <p className="text-gray-800"><strong>Cliente:</strong> {clientes.find(cli => cli.id === coti.cliente_id)?.nombre || 'N/A'}</p>
                    <p className="text-gray-800"><strong>Usuario:</strong> {usuarios.find(user => user.userId === coti.usuario_id)?.nombre || 'N/A'}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm" onClick={() => handleDetalle(coti)}>
                        Detalle
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Eliminar"
                        onClick={() => handleDeleteCotizacion(coti.id)}
                      >
                        <svg
                          className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm" onClick={() => navigate("/ModificarCotizacion", { state: coti })}>
                        Modificar
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm" onClick={() => handleCopiar(coti)}>
                        Copiar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cotizaciones; 