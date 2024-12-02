import React, { useState } from "react";
import { registroUser } from "../redux/RegistroSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Header from "./Header";

function Registro() {
  const [username1, setUsername1] = useState("");
  const [otro, setOtro] = useState("");
  const [password1, setPassword1] = useState("");
  const [rol1, setRol1] = useState("");
  const [nombre1, setNombre1] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [cargo, setCargo] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistro = async () => {
    await dispatch(
      registroUser({ username1, otro, password1, rol1, nombre1, apellido1, cargo })
    );

    // Clear form
    setUsername1("");
    setOtro("");
    setPassword1("");
    setRol1("");
    setNombre1("");
    setApellido1("");
    setCargo("");
  };

  const handleTabClick = (tab, route) => {
    navigate(route);
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
    <div className="flex flex-col min-h-screen bg-[#2B2C2C]">
      {/* Header */}
      <Header
        nombre={localStorage.getItem("nombre")}
        apellido={localStorage.getItem("apellido")}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleTabClick={handleTabClick}
        activeTab="Registrar usuario"
        menuItems={menuItems}
      />

      {/* Form Section */}
      <main className="flex flex-1 justify-center items-center p-6">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-8 space-y-8 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <img
              src="../../img/starfish-logo_Mesa-de-trabajo-1.svg"
              alt="Logo"
              className="w-60 h-22"
            />
          </div>

          <form className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={nombre1}
                  type="text"
                  onChange={(e) => setNombre1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Nombre"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={apellido1}
                  onChange={(e) => setApellido1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Apellido"
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username1}
                  onChange={(e) => setUsername1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Nombre de usuario"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={otro}
                onChange={(e) => setOtro(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                placeholder="Email"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white">
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={rol1}
                  onChange={(e) => setRol1(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                >
                  <option value="">Selecciona un rol</option>
                  <option value="COMUN">Común</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-white">
                  Cargo
                </label>
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Cargo"
                />
              </div>
            </div>

            <button
              onClick={handleRegistro}
              type="button"
              className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
            >
              Registrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Registro;