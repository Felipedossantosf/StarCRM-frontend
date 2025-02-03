import React, { useState } from 'react';
import Header from '../otros/Header';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../redux/apiSlice';

function CrearCliente() {
  const [nombre1, setNombre1] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [correo1, setCorreo1] = useState('');
  const [credito1, setCredito1] = useState('');
  const [razonSocial1, setRazonSocial1] = useState('');
  const [rut1, setRut1] = useState('');
  const [direccion1, setDireccion] = useState('');
  const [sitioWeb1, setSitioWeb] = useState('');
  const [zafras, setZafras] = useState('');
  const [notas, setNotas] = useState('');

  const [activeTab, setActiveTab] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCrear = async () => {
    if (!nombre1 || !telefono1 || !correo1) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    try {
      const clienteData = {
        nombre: nombre1,
        telefono: telefono1,
        correo: correo1,
        credito: credito1,
        razonSocial: razonSocial1,
        rut: rut1,
        direccion: direccion1,
        sitioWeb: sitioWeb1,
        tipoComercial: 'Cliente',
        zafras: zafras,
        notas: notas,
        esInactivo: true,
        fechaUltCarga: null,
        estado: 'Libre'
      };

      const response = await dispatch(postData({ url: 'cliente', data: clienteData }));
      if (response?.payload?.id) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente creado exitosamente.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/clientes');
      } else {
        setError('Hubo un problema al crear el cliente. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Hubo un error al crear el cliente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex items-center text-white pt-4 pb-1">
        <div className="flex-none">
          <button
            onClick={() => navigate("/clientes")}
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
            {/* Name and Last Name */}
            <div className="grid gap-1 grid-cols-2">
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
                <label htmlFor="telefono1" className="block text-sm font-medium text-white">
                  Teléfono
                </label>
                <input
                  id="telefono1"
                  name="telefono"
                  type="number"
                  value={telefono1}
                  onChange={(e) => setTelefono1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Teléfono"
                />
              </div>
            </div>

            {/* Correo and Crédito */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="correo1" className="block text-sm font-medium text-white">
                  Correo
                </label>
                <input
                  id="correo1"
                  name="correo"
                  type="text"
                  value={correo1}
                  onChange={(e) => setCorreo1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Correo"
                />
              </div>

              <div>
                <label htmlFor="credito1" className="block text-sm font-medium text-white">
                  Crédito
                </label>
                <input
                  id="credito1"
                  name="credito"
                  type="text"
                  value={credito1}
                  onChange={(e) => setCredito1(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Crédito"
                />
              </div>
            </div>

            {/* Razon Social, RUT, Dirección, and Sitio Web */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="razonSocial1" className="block text-sm font-medium text-white">
                  Razón Social
                </label>
                <input
                  id="razonSocial1"
                  name="razonSocial"
                  type="text"
                  value={razonSocial1}
                  onChange={(e) => setRazonSocial1(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Razón Social"
                />
              </div>

              <div>
                <label htmlFor="rut1" className="block text-sm font-medium text-white">
                  RUT
                </label>
                <input
                  id="rut1"
                  name="rut"
                  type="text"
                  value={rut1}
                  onChange={(e) => setRut1(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="RUT"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="direccion1" className="block text-sm font-medium text-white">
                  Dirección
                </label>
                <input
                  id="direccion1"
                  name="direccion"
                  type="text"
                  value={direccion1}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Dirección"
                />
              </div>

              <div>
                <label htmlFor="sitioWeb1" className="block text-sm font-medium text-white">
                  Sitio web
                </label>
                <input
                  id="sitioWeb1"
                  name="sitioWeb"
                  type="text"
                  value={sitioWeb1}
                  onChange={(e) => setSitioWeb(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Sitio web"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="zafras" className="block text-sm font-medium text-white">
                  Zafras
                </label>
                <input
                  id="zafras"
                  name="zafras"
                  type="text"
                  value={zafras}
                  onChange={(e) => setZafras(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Zafras"
                />
              </div>

              <div>
                <label htmlFor="notas" className="block text-sm font-medium text-white">
                  Notas
                </label>
                <input  
                  id="notas"
                  name="notas"
                  type="text"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Notas"
                />
              </div>
            </div>

            {/* Submit Button */}
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

export default CrearCliente;
