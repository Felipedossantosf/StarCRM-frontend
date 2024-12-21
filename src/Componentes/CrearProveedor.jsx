import React from 'react'
import { useState } from 'react'
import Header from './Header' // Importa el componente Header
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { agregarProveedor } from '../redux/ProveedoresSlice'
import { useNavigate } from 'react-router-dom'

function CrearProveedor() {
const [nombre1, setNombre1] = useState('')
const [telefono1, setTelefono1] = useState('')
const [correo1, setCorreo1] = useState('');
const [credito1, setCredito1] = useState('');
const [razonSocial1, setrazonSocial1] = useState('');
const [rut1, setRut1] = useState('');
const [direccion1, setrazonDireccion] = useState('');
const [sitioWeb1, setSitioWeb] = useState('');
const [tipoComercial1, setTipoComercial] = useState('');
const [paises1, setPaises1] = useState('');
const [tipoMercaderia1, setTipoMercaderia1] = useState('');
const [error, setError] = useState(null);
const [activeTab, setActiveTab] = useState('Proveedores');
const dispatch = useDispatch();
const navigate = useNavigate();

const handleCrear = async () => {
    try {
        const response = await axios.post('https://starcrm-backenddev-hme7aae8g4f2b6g6.centralus-01.azurewebsites.net/api/Proveedor', {
          id: 0,
          nombre: nombre1,
          telefono: telefono1,
          correo: correo1,
          credito: credito1,
          razonSocial: razonSocial1,
          rut: rut1,
          direccion: direccion1,
          sitioWeb: sitioWeb1,
          tipoComercial: "Proveedor",
          paises: paises1,
          tipoMercaderia: tipoMercaderia1
        });
       console.log(response)
        if (response.status == 201) {
            agregarProveedor(dispatch, response.data);
          Swal.fire({
            icon: 'success',
            title: 'Proveedor creado',
            showConfirmButton: false,
            timer: 1500
          });
            // Limpiar los inputs
            navigate('/proveedores');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear proveedor',
            text: 'Hubo un problema al crear el proveedor. Por favor, inténtalo de nuevo.',
            showConfirmButton: true
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya existe un usuario con ese nombre',
          showConfirmButton: true
        });
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
                  Telefono
                </label>
                <input
                  id="telefono1"
                  name="telefono"
                  type="text"
                  value={telefono1}
                  onChange={(e) => setTelefono1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Telefono"
                />
              </div>
            </div>

            {/* Username and Password */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Correo
                </label>
                <input
                  id="Correo1"
                  name="Correo"
                  type="text"
                  value={correo1}
                  onChange={(e) => setCorreo1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Correo"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                credito
                </label>
                <input
                  id="credito1"
                  name="credito"
                  type="text"
                  value={credito1}
                  onChange={(e) => setCredito1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="credito"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                razonSocial
                </label>
                <input
                    id="razonSocial1"
                    name="razonSocial"
                    type="text"
                    value={razonSocial1}
                    onChange={(e) => setrazonSocial1(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                    placeholder="razonSocial"
                />
                </div>

                <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-white">
                rut
                </label>
                <input
                  id="rut"
                  name="rut"
                  type="text"
                  value={rut1}
                  onChange={(e) => setRut1(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="rut"
                />
              </div>
            </div>
       
            <div className="grid gap-1 grid-cols-2">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                direccion
                </label>
                <input
                    id="direccion1"
                    name="direccion"
                    type="text"
                    value={direccion1}
                    onChange={(e) => setrazonDireccion(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                    placeholder="direccion"
                />
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                sitioWeb
                </label>
                <input
                    id="sitioWeb1"
                    name="sitioWeb"
                    type="text"
                    value={sitioWeb1}
                    onChange={(e) => setSitioWeb(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                    placeholder="sitioWeb"
                />
                </div>
            </div>
           
            <div className="grid gap-1 grid-cols-2">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                tipoMercaderia
                </label>
                <input
                    id="tipoMercaderia1"
                    name="tipoMercaderia"
                    type="text"
                    value={tipoMercaderia1}
                    onChange={(e) => setTipoMercaderia1(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                    placeholder="tipoMercaderia"
                />
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                paises
                </label>
                <input
                    id="paises1"
                    name="paises"
                    type="text"
                    value={paises1}
                    onChange={(e) => setPaises1(e.target.value)}
                    required
                    className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                    placeholder="paises"
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
              <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">{error}</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default CrearProveedor