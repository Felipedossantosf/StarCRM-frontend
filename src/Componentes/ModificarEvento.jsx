import React, { useState, useEffect} from "react";
import Select from "react-select"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateData } from "../redux/apiSlice";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaWaze, FaWhatsapp } from "react-icons/fa";

const ModificarEvento = () => {
    
    const location = useLocation();
    const user = location.state
    const [error, setError] = useState("");
    const [Nombre, setNombre] = useState(user.nombre || "");
    const [descripcion, setDescripcion] = useState(user.descrpicion || "");
    const [fecha, setFecha] = useState(user.fecha);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usuarioId = localStorage.getItem("usuarioId");
    
    const { clientes, usuarios, eventos} = useSelector((state) => state.api);
      const listaclientes = clientes.map(cliente => ({
        label: cliente.nombre,
        value: cliente.id,
      }));

      const listaUsurios = usuarios.map(usuario => ({
        label: usuario.username,
        value: usuario.userId,
      }));
      const clientesIdsP = 
      listaclientes.filter(cliente => user.comercialesId.includes(cliente.value))
      const usuariosIdsP = 
      listaUsurios.filter(Usuario => user.usuariosId.includes(Usuario.value))
       const [clientesSeleccionados, setClientesSeleccionados] = useState(clientesIdsP|| []);
       const [usuariosSeleccionados, setUsuariosSeleccionados] = useState(usuariosIdsP || []);
       useEffect(() => {
            dispatch(fetchData('cliente'));
            dispatch(fetchData('usuario'));
            dispatch(fetchData('evento'));
          }, [dispatch])


   const handleModificar = async () => {
     if (!descripcion || !fecha || clientesSeleccionados.length === 0) {
       setError("Por favor completa todos los campos y selecciona al menos un cliente.");
       return;
     }
 
     const clientesIds = clientesSeleccionados.map((cliente) => cliente.value);
     const usuariosIds = usuariosSeleccionados.map((usuario) => usuario.value);

 
      try {

        const eventoData = {
          id: user.id,
          fecha: fecha,
          nombre: Nombre,
          descripcion: descripcion,
          esCarga: user.esCarga,
          usuariosId: usuariosIds,
          comercialesId: clientesIds,
          usuario_id: usuarioId
        }
                
           const response = await dispatch(updateData({ url: 'evento', id: user.id , data: eventoData }));
           if (response.type  = 'updateData/fulfilled') {
             Swal.fire({
               icon: 'success',
               title: 'Evento modificado exitosamente.',
               showConfirmButton: false,
               timer: 1500,
             });
             navigate('/eventos');
           } else {
             setError('Hubo un problema al modificar el evento. Por favor, inténtalo de nuevo.');
           }
         } catch (error) {
           setError('Hubo un error al modificar el evento.');
         }
   };    

    
          return (
            <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
              <div className="flex items-center text-white pt-4 pb-1">
                <button
                  onClick={() => navigate("/eventos")}
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
        
              <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
                <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="Nombre" className="block text-sm font-medium text-white">
                        Nombre
                      </label>
                      <input
                        id="Nombre"
                        name="Nombre"
                        type="text"
                        value={Nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                        placeholder="Nombre de la reunión"
                      />
                    </div>
                    <div>
                      <label htmlFor="descripcion" className="block text-sm font-medium text-white">
                        Descripción
                      </label>
                      <textarea
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                        placeholder="Descripción de la reunión"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="fecha" className="block text-sm font-medium text-white">
                        Fecha
                      </label>
                      <input
                        id="fecha"
                        name="fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="clientes" className="block text-sm font-medium text-white">
                        Selecciona Clientes
                      </label>
                      <Select
                        id="clientes"
                        isMulti
                        options={listaclientes}
                        value={clientesSeleccionados}
                        onChange={setClientesSeleccionados}
                        placeholder="Selecciona uno o más clientes..."
                        className="mt-2"
                        classNamePrefix="select"
                      />
                    </div>
        
                    <div>
                      <label htmlFor="usuarios" className="block text-sm font-medium text-white">
                        Selecciona Usuarios
                      </label>
                      <Select
                        id="usuarios"
                        isMulti
                        options={listaUsurios}
                        value={usuariosSeleccionados}
                        onChange={setUsuariosSeleccionados}
                        placeholder="Selecciona uno o más Usuarios..."
                        className="mt-2"
                        classNamePrefix="select"
                      />
                    </div>
        
                    <button
                      onClick={handleModificar}
                      type="button"
                      className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
                    >
                      Modificar Reunión
                    </button>
        
                    {error && (
                      <div
                        className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <svg
                          className="flex-shrink-0 inline w-4 h-4 me-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                          <span className="font-medium">{error}</span>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </main>
            </div>
          );
        };
        
export default ModificarEvento;