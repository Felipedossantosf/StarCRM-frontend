import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchById, updateData } from '../../redux/apiSlice';
import Header from '../otros/Header';

function ModificarProveedor() {
  const { proveedorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');

  // Dispatch action to fetch data by ID
  useEffect(() => {
    dispatch(fetchById({ url: 'proveedor', id: proveedorId }));
  }, [dispatch, proveedorId]);

  // Access the proveedor data from the Redux store
  const proveedorDetail = useSelector((state) => state.api.proveedorDetail);

  // Initialize the form state with default values
  const [proveedor, setProveedor] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    sitioWeb: '',
    direccion: '',
    credito: '',
    razonSocial: '',
    rut: ''
  });

  // Update the form state once the proveedorDetail is fetched
  useEffect(() => {
    if (proveedorDetail) {
      setProveedor(proveedorDetail);
    }
  }, [proveedorDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the update action
      await dispatch(updateData({ url: 'proveedor', id: proveedorId, data: proveedor }));
      Swal.fire('Éxito', 'Proveedor actualizado correctamente', 'success');
      navigate(`/proveedores/${proveedorId}`);
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al actualizar el proveedor', 'error');
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

        <div className="flex-grow text-center text-3xl font-semibold flex items-center justify-center space-x-2">
          <h2>{proveedor.nombre}</h2>
        </div>

        <div className="flex-none w-20"></div>
      </div>

      <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={proveedor.nombre}
                  onChange={(e) => setProveedor({ ...proveedor, nombre: e.target.value })}
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
                  type="number"
                  value={proveedor.telefono}
                  onChange={(e) => setProveedor({ ...proveedor, telefono: e.target.value })}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-white">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  type="email"
                  value={proveedor.correo}
                  onChange={(e) => setProveedor({ ...proveedor, correo: e.target.value })}
                  required
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Correo electrónico"
                />
              </div>

              <div>
                <label htmlFor="razonSocial" className="block text-sm font-medium text-white">
                  Razón social
                </label>
                <input
                  id="razonSocial"
                  type="text"
                  value={proveedor.razonSocial}
                  onChange={(e) => setProveedor({ ...proveedor, razonSocial: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Razón social"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-white">
                  RUT
                </label>
                <input
                  id="rut"
                  type="text"
                  value={proveedor.rut}
                  onChange={(e) => setProveedor({ ...proveedor, rut: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="RUT"
                />
              </div>

              <div>
                <label htmlFor="sitioWeb" className="block text-sm font-medium text-white">
                  Sitio web
                </label>
                <input
                  id="sitioWeb"
                  type="text"
                  value={proveedor.sitioWeb}
                  onChange={(e) => setProveedor({ ...proveedor, sitioWeb: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Sitio web"
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
                  type="text"
                  value={proveedor.direccion}
                  onChange={(e) => setProveedor({ ...proveedor, direccion: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Dirección"
                />
              </div>

              <div>
                <label htmlFor="credito" className="block text-sm font-medium text-white">
                  Crédito
                </label>
                <input
                  id="credito"
                  type="text"
                  value={proveedor.credito}
                  onChange={(e) => setProveedor({ ...proveedor, credito: e.target.value })}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Crédito"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
            >
              Actualizar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ModificarProveedor;
