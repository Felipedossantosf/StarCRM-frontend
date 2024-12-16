import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Header from "./Header";

function DetalleCliente() {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [clientDetail, setClientDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientDetail = async () => {
      try {
        const response = await fetch(
          `https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api/cliente/${clientId}`
        );
        if (response.ok) {
          const data = await response.json();
          setClientDetail(data);
        } else {
          Swal.fire("Error", "No se pudieron obtener los detalles del cliente.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un error al obtener los detalles del cliente.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetail();
  }, [clientId]);

  if (loading) {
    return <div className="text-center py-6">Cargando detalles...</div>;
  }

  if (!clientDetail) {
    navigate("/clientes");
  }

  const handleDeleteClient = async (clientId) => {
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
      const response = await fetch(
        `https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api/cliente/${clientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "Eliminado",
          text: "El cliente ha sido eliminado correctamente.",
          icon: "success",
          confirmButtonColor: "#56C3CE"
        });
        navigate("/clientes");
      } else {
        Swal.fire("Error", "No se pudo eliminar el cliente. Intenta nuevamente.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al intentar eliminar el cliente.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex items-center text-white pt-4 pb-1">
        {/* Left-aligned "Volver" button */}
        <div className="flex-none">
          <button
            onClick={() => navigate("/clientes")}
            className="pl-6 flex hover:text-gray-200 hover:underline"
          >
            <svg
              className="h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <b>Volver</b>
          </button>
        </div>

        {/* Centered title */}
        <div className="flex-grow text-center text-3xl font-semibold flex items-center justify-center space-x-2">
          <h2>{clientDetail.nombre}</h2>
          <svg className="h-3" viewBox="0 0 24 24" fill="none">
            <circle
              fill={`${clientDetail.esInactivo ? "red" : "green"}`}
              cx="12"
              cy="12"
              r="9"
            />
          </svg>
        </div>

        {/* Right-side spacer (optional for symmetry) */}
        <div className="flex-none w-12"></div>
      </div>

      <div className="bg-white my-6 mx-6 1190-screen:mx-20 px-6 1190-screen:px-40 py-10 1190-screen:py-20 rounded flex flex-col 1190-screen:flex-row 1190-screen:space-x-20">
        {/* Buttons Div taking up 1/3 on large screens, full width on smaller screens */}
        <div className="flex flex-col space-y-4 text-white w-full 1190-screen:w-1/3 justify-start items-start order-last 1190-screen:order-first 800-screen:px-60 500-screen:px-20 600-screen:px-40 px-10 1600-screen:px-20 1190-screen:px-0">
          <button className="bg-gray-300 hover:bg-gray-400 p-4 text-sm rounded w-full">Modificar</button>
          <button className="bg-red-800 hover:bg-red-900 p-4 text-sm rounded w-full" onClick={() => handleDeleteClient(clientId)}>Eliminar</button>
          <button className="bg-[#56C3CE] hover:bg-[#59b1ba] p-4 text-sm rounded w-full">Generar cotización</button>
          <button className="bg-[#56C3CE] hover:bg-[#59b1ba] p-4 text-sm rounded w-full">Asignar</button>
        </div>

        {/* Gray Div taking up 2/3 on large screens, full width on smaller screens */}
        <div className="bg-gray-200 p-5 1600-screen:px-40 700-screen:px-20 1190-screen:px-10 920-screen:px-40 rounded flex w-full 1190-screen:w-2/3 mb-10 1190-screen:mb-0 overflow-auto space-x-2">
          <div className="flex-1 space-y-4">
            <p><b>Razón social: </b>{clientDetail.razonSocial != null ? clientDetail.razonSocial : "--"}</p>
            <p><b>RUT: </b>{clientDetail.rut != null ? clientDetail.rut : "--"}</p>
            <p><b>Sitio web: </b>{clientDetail.sitio != null ? clientDetail.sitio : "--"}</p>
            <p><b>Crédito: </b>{clientDetail.credito != null ? clientDetail.credito : "--"}</p>
            <p><b>Zafras: </b>{clientDetail.zafras != null ? clientDetail.zafras : "--"}</p>
            <p><b>Notas: </b>{clientDetail.notas != null ? clientDetail.notas : "--"}</p>
            <p><b>Correo electrónico: </b>{clientDetail.correo != null ? clientDetail.correo : "--"}</p>
          </div>
          {/* Apply flex and justify-end here to push the second block to the right */}
          <div className="flex-1 flex justify-end">
            <div className="space-y-4">
              <p><b>Última carga: </b>{clientDetail.fechaUltCarga != null ? clientDetail.fechaUltCarga : "--"}</p>
              <p><b>Estado: </b>{clientDetail.estado != null ? clientDetail.estado : "--"}</p>
              <p className="flex space-x-2"><b>Teléfono:&nbsp;</b>{clientDetail.telefono != null ? clientDetail.telefono : "--"}
                <button title="WhatsApp" className="text-green-600 hover:text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </button>
              </p>
              <p><b>Dirección: </b>{clientDetail.direccion != null ? clientDetail.direccion : "--"}</p>
              <img className="rounded" src="https://s1.elespanol.com/2024/06/19/elandroidelibre/864174177_244151195_1706x960.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleCliente;
