import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchByAtributo, updateData } from '../redux/apiSlice';
import Header from './otros/Header';

function EditarUsuario() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');
  const nombreUsuario = localStorage.getItem('usuario');

  const [usuario, setUsuario] = useState({
    username: '',
    email: '',
    password: '',
    rol: '',
    nombre: '',
    apellido: '',
    cargo: '',
    contraseñaActual: ''
  });

  // Fetch usuario al montar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await dispatch(fetchByAtributo({ url: 'usuario', atributo: 'username', valor: nombreUsuario }));
        setUsuario(response.payload);
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
      }
    };

    fetchUsuario();
  }, [dispatch, nombreUsuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateData({
        url: 'usuario',
        id: usuario.userId,
        data: usuario
      }));

      if (response.type == 'updateData/fulfilled')
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
      else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire('Error', 'Datos inválidos', 'error');
    }
  };

  if (!usuario) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={usuario.nombre}
                  required
                  disabled
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-white">
                  Apellido
                </label>
                <input
                  id="apellido"
                  type="text"
                  value={usuario.apellido}
                  required
                  disabled
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-white">
                  Nombre de usuario
                </label>
                <input
                  id="nombreUsuario"
                  type="text"
                  value={usuario.username}
                  required
                  disabled
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>

              <div>
                <label htmlFor="rol" className="block text-sm font-medium text-white">
                  Rol
                </label>
                <select
                  id="rol"
                  value={usuario.rol}
                  onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]">
                  <option value="COMUN">Usuario común</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="mail"
                  value={usuario.email}
                  onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-white">
                  Cargo
                </label>
                <input
                  id="cargo"
                  type="text"
                  value={usuario.cargo}
                  placeholder='Ingresar cargo'
                  onChange={(e) => setUsuario({ ...usuario, cargo: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Contraseña actual
                </label>
                <input
                  id="password"
                  type="password"
                  value={usuario.contraseñaActual}
                  onChange={(e) => setUsuario({ ...usuario, contraseñaActual: e.target.value })}
                  placeholder='Ingresar contraseña actual'
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>
              <div>
                <label htmlFor="passwordNueva" className="block text-sm font-medium text-white">
                  Nueva contraseña
                </label>
                <input
                  id="passwordNueva"
                  type="password"
                  placeholder='Ingresar nueva contraseña'
                  onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                />
              </div>

            </div>
            <button
              type="submit"
              className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
            >
              Guardar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditarUsuario;
