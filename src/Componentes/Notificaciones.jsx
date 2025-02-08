import React, { useEffect, useState } from "react";
import Header from "./otros/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchById, updateData } from "../redux/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useActionData } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Notificaciones() {
    const [activeTab, setActiveTab] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");
    const usuarioId = localStorage.getItem("usuarioId");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredNotificaciones, setFilteredNotificaciones] = useState([]);

    // Fetch de datos al montar el componente y filtrar notificaciones
    useEffect(() => {
        dispatch(fetchById({ url: 'notificacion', id: usuarioId }));
    }, [dispatch, usuarioId]);

    const { notificaciones } = useSelector((state) => state.api);

    useEffect(() => {
        if (Array.isArray(notificaciones)) {
            const filtered = notificaciones.filter((n) => {
                if (!n.activa) return false;
                const notificacionFecha = new Date(n.fecha).toISOString().split("T")[0];
                if (filtroFecha && filtroFecha !== notificacionFecha) return false;
                return true;
            });
            setFilteredNotificaciones(filtered);
        }
    }, [notificaciones, filtroFecha]);
  

    // Manejar eliminación de notificación
    const handleDeleteNotif = async (n) => {
        try {
            const updatedNotificacion = { 
                id: 0,
                notificacion_id: n.notificacion_id,
                usuario_id: usuarioId,
                activa: false
            };
    
            await dispatch(updateData({ url: 'notificacion', id: n.notificacion_usuario_id, data: updatedNotificacion }));
    
            Swal.fire({
                title: "Notificación Eliminada",
                text: "La notificación fue eliminada correctamente.",
                icon: "success",
                confirmButtonColor: "#56C3CE"
            });
    
            // 🔄 Refrescar lista de notificaciones
            await dispatch(fetchById({ url: 'notificacion', id: usuarioId }));
    
            // 💡 Forzar actualización de `filteredNotificaciones`
            setFilteredNotificaciones(prev => prev.filter(notif => notif.notificacion_id !== n.notificacion_id));
    
        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar la notificación", "error");
        }
    };
    

    // Limpiar filtros
    const clearFilters = () => {
        setFiltroFecha("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#2B2C2C] mb-4">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Barra de búsqueda y filtros */}
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
                    <button
                        className="px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all"
                        onClick={clearFilters}
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <div className="flex-grow px-6 py-4">
                <div className="bg-white p-1 rounded">
                    <div className="overflow-x-auto">
                        {filteredNotificaciones.length === 0 ? (
                            <div className="text-center text-gray-500 py-6">
                                No hay notificaciones para mostrar.
                            </div>
                        ) : (
                            <table className="table-auto w-full truncate">
                                <tbody>
                                    {filteredNotificaciones.map((notificacion, index) => (
                                        <tr key={notificacion.notificacion_id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                            <td className="px-4 py-2 border-b border-gray-300"><FontAwesomeIcon icon={faBell} className="w-8 h-8 text-gray-500" /></td>
                                            <td className="px-4 py-2 border-b border-gray-300">{notificacion.mensaje}</td>
                                            <td className="px-4 py-2 border-b border-gray-300">
                                                {new Date(notificacion.fecha).toISOString().split("T")[0]}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-300">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Eliminar"
                                                    onClick={() => handleDeleteNotif(notificacion)}
                                                >
                                                    Eliminar
                                                </button>
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

export default Notificaciones;
