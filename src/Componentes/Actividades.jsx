import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Actividades() {

    const [activeTab, setActiveTab] = useState("Actividades");
    const navigate = useNavigate();
    const { actividades } = useSelector((state) => state.actividad);
    const { assignees } = useSelector((state) => state.cliente);

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
                  {assignees.filter((d) => d.userId == asignacion.comun_id).map((d) => (
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
    )
}

export default Actividades;