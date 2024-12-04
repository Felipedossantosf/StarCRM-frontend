import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registroUser } from "../redux/RegistroSlice";
import Header from "./Header";

function Registro() {
  const [activeTab, setActiveTab] = useState("Registrar usuario");

  const [username1, setUsername1] = useState("");
  const [otro, setOtro] = useState("");
  const [password1, setPassword1] = useState("");
  const [rol1, setRol1] = useState("");
  const [nombre1, setNombre1] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [cargo, setCargo] = useState("");

  const dispatch = useDispatch();

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

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="text-white text-center p-4">
        <h2 className="text-3xl font-semibold">{activeTab}</h2>
      </div>
      <main className="flex-1 flex justify-center items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-8 space-y-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            {/* Name and Last Name */}
            <div className="grid gap-4 sm:grid-cols-2">
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

            {/* Username and Password */}
            <div className="grid gap-4 sm:grid-cols-2">
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

            {/* Email */}
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

            {/* Role and Job Title */}
            <div className="grid gap-4 sm:grid-cols-2">
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

            {/* Submit Button */}
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
