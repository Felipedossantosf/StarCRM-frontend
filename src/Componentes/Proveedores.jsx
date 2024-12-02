import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";

function Proveedores() {
  const navigate = useNavigate();
  const nombre = localStorage.getItem("nombre");
  const apellido = localStorage.getItem("apellido");

  const [activeTab, setActiveTab] = useState("Proveedores");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab, route) => {
    setActiveTab(tab);
    navigate(route);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Registrar usuario", route: "/registro" },
    { name: "Asignaciones", route: "/asignaciones" },
    { name: "Clientes", route: "/clientes" },
    { name: "Proveedores", route: "/proveedores" },
    { name: "Eventos", route: "/eventos" },
    { name: "Historial de actividad", route: "/historialActividad" },
    { name: "Cotizaciones", route: "/cotizaciones" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header
        nombre={nombre}
        apellido={apellido}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        menuItems={menuItems}
      />
      <main className="flex-1 p-6 bg-[#2B2C2C]">
        <div className="text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">{activeTab}</h2>
        </div>
      </main>
    </div>
  );
}

export default Proveedores;
