import React, { useState } from 'react';
import Header from '../otros/Header';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../redux/apiSlice';

function CrearProveedor() {
  const usuario_id = localStorage.getItem('usuarioId');
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    credito: '',
    razonSocial: '',
    rut: '',
    direccion: '',
    sitioWeb: '',
    usuario_id: usuario_id
  });

  const [activeTab, setActiveTab] = useState('');
  const [error, setError] = useState(null);
  


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCrear = async () => {
    const { nombre, telefono, correo } = formData;
    if (!nombre || !telefono || !correo) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    try {
      const response = await dispatch(postData({ url: 'proveedor', data: { ...formData, tipoComercial: 'Proveedor' } }));
      
      if (response?.payload?.id) {
        Swal.fire({
          icon: 'success',
          title: 'Proveedor creado exitosamente.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/proveedores');
      } else {
        const errorMessage = response?.payload?.message || 'Hubo un problema al crear el proveedor. Inténtalo de nuevo.';
        setError(errorMessage);
      }
    } catch (error) {
      const apiError = error?.response?.data?.message || error.message || 'Hubo un error inesperado al crear el proveedor.';
      setError(apiError);
    }
};


  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex items-center text-white pt-4 pb-1">
        <div className="flex-none">
          <button
            onClick={() => navigate("/proveedores")}
            className="pl-6 flex hover:text-gray-200 hover:underline"
          >
            <svg
              className="h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <b>Volver</b>
          </button>
        </div>
      </div>

      <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  type="text"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Nombre"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-white">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="number"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-white">
                  Correo
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="text"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Correo"
                />
              </div>

              <div>
                <label htmlFor="credito" className="block text-sm font-medium text-white">
                  Crédito
                </label>
                <input
                  id="credito"
                  name="credito"
                  type="text"
                  value={formData.credito}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Crédito"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="razonSocial" className="block text-sm font-medium text-white">
                  Razón Social
                </label>
                <input
                  id="razonSocial"
                  name="razonSocial"
                  type="text"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Razón Social"
                />
              </div>

              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-white">
                  RUT
                </label>
                <input
                  id="rut"
                  name="rut"
                  type="text"
                  value={formData.rut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="RUT"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-white">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Dirección"
                />
              </div>

              <div>
                <label htmlFor="sitioWeb" className="block text-sm font-medium text-white">
                  Sitio web
                </label>
                <input
                  id="sitioWeb"
                  name="sitioWeb"
                  type="text"
                  value={formData.sitioWeb}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Sitio web"
                />
              </div>
            </div>

            <button
              onClick={handleCrear}
              type="button"
              className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
            >
              Crear
            </button>

            {error && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Error</span>
                <div>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CrearProveedor;