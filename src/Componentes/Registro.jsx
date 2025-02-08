import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { postData, resetError, fetchData } from "../redux/apiSlice";
import { useNavigate } from 'react-router-dom';
import Header from "./otros/Header";
import Swal from "sweetalert2";

function Registro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usuarios } = useSelector((state) => state.api);
  const usuarioId = localStorage.getItem("usuarioId");

  useEffect(() => {
    dispatch(fetchData('usuario'));
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ADMIN") {
      navigate("/acceso-denegado")
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("Registrar usuario");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [errorCamposVacios, setErrorCamposVacios] = useState("");
  const contraseñaActual = "";

  const camposCompletos = username && email && password && rol && nombre && apellido && cargo;

  // Generar username dinámicamente
  const generarUsername = async (nombre, apellido) => {
    if (!nombre || !apellido) return "";

    // Generar la base del nombre de usuario
    const inicial = lower(nombre.charAt(0));
    const apellidoLower = lower(apellido);
    const baseUsername = `${inicial}${apellidoLower}`;

    try {
      let contador = 0;

      for (let i = 0; i < usuarios.length; i++) {
        const user = usuarios[i];
        if (lower(user.nombre) == lower(nombre) && lower(user.apellido) == apellidoLower)
          contador++;
      }
      // Si ya existen registros con ese nombre base, incrementar el número
      return contador > 0 ? `${baseUsername}${contador + 1}` : baseUsername + '1';

    } catch (error) {
      return baseUsername;
    }
  };

  function lower(texto) {
    return texto.toLowerCase();
  }

  // useEffect para actualizar el username cuando cambien nombre o apellido
  useEffect(() => {
    const actualizarUsername = async () => {
      const nuevoUsername = await generarUsername(nombre, apellido);
      setUsername(nuevoUsername);
    };

    if (nombre || apellido) {
      actualizarUsername();
    }
  }, [nombre, apellido]);
 
  const handleRegistro = async () => {
    if (camposCompletos) {

    const data = {
      
        userId: 0,
        username: username,
        email: email,
        password: password,
        rol: rol,
        nombre: nombre,
        apellido: apellido,
        cargo: cargo,
        contraseñaActual: contraseñaActual,
        usuario_id: usuarioId
      }
    
      const resultAction = await dispatch(
        postData({ url: 'usuario', data: data })
      );
      if (resultAction.type === 'postData/fulfilled') {
        Swal.fire({
          title: "Registrado",
          text: "Usuario registrado correctamente",
          icon: "success",
          confirmButtonColor: "#56C3CE"
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setRol("");
        setNombre("");
        setApellido("");
        setCargo("");
        setErrorCamposVacios("");
      }
    } else {
      setErrorCamposVacios("Completar todos los campos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
          <form className="space-y-6 mt-10 mb-10">
            {/* Name and Last Name */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={nombre}
                  type="text"
                  onChange={(e) => setNombre(e.target.value)}
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
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Apellido"
                />
              </div>
            </div>

            {/* Username and Password */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  required
                  disabled
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                placeholder="Email"
              />
            </div>

            {/* Role and Job Title */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white">
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="w-full px-3 py-2 mt-1 h-10 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
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
                  className="w-full px-3 py-2 mt-1 mb-10 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
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

            {/* Error Message */}
            {errorCamposVacios && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Completar todos los campos</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Registro;
