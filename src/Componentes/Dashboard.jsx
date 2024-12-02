import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/loginSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const nombre = localStorage.getItem("nombre");
  const apellido = localStorage.getItem("apellido");

  // State for active tab
  const [activeTab, setActiveTab] = useState("Dashboard");

  // State for toggling the hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle tab click to navigate and set the active tab
  const handleTabClick = (tab, route) => {
    setActiveTab(tab);
    navigate(route);  // Navigate to the appropriate route for the tab
    setIsMenuOpen(false);  // Close the menu after selecting a tab
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-[#56C3CE] text-white py-2 px-6 flex justify-between items-center relative">
        <button onClick={() => navigate("/dashboard")} className="focus:outline-none">
          <img
            src="../../img/starfish-logo-white.png"
            alt="Logo"
            className="w-auto h-12 ml-16 lg:ml-0"
          />
        </button>
        <div className="flex items-center space-x-4">
          {/* Name visible on Desktop */}
          <span className="hidden lg:block font-medium">{nombre} {apellido}</span>
          {/* Profile icon now hidden on mobile */}
          <button className="hidden lg:block focus:outline-none">
            <img
              src="../../img/user-icon.png"
              alt="Usuario"
              className="w-auto h-12"
            />
          </button>
          <button className="focus:outline-none">
            <img
              src="../../img/white-bell-icon.png"
              alt="Campana"
              className="w-auto h-8"
            />
          </button>
          {/* Logout Button for Desktop */}
          <button
            onClick={handleLogout}
            className="hidden lg:block px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all duration-300 focus:outline-none"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden fixed top-2 left-4 z-50">
        <button
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Menu (Hamburger for Mobile) */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-500 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`} // Sliding animation
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute left-0 top-0 bg-[#56C3CE] w-64 h-full p-4 flex flex-col justify-between"> {/* Flexbox container with full height */}
          <div className="mt-16 absolute left-0 top-0 w-64 flex flex-col">
          {/* Navigation Links */}
          {[{ name: "Dashboard", route: "/dashboard" },
            { name: "Registrar usuario", route: "/registro" },
            { name: "Asignaciones", route: "/assignments" },
            { name: "Clientes", route: "/clients" },
            { name: "Proveedores", route: "/suppliers" },
            { name: "Eventos", route: "/events" },
            { name: "Historial de actividad", route: "/activity-history" },
            { name: "Cotizaciones", route: "/quotes" }]
            .map(({ name, route }) => (
              <a
                key={name}
                href="#"
                onClick={() => handleTabClick(name, route)} // Navigate to the route and set active tab
                className={`text-white transition-all duration-300 w-full py-3 px-4 ${
                  activeTab === name
                    ? "bg-[#005469] text-white" // Active tab style
                    : "hover:bg-[#005469] hover:text-white" // Inactive tab style
                }`}
              >
                {name}
              </a>
            ))}
            </div>

          {/* Profile and Logout Button (Bottom of Sidebar) */}
          <div className="flex flex-col w-full space-y-2 mt-auto border-t border-white border-opacity-30 pt-3">
            {/* Name inside the sidebar (Visible on Mobile) */}
            <div className="flex items-center space-x-4">
              <img
                src="../../img/user-icon.png"
                alt="Profile"
                className="w-auto h-12"
              />
              <div className="text-white font-medium">
                {nombre} {apellido}
              </div>
            </div>

            {/* Logout Button inside the sidebar */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all duration-300 focus:outline-none"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation (Hidden on Mobile, Centered on Desktop) */}
      <nav className="bg-white text-black hidden lg:flex justify-center items-center space-x-10 px-6 h-14 text-sm">
        {[{ name: "Dashboard", route: "/dashboard" },
          { name: "Registrar usuario", route: "/registro" },
          { name: "Asignaciones", route: "/assignments" },
          { name: "Clientes", route: "/clients" },
          { name: "Proveedores", route: "/suppliers" },
          { name: "Eventos", route: "/events" },
          { name: "Historial de actividad", route: "/activity-history" },
          { name: "Cotizaciones", route: "/quotes" }]
          .map(({ name, route }) => (
            <a
              key={name}
              href="#"
              onClick={() => handleTabClick(name, route)} // Navigate to the route and set active tab
              className={`text-black border-b-4 transition-all duration-300 ${
                activeTab === name
                  ? "border-[#00728F]" // Active tab style
                  : "border-transparent hover:border-[#00728F]" // Inactive tab style
              }`}
            >
              {name}
            </a>
          ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#2B2C2C]">
        <div className="text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">{activeTab}</h2>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
