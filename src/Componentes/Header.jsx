import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/loginSlice";

const Header = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nombre = localStorage.getItem("nombre");
  const apellido = localStorage.getItem("apellido");

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

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header bar */}
      <header className="bg-[#56C3CE] text-white py-2 px-6 flex justify-between items-center relative">
        <button onClick={() => navigate("/dashboard")} className="focus:outline-none">
          <img
            src="../../img/starfish-logo-white.png"
            alt="Logo"
            className="w-auto h-12 ml-16 lg:ml-0"
          />
        </button>
        <div className="flex items-center lg:space-x-4 relative">
          <button className="focus:outline-none">
            <img
              src="../../img/white-bell-icon.png"
              alt="Campana"
              className="w-auto h-8"
            />
          </button>
          <span className="hidden lg:block font-medium">{nombre} {apellido}</span>
          {/* Dropdown toggle */}
          <button
            className="focus:outline-none relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
          
            <img
              src="../../img/user-icon.png"
              alt="Usuario"
              className="hidden lg:block w-auto h-12"
            />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="hidden lg:block absolute right-0 mt-6 w-48 bg-white text-black rounded shadow-lg z-50"
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hamburger icon for mobile */}
      <div className="lg:hidden fixed top-2 left-4 z-50">
        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

      {/* Sidebar menu for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-500 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute left-0 top-0 bg-[#56C3CE] w-64 h-full flex flex-col justify-between">
          <div className="mt-16 flex flex-col">
            {menuItems.map(({ name, route }) => (
              <a
                key={name}
                href="#"
                onClick={() => handleTabClick(name, route)}
                className={`text-white transition-all duration-300 w-full py-3 px-4 ${activeTab === name ? "bg-[#005469] text-white" : "hover:bg-[#005469] hover:text-white"}`}
              >
                {name}
              </a>
            ))}
          </div>
          <div className="flex flex-col w-full p-4 space-y-2 mt-auto border-t border-white border-opacity-30">
            <div className="flex items-center space-x-4">
              <img
                src="../../img/user-icon.png"
                alt="Profile"
                className="w-auto h-12"
              />
              <div className="text-white font-medium">{nombre} {apellido}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded bg-[#005469] hover:bg-[#00728F] text-white transition-all duration-300 focus:outline-none"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation (desktop) */}
      <nav className="bg-white text-black hidden lg:flex justify-center items-center space-x-10 px-6 h-14 text-sm">
        {menuItems.map(({ name, route }) => (
          <a
            key={name}
            href="#"
            onClick={() => handleTabClick(name, route)}
            className={`text-black border-b-4 transition-all duration-300 ${activeTab === name ? "border-[#00728F]" : "border-transparent hover:border-[#00728F]"}`}
          >
            {name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Header;
