import React, { useState, useEffect} from "react";
import Select from "react-select"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateData, postData } from "../redux/apiSlice";
import Swal from "sweetalert2";
import Header from "./otros/Header";
import { pdf } from "@react-pdf/renderer";
import QuotationPdf from "./QuotationPDF"; // Importa el componente del PDF


const ModificarCotizacion = () => {

    const location = useLocation();
    const coti = location.state
    const [activeTab, setActiveTab] = useState("Cotizaciones");
    
    //Seleccion lineas
    const listaItems = coti.lineas.map(item => ({
      description: item.descripcion,
      quantity: item.cant,
      price: item.precioUnit,
      iva: item.iva,
    }));

    const [items, setItems] = useState(listaItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {clientes, usuarios, proveedores, asignaciones} = useSelector((state) => state.api);
    const [invoiceNumber, setInvoiceNumber] = useState(coti.id);
    //Seleccion Cliente
    const listaProveedores = proveedores.map(proveedor => ({
      label: proveedor.nombre,
      value: proveedor.id,
    }));
    const provedorSelc = 
    listaProveedores.filter(proveedor => coti.proveedor_id === proveedor.value)
    const [proveedor, setProvedor] = useState(provedorSelc);

    //Seleccion vendedor
    const listaUsurios = usuarios.map(usuario => ({
      label: usuario.username,
      value: usuario.userId,
    }));
    const vendedorSelc =
    listaUsurios.filter(usuario => coti.usuario_id === usuario.value)
    const [vendedor, setVendedor] = useState(vendedorSelc);

    //Seleccion Estado
    const listaEstados = [
      { label: 'Pendiente', value: '1' },
      { label: 'Aprobada', value: '2' },
      { label: 'Rechazada', value: '3' },
      { label: 'Costeo', value: '4' },
    ];
    const estadoSelc = listaEstados.filter(estado => coti.estado === estado.label)
    const [estado, setEstado] = useState(estadoSelc);

    //seleccion Cliente
    const listaclientes = clientes.map(cliente => ({
      label: cliente.nombre,
      value: cliente.id,
    }));
    const clienteSelec = listaclientes.filter(cliente => coti.cliente_id === cliente.value)
    const [cliente, setCliente] = useState(clienteSelec);

    const [fecha, setFecha] = useState(coti.fecha);
    const [validez, setValidez] = useState(coti.fechaValidez);
    const [att, setAtt] = useState(coti.att);

    //seleccion Modo
    const listaModo = [
      { label: 'MARITIMO', value: '1' },
      { label: 'AEREO', value: '2' },  
      { label: 'TERRESTRE', value: '3' },        
  ];
  const modoSelecc = listaModo.filter(modo => coti.modo === modo.label)
    const [modo, setModo] = useState(modoSelecc);

    //seleccion Tipo
    const listaTipo = [
      { label: 'CONSOLIDADO', value: '1' },
      { label: 'Otros', value: '2' },        
     ];
      const tipoSelecc = listaTipo.filter(tipo => coti.tipo === tipo.label)
    const [tipo, setTipo] = useState(tipoSelecc);

    //seleccion Incoterm
    const listaIncoterm = [
      { label: 'EXW (Ex Works / En fábrica)', value: '1' },
      { label: 'FCA (Free Carrier / Libre transportista)', value: '2' },  
      { label: 'FAS (Free Alongside Ship / Libre al costado del buque)', value: '3' },
      { label: 'FOB (Free On Board / Libre a bordo)', value: '4' },   
      { label: 'CIF (Cost, Insurance and Freight / Costo, seguro y flete)', value: '5' },        
      { label: 'CFR (Cost and Freight / Costo y flete)', value: '6' },        
      { label: 'CPT (Carriage Paid To / Transporte pagado hasta)', value: '7' },    
      { label: 'CIP (Carriage and Insurance Paid To / Transporte y seguro pagados hasta)', value: '8' },        
      { label: 'DAP (Delivered At Place / Entregado en un punto acordado)', value: '9' },    
      { label: 'DPU (Delivered at Place Unloaded / Entregado en un punto con descarga)', value: '10' },        
      { label: 'DDP (Delivered Duty Paid / Entregado con derechos pagados)', value: '11' },        
  ];
  const incotermSelecc = listaIncoterm.filter(incoterm => coti.incoterm === incoterm.label)
    const [incoterm, setIncoterm] = useState(incotermSelecc);
    const [condicionFlete, setCondicionFlete] = useState(coti.condicionFlete);
    const [origen, setOrigen] = useState(coti.origen);
    const [destino, setDestino] = useState(coti.destino);
    const [mercaderia, setMercaderia] = useState(coti.mercaderia);
    const [bulto, setBulto] = useState(coti.bulto);
    const [peso, setPeso] = useState(coti.peso);
    const [volumen, setVolumen] = useState(coti.volumen);
    const [notas, setNotas] = useState(coti.terminosCondiciones);
    const [Preciometro, setPreciometro] = useState(coti.precioMetro);
   
  useEffect(() => {
        dispatch(fetchData('cliente'));
        dispatch(fetchData('proveedor'));
        dispatch(fetchData('usuario'));
        dispatch(fetchData('asignacion'));
  
      }, [dispatch])
      
      const ModificarCotizacion = async () => {
        try {
          const clientesIds = cliente.map((c) => c.value);
          const vendedorid = vendedor.map((v) => v.value);
          const proveedorid = proveedor.map((p) => p.value);
      
          const lineas2 = items.map((item) => ({
            id: 18,
            cotizacion_id: 16,
            cant: item.quantity,
            precioUnit: item.price,
            totalLinea: item.price,
            descripcion: item.description,
            iva: item.iva
          }));
      
          const cotizacion = {
            id: invoiceNumber,
            estado: estado?.label || "Pendiente",
            fecha: fecha,
            metodosPago: "metodos prueba",
            subtotal: Math.round(subtotal),
            porcDesc: 0,
            subtotalDesc: 10,
            porcIva: Math.round(iva),
            total: Math.round(total),
            cliente_id: clientesIds[0] || null,
            empresa_id: 1,
            usuario_id: vendedorid[0] || null,
            proveedor_id: proveedorid[0] || null,
            fechaValidez: validez,
            origen: origen || "N/A",
            destino: destino || "N/A",
            condicionFlete: condicionFlete || "N/A",
            modo: modo?.label || "N/A",
            mercaderia: mercaderia || "N/A",
            peso: Math.round(parseFloat(peso)) || 0,
            volumen: Math.round(parseFloat(volumen)) || 0,
            terminosCondiciones: notas || "N/A",
            tipo: tipo?.label || "N/A",
            incoterm: incoterm?.label || "N/A",
            bulto: (parseFloat(bulto)) || 0,
            precioMetro: Math.round(parseFloat(Preciometro)) || 0,
            att: att || "N/A",
            lineas: lineas2.length ? lineas2 : []
          };
      
          const response = await dispatch(updateData({ url: "cotizacion",id:cotizacion.id, data: cotizacion }));
      
          if (response.error) {
            throw new Error(response.error.message || "Error desconocido");
          }
          
          const notificacionesAsignacion = asignaciones.filter(asignacion => 
                                            clientesIds.some(clienteId => clienteId === asignacion.cliente_id) // Se corrigió el acceso a clienteId
                                        );
                    
                    for (const notificacion of notificacionesAsignacion) {
                    const cliente = clientes.find((c) => c.id === notificacion.cliente_id);
                                            
                    if (!cliente) {
                       continue;  // Si no encuentra el cliente, sigue con la siguiente iteración
                      }
                          
                   const listaUsuarios = notificacion.comun_id ? [notificacion.comun_id] : [];
                   const response = await dispatch(
                   postData({
                   url: "notificacion",
                   data: { 
                          cliente_id: notificacion.cliente_id, 
                          mensaje: `Se modificacion Cotizacion Para ${cliente.nombre} con fecha ${fecha} `, 
                          usuariosId: listaUsuarios 
                          },
                        })
                    );
                            
                  }
      
          Swal.fire({
            icon: "success",
            title: "Cotización creada exitosamente.",
            showConfirmButton: false,
            timer: 1500
          });
      
          try {
            const doc = <QuotationPdf data={cotizacion} />;
      
            if (!doc) {
              throw new Error("Error: QuotationPdf no se generó correctamente.");
            }
      
            const blob = await pdf(doc).toBlob();
      
            if (!blob) {
              throw new Error("Error: No se pudo generar el Blob del PDF.");
            }
      
            const pdfURL = URL.createObjectURL(blob);
            window.open(pdfURL, "_blank");
          } catch (pdfError) {
            Swal.fire({
              icon: "error",
              title: "Error al generar el PDF",
              text: pdfError.message
            });
          }
      
          navigate("/cotizaciones");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al crear la cotización",
            text: error.message
          });
        }
      };
      
    const calcularLinea = () => {
    if (modo.label == "MARITIMO" && tipo.label == "CONSOLIDADO") {
      const volumenKg = volumen * 167;
      if(volumenKg < peso){
        const precio = peso * Preciometro;
       setItems([...items, { description: 'Flete Maritimo', quantity: 1, price: precio, iva: 0 }])
     }else{
      const precio = volumenKg * Preciometro;
      setItems([...items, { description: 'Flete Maritimo', quantity: 1, price: precio, iva: 0 }])
       }
    }else if (modo.label == "AEREO" && tipo.label == "CONSOLIDADO") {
      const volumenKg = volumen * 167;
      if(volumenKg < peso){
        const precio = peso * Preciometro;
       setItems([...items, { description: 'Flete AEREO', quantity: 1, price: precio, iva: 0 }])
     }else{
      const precio = volumenKg * Preciometro;
      setItems([...items, { description: 'Flete AEREO', quantity: 1, price: precio, iva: 0 }])
       }
      }else if (modo.label == "TERRESTRE" && tipo.label == "CONSOLIDADO") {
        const volumenKg = volumen * 167;
        if(volumenKg < peso){
          const precio = peso * Preciometro;
         setItems([...items, { description: 'Flete TERRESTRE', quantity: 1, price: precio, iva: 0 }])
       }else{
        const precio = volumenKg * Preciometro;
        setItems([...items, { description: 'Flete TERRESTRE', quantity: 1, price: precio, iva: 0 }])
         }
        }
    }
  
    const addItem = () => {
      setItems([...items, { description: '', quantity: 1, price: 0 , iva: 0}])
    }
  
    const removeItem = (index) => {
      setItems(items.filter((_, i) => i !== index))
    }
  
    const updateItem = (index, field, value) => {
      const newItems = [...items]
      newItems[index] = { ...newItems[index], [field]: value }
      setItems(newItems)
    }
    
    const calculeSubtotal = () => {
      return Math.round(items.reduce((total, item) => total + item.quantity * item.price, 0));
    }
    const calculateTotal = () => {
      return Math.round(items.reduce((total, item) => total + item.quantity * item.price * (1 + item.iva / 100), 0));
    }
    const calculateIva = () => {
      return Math.round(total - subtotal);
    }
  
    const total = calculateTotal();
    const subtotal = calculeSubtotal();
    const iva = calculateIva()
  
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
              <div >
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Número de Cotizacion</label>
                <input id="invoiceNumber" placeholder="Ej: FAC-001" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
             <div>
               <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
               <input id="fecha" name="fecha" type="date" value={fecha ? new Date(fecha).toISOString().split("T")[0] : ""} onChange={(e) => setFecha(e.target.value)} required className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"/>
             </div>
             <div>
               <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Validez</label>
               <input id="fecha" name="fecha" type="date" value={validez ? new Date(validez).toISOString().split("T")[0] : ""} onChange={(e) => setValidez(e.target.value)} required className="w-full px-3 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-[#56C3CE]"/>
             </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Proveedor</label>
                <Select id="provider" placeholder="Nombre del proveedor"  options={listaProveedores} value={proveedor} onChange={setProvedor}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendedor</label>
                <Select id="vendor" placeholder="Nombre del vendedor"  options={listaUsurios} value={vendedor} onChange={setVendedor}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                <Select id="status"  options={listaEstados} value={estado} onChange={setEstado} placeholder="Estado" 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
                <Select id="client"  options={listaclientes} value={cliente} onChange={setCliente} placeholder="Nombre del cliente" 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="att" className="block text-sm font-medium text-gray-700">Att</label>
                <input id="att" placeholder="Atención" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={att} onChange={(e) => setAtt(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Modo</label>
                <Select id="mode" options={listaModo} value={modo} onChange={setModo} placeholder="Modo de transporte" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                <Select id="type" options={listaTipo} value={tipo} onChange={setTipo} placeholder="Tipo" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label htmlFor="incoterm" className="block text-sm font-medium text-gray-700">Incoterm</label>
                <Select id="incoterm"  options={listaIncoterm} placeholder="Incoterm" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={incoterm} onChange={setIncoterm}/>
              </div>
              <div>
                <label htmlFor="freightCondition" className="block text-sm font-medium text-gray-700">Condición de Flete</label>
                <input id="freightCondition" placeholder="Condición de flete" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus-border-blue-500" value={condicionFlete} onChange={(e) => setCondicionFlete(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origen</label>
                <input id="origin" placeholder="Lugar de origen" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={origen} onChange={(e) => setOrigen(e.target.value)} />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
                <input id="destination" placeholder="Lugar de destino" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={destino} onChange={(e) => setDestino(e.target.value)} />
              </div>
              <div>
                <label htmlFor="goods" className="block text-sm font-medium text-gray-700">Mercadería</label>
                <input id="goods" placeholder="Descripción de la mercadería" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={mercaderia} onChange={(e) => setMercaderia(e.target.value)}  />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-4 rounded-lg shadow-sm">
              <div>
                <label htmlFor="goods" className="block text-sm font-medium text-gray-700">Bulto / Container </label>
                <input id="goods" placeholder="Cantidad de Bulto / container" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={bulto} onChange={(e) => setBulto(e.target.value)}  />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso</label>
                <input id="weight" placeholder="Peso" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={peso} onChange={(e) => setPeso(e.target.value)}  />
              </div>
              <div>
                <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volumen</label>
                <input id="volume" placeholder="Volumen" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={volumen} onChange={(e) => setVolumen(e.target.value)} />
              </div>
              <div>
                <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Precio x Metro</label>
                <input id="volume" placeholder="precio" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={Preciometro} onChange={(e) => setPreciometro(e.target.value)} />
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
                    placeholder="Iva"
                    value={item.iva}
                    onChange={(e) => updateItem(index, 'iva', parseFloat(e.target.value))}
                    className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              <button
                type="button"
                onClick={calcularLinea}
                className="mt-2 text-yellow-600 hover:text-yellow-800"
              >
                &#43; Linea Calculada
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Terminos Y Condiciones</label>
              <textarea id="notes" placeholder="Notas adicionales..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={notas} onChange={(e) => setNotas(e.target.value)}  ></textarea>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">SubTotal: ${subtotal}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Iva: ${iva}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Total: ${total}</p>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <button className="w-full bg-[#56C3CE] text-whi</div>te py-3 rounded-lg hover:bg-blue-700"
          onClick={ModificarCotizacion}
          >Guardar Cotizacion
          </button>
        </div>
      </div>
    
     </div>
     );
  }

export default ModificarCotizacion