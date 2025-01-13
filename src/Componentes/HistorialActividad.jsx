import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { fetchActividades  } from "../redux/ActividadSlice";
import { fetch} from "../redux/clientesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { use } from "react";

function HistorialActividad() {
  const [activeTab, setActiveTab] = useState("Historial de actividad");
  const { actividades } = useSelector((state) => state.actividad);
  const { assignees } = useSelector((state) => state.cliente);
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchActividades());
  dispatch(fetch('/usuario'));
  console.log(actividades);
} , [dispatch]);




  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container mx-auto p-4">
        
        {/* Tabla para pantallas más grandes */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Usuario</th>
                <th className="py-2 px-4 text-left">Descripcion</th>
                <th className="py-2 px-4 text-left">Fecha Emitida</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((actividad) => (
                <tr key={actividad.id} className="border-b">
                  {assignees.filter((d) => d.userId == actividad.usuario_id).map((d) => (
                    <td className="py-2 px-4">{d.username}</td>
                  ))}
                <td className="py-2 px-4">{actividad.descripcion}</td>
                 
                  <td className="py-2 px-4">{actividad.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </div>
  );
}

export default HistorialActividad;