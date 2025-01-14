import React, { useState } from "react";
import Header from "./otros/Header";

function Cotizaciones() {
  const [activeTab, setActiveTab] = useState("Cotizaciones");

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="text-white text-center pt-4 pb-1">
        <h2 className="text-3xl font-semibold">{activeTab}</h2>
      </div>
    </div>
  );
}

export default Cotizaciones; 