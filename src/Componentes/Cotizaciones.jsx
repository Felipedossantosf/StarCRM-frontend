import React, { useState, useEffect } from "react";
import Header from "./otros/Header";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData, postData } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import QuotationPdf from "./QuotationPDF"; // Importa el componente del PDF


function Cotizaciones() {
   const [activeTab, setActiveTab] = useState("Eventos");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cotizaciones, clientes, usuarios} = useSelector((state) => state.api);
    
    useEffect(() => {
        dispatch(fetchData('cotizacion'));
        dispatch(fetchData('cliente'));
        dispatch(fetchData('usuario'));
      }, [dispatch])



const handleCopiar = async (cotizacion) => {
  try {
    
    const cotizacion2 = {
      id: cotizacion.id,
      estado: cotizacion.estado,
      fecha: cotizacion.fecha,
      metodosPago: cotizacion.metodosPago,
      subtotal: cotizacion.subtotal,
      porcDesc: cotizacion.porcDesc,
      subtotalDesc: cotizacion.subtotalDesc,
      porcIva: cotizacion.porcIva,
      total: cotizacion.total,
      cliente_id: cotizacion.cliente_id || null,
      empresa_id: 1,
      usuario_id: cotizacion.usuario_id || null,
      proveedor_id: cotizacion.proveedor_id || null,
      fechaValidez: cotizacion.fechaValidez,
      origen:cotizacion.origen || "N/A",
      destino: cotizacion.destino || "N/A",
      condicionFlete: cotizacion.condicionFlete || "N/A",
      modo: cotizacion.modo || "N/A",
      mercaderia: cotizacion.mercaderia || "N/A",
      peso: cotizacion.peso || 0,
      volumen: cotizacion.volumen || 0,
      terminosCondiciones: cotizacion.terminosCondiciones || "N/A",
      tipo: cotizacion.tipo || "N/A",
      lineas: cotizacion.lineas
    };

    console.log("🔹 Cotización a enviar:", cotizacion2);

    const response = await dispatch(postData({ url: "cotizacion", data: cotizacion2 }));

    console.log("✅ Respuesta del servidor:", response);

    if (response.error) {
      throw new Error(response.error.message || "Error desconocido");
    }

    Swal.fire({
      icon: "success",
      title: "Cotización copiada exitosamente.",
      showConfirmButton: false,
      timer: 1500
    });

  
    navigate("/cotizaciones");
  } catch (error) {
    console.error("❌ Error en agregarCotizacion:", error);
    Swal.fire({
      icon: "error",
      title: "Error al copiar la cotización",
      text: error.message
    });
  }
}
  


const handleDetalle = async(cotizacion) => {
  try {
    console.log("⏳ Generando PDF...");
    const doc = <QuotationPdf data={cotizacion} />;

    if (!doc) {
      throw new Error("Error: QuotationPdf no se generó correctamente.");
    }

    const blob = await pdf(doc).toBlob();

    if (!blob) {
      throw new Error("Error: No se pudo generar el Blob del PDF.");
    }

    console.log("✅ PDF generado correctamente.");
    const pdfURL = URL.createObjectURL(blob);
    window.open(pdfURL, "_blank");
  } catch (pdfError) {
    console.error("🚨 Error al generar el PDF:", pdfError);
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
        text: "Una vez eliminado, no podrás recuperar esta cotizacion.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#56C3CE",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (!result.isConfirmed) return;
  
      try {
        const response = await dispatch(deleteData({ url: 'cotizacion', id: cotizacionId }));
        if (response.error) {
          throw new Error();
        }
        Swal.fire({
          title: "Eliminado",
          text: "la Cotizacion ha sido eliminada correctamente.",
          icon: "success",
          confirmButtonColor: "#56C3CE"
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la cotizacion. Intenta nuevamente.", "error");
      }
    };
  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto p-4">
        {/* Filtros y botones */}
        <div className="mb-4 space-y-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => navigate("/CrearCotizacion")}
            >Crear Cotizacion
            </button>
          </div>
        </div>

        {/* Tabla para pantallas más grandes */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">id</th>
                <th className="py-2 px-4 text-left">fecha</th>
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((coti) => (
                <tr
                  key={coti.id}
                  className={`border-b "bg-blue-300" `}
                >
                  <td className="py-2 px-4">{coti.id}</td>
                  <td className="py-2 px-4">{coti.fecha}</td>
                  <td className="py-2 px-4">
                    {clientes.find(cli => cli.id == coti.cliente_id)?.nombre || 'N/A'}
                  </td>
                  <td className="py-2 px-4">
                    {usuarios.find(user => user.userId == coti.usuario_id)?.nombre || 'N/A'}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Detalle"
                      onClick={() => handleDetalle(coti)}
                    >
                      Detalle
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Eliminar"
                      onClick={() => handleDeleteCotizacion(coti.id)}
                    >
                      Eliminar
                    </button>

                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Modificar"
                      onClick={() => navigate("/ModificarCotizacion", { state: coti })}
                    >
                      Modificar
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                      title="Modificar"
                      onClick={() => handleCopiar(coti)}
                    >
                      Copiar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cotizaciones; 