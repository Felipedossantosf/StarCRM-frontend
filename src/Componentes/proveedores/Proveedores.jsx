import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "../otros/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../../redux/apiSlice";
import { useNavigate } from 'react-router-dom';

function Proveedores() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { proveedores } = useSelector((state) => state.api);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Proveedores");
  const usuario_id = parseInt(localStorage.getItem('usuarioId'));


  useEffect(() => {
    dispatch(fetchData('/proveedor'));
  }, [dispatch]);

  const handleDeleteProveedor = async (provId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este proveedor.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#56C3CE",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await dispatch(deleteData({ url: '/proveedor', id: provId, data: usuario_id }));
      if (response.type == 'deleteData/fulfilled') {
        await Swal.fire({
          title: "Eliminado",
          text: "El proveedor ha sido eliminado correctamente.",
          icon: "success",
          confirmButtonColor: "#56C3CE"
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el proveedor. Intenta nuevamente.", "error");
    }
  };

  const filteredProveedores = proveedores.filter((prov) =>
    !search || prov.nombre.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-wrap justify-between px-6 pt-6 space-y-4 md:space-y-0 md:flex-row">
        <div className="flex flex-wrap sm:space-x-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </div>
        <button
          className="px-4 py-2 rounded bg-[#56C3CE] hover:bg-[#59b1ba] text-white transition-all"
          onClick={() => navigate("/proveedores/crear")}
        >
          <div className="flex space-x-1">
            <p>Nuevo</p>
            <svg className="h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
        </button>
      </div>

      <div className="flex-grow px-6 py-4">
        <div className="bg-white p-1 rounded">
          {filteredProveedores.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No hay proveedores para mostrar.</div>
          ) : (
            <div>
              {/* Para pantallas grandes: Tabla */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full truncate">
                  <tbody>
                    {filteredProveedores.map((prov, index) => (
                      <tr key={prov.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="px-4 py-2 border-b border-gray-300">
                          <Link to={`/proveedores/${prov.id}`} className="flex font-bold hover:underline">
                            {prov.nombre}
                          </Link>
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 flex justify-end space-x-2">
                          <a target="blank" href={`https://wa.me/${prov.telefono}`} className="text-green-600 hover:text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                          </a>
                          <button className="text-black hover:text-gray-600" title="Editar" onClick={() => navigate(`/proveedores/editar/${prov.id}`)}>
                            <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700" title="Eliminar" onClick={() => handleDeleteProveedor(prov.id)}>
                            <svg className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
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
                {filteredProveedores.map((prov) => (
                  <div key={prov.id} className="bg-gray-100 p-4 rounded shadow-md">
                    <div className="flex justify-between items-center">
                      <Link to={`/proveedores/${prov.id}`} className="font-bold text-lg hover:underline">{prov.nombre}</Link>
                      <button onClick={() => navigate(`/proveedores/editar/${prov.id}`)} className="text-black hover:text-gray-600">
                        ✏️
                      </button>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <a target="blank" href={`https://wa.me/${prov.telefono}`} className="text-green-600 hover:text-green-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg></a>
                      <button onClick={() => handleDeleteProveedor(prov.id)} className="text-red-500 hover:text-red-700">❌ Eliminar</button>
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

export default Proveedores;