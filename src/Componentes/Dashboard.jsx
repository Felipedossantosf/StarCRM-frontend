import React, { useEffect, useState } from "react";
import Header from "./otros/Header";
import MyChart from "./MyChart";
import LineChartExample from "./LineChart";
import PieChartExample from "./pieChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const dispatch = useDispatch();
  const { clientes, usuarios, cotizaciones, asignaciones } = useSelector((state) => state.api);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchData("cliente"));
    dispatch(fetchData("cotizacion"));
    dispatch(fetchData("asignacion"));
    dispatch(fetchData("usuario"));
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ADMIN") {
      navigate("/acceso-denegado")
    }
  }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="text-white text-center pt-4 pb-1">
        <h2 className="text-3xl font-semibold">{activeTab}</h2>

        {/* Botón para actualizar estados */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => { navigate("/actualizarEstados") }}
            className="bg-[#005469] hover:bg-[#00728F] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            🔄 Actualizar clientes inactivos
          </button>
        </div>

        {/* Contenedor responsivo para las gráficas */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-4">
          {/* Gráfico de actividad de clientes */}
          <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Actividad de clientes</h3>
            <MyChart clientes={clientes} />
          </div>

          <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Cantidad de cotizaciones</h3>
            <LineChartExample cotizaciones={cotizaciones} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-4">
          {/* Gráfico de actividad de clientes */}
          <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Actividad de clientes</h3>
            <PieChartExample asignaciones={asignaciones} usuarios={usuarios} clientes={clientes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
