import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchClienteById, editarCliente } from '../redux/ClientesSlice';
import Header from './Header';

function ModificarCliente() {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');

  const clienteDetail = useSelector((state) => state.cliente.clienteDetail);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    credito: '',
    razonSocial: '',
    rut: '',
    direccion: '',
    sitioWeb: '',
    tipoComercial: 'Cliente',
    zafras: '',
    notas: '',
    esInactivo: true,
    fechaUltCarga: null,
    estado: 'Libre'
  });

  useEffect(() => {
    if (!clienteDetail || clienteDetail.id !== parseInt(clienteId)) {
      dispatch(fetchClienteById({ url: 'cliente/', id: clienteId }));
    } else {
      setCliente(clienteDetail);
    }
  }, [dispatch, clienteId, clienteDetail]);

  useEffect(() => {
    if (clienteDetail && clienteDetail.id === parseInt(clienteId)) {
      setCliente(clienteDetail);
    }
  }, [clienteDetail, clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editarCliente({ url: '/cliente', id: clienteId, data: cliente }));
      Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
      navigate(`/clientes/${clienteId}`);
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al actualizar el cliente', 'error');
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

        <div className="flex-grow text-center text-3xl font-semibold flex items-center justify-center space-x-2">
          <h2>{cliente.nombre}</h2>
        </div>

        <div className="flex-none w-20"></div>
      </div>

      <main className="flex justify-center flex-grow items-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white bg-opacity-5 w-full max-w-lg p-10 space-y-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="nombre1" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={cliente.nombre}
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
                  value={cliente.telefono}
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
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={cliente.correo}
                  onChange={handleChange}
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
                  name="razonSocial"
                  type="text"
                  value={cliente.razonSocial}
                  onChange={handleChange}
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
                  name="rut"
                  type="text"
                  value={cliente.rut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="RUT"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-white">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  value={cliente.direccion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Dirección"
                />
              </div>
            </div>

            <div className="grid gap-1 grid-cols-2">
              <div>
                <label htmlFor="sitioWeb" className="block text-sm font-medium text-white">
                  Sitio web
                </label>
                <input
                  id="sitioWeb"
                  name="sitioWeb"
                  type="text"
                  value={cliente.sitioWeb}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Sitio web"
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
                  value={cliente.credito}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Crédito"
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
                  value={cliente.zafras}
                  onChange={handleChange}
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
                  value={cliente.notas}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"
                  placeholder="Notas"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-[#005469] hover:bg-[#00728F] text-white duration-300"
            >
              Actualizar Cliente
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ModificarCliente;