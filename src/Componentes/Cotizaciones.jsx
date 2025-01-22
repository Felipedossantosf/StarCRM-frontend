import React, { useState } from "react";
import Header from "./otros/Header";


function Cotizaciones() {
  const [activeTab, setActiveTab] = useState("Cotizaciones");
  const [clientesSeleccionados, setClientesSeleccionados] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }])
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2C2C]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full max-w-6xl mx-auto border rounded-lg shadow-lg p-8 mt-10 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Cotizacion</h2>
      </div>
      <div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="col-span-2">
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Número de Cotizacion</label>
              <input id="invoiceNumber" placeholder="Ej: FAC-001" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Proveedor</label>
              <input id="provider" placeholder="Nombre del proveedor" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendedor</label>
              <input id="vendor" placeholder="Nombre del vendedor" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
              <input id="status" placeholder="Estado" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
              <input id="client" placeholder="Nombre del cliente" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="att" className="block text-sm font-medium text-gray-700">Att</label>
              <input id="att" placeholder="Atención" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Modo</label>
              <input id="mode" placeholder="Modo de transporte" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
              <input id="type" placeholder="Tipo" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="incoterm" className="block text-sm font-medium text-gray-700">Incoterm</label>
              <input id="incoterm" placeholder="Incoterm" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="freightCondition" className="block text-sm font-medium text-gray-700">Condición de Flete</label>
              <input id="freightCondition" placeholder="Condición de flete" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origen</label>
              <input id="origin" placeholder="Lugar de origen" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
              <input id="destination" placeholder="Lugar de destino" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <label htmlFor="goods" className="block text-sm font-medium text-gray-700">Mercadería</label>
              <input id="goods" placeholder="Descripción de la mercadería" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso</label>
              <input id="weight" placeholder="Peso" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volumen</label>
              <input id="volume" placeholder="Volumen" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700">Ítems de la Cotizacion</label>
            {items.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-2 mb-2">
                <input
                  placeholder="Descripción"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                  className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                  className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  &#128465;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              &#43; Agregar Ítem
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas</label>
            <textarea id="notes" placeholder="Notas adicionales..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
          </div>
        </form>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Guardar Cotizacion</button>
      </div>
    </div>
  
   </div>
   );
}

export default Cotizaciones; 