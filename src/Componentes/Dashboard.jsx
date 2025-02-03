import React, { useState } from "react";
import Header from "./otros/Header"
import MyChart from "./MyChart";
import LineChartExample from "./LineChart";
import PieChartExample from "./pieChart";
import AreaChartExample from "./AreaChart";
import ScatterChartExample from "./ScatterChart";


function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="text-white text-center pt-4 pb-1">
        <h2 className="text-3xl font-semibold">{activeTab}</h2>
        Barra <MyChart></MyChart>
        Linea <LineChartExample></LineChartExample>
        PieChartExample <PieChartExample></PieChartExample>
        AreaChartExample <AreaChartExample></AreaChartExample>
        ScatterChartExample <ScatterChartExample></ScatterChartExample>
      </div>
    </div>
  );
}

export default Dashboard;