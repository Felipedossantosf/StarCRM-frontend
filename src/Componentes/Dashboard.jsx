import React, { useEffect, useState } from "react";
import Header from "./otros/Header"
import MyChart from "./MyChart";
import LineChartExample from "./LineChart";
import PieChartExample from "./pieChart";
import AreaChartExample from "./AreaChart";
import ScatterChartExample from "./ScatterChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/apiSlice";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const dispatch = useDispatch();
  const {clientes, cotizaciones} = useSelector((state) => state.api);

useEffect(() => { 
  dispatch(fetchData('cliente'));
  dispatch(fetchData('cotizacion'));

  
}, [dispatch]);

console.log(cotizaciones)

return (
  <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
    <Header activeTab={activeTab} setActiveTab={setActiveTab} />
    <div className="text-white text-center pt-4 pb-1">
      <h2 className="text-3xl font-semibold">{activeTab}</h2>

      {/* Contenedor responsivo para las gráficas */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-4">
        {/* Gráfico de actividad de clientes */}
        <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">Actividad de Clientes</h3>
          <MyChart clientes={clientes} />
        </div>

        {/* Gráfico de cantidad de cotizaciones */}
        <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">Cantidad de Cotizaciones</h3>
          <LineChartExample cotizaciones={cotizaciones} />
        </div>
      </div>
    </div>
  </div>
);

}

export default Dashboard;