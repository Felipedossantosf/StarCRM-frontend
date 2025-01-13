import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchNotificacionesById, editarNotificaciones} from "../redux/NotificacionesSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notificaciones() {
    const [activeTab, setActiveTab] = useState("Notificaciones");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notificaciones } = useSelector((state) => state.notificacion);
    const [active, setactive] = useState(false);

    useEffect(() => {
        dispatch(fetchNotificacionesById({ url: '/Notificacion', id: 61 }));
        setactive(false);
    }, [dispatch, active]);

    const handleDeleteProveedor = (n) => {
        console.log(n);
    const data = {  
                id: n.notificacion_usuario_id,
                notificacion_id: n.notificacion_id,
                usuario_id: 61,
                activa: false,
            }
    console.log(data);
        dispatch(editarNotificaciones({ url: '/Notificacion', id: n.notificacion_usuario_id , data: data }));
        setactive(true);
    };
      
    return (
        <div className="min-h-screen flex flex-col bg-[#2B2C2C] mb-4">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="bg-white shadow rounded-md p-4 mt-6"> 
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Notificaciones</h2>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                        <option>Esta semana</option>
                        <option>Hoy</option>
                        <option>Este mes</option>
                    </select>
                </div>
                {notificaciones.filter(n => n.activa).map((notificacion) => (
                    <div
                        key={notificacion.id}
                        className="flex items-start space-x-4 py-3 border-b last:border-b-0"
                    >
                        <FontAwesomeIcon icon={faBell} className="w-10 h-10 text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm mt-1">{notificacion.mensaje}</p>
                            <div className="flex space-x-4 mt-2 text-sm text-blue-500">
                            
                            </div>
                            <button
                            className="text-red-500 hover:text-red-700"
                            title="Eliminar"
                            onClick={() => handleDeleteProveedor(notificacion)}
                            >Eliminar</button>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                            {notificacion.tiempo}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notificaciones;
