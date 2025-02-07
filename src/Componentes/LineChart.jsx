import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineChartExample = ({ cotizaciones }) => {
  // Agrupar cotizaciones por año, estado y mes
  const groupedData = cotizaciones.reduce((acc, cotizacion) => {
    const fecha = new Date(cotizacion.fecha);
    const year = fecha.getFullYear();
    const month = fecha.toLocaleString("es-ES", { month: "short" }); // "ene"
    const estado = cotizacion.estado;

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = {}; // Crear objeto del mes si no existe
    acc[year][month][estado] = (acc[year][month][estado] || 0) + 1; // Sumar cotización en ese mes y estado

    return acc;
  }, {});

  // Obtener los años y estados únicos
  const years = Object.keys(groupedData).sort((a, b) => b - a); // Ordenar años de mayor a menor
  const estados = ["Todos", ...new Set(cotizaciones.map(c => c.estado))]; // Agregar "Todos" como opción

  // Estado inicial: Primer año y "Todos" los estados
  const [selectedYear, setSelectedYear] = useState(years[0] || "");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  // Convertir datos según filtros
  const data =
    selectedYear
      ? Object.keys(groupedData[selectedYear] || {}).map((month) => {
        let cantidad = 0;

        if (selectedEstado === "Todos") {
          // Sumar todas las cotizaciones de todos los estados en ese mes
          cantidad = Object.values(groupedData[selectedYear][month] || {}).reduce((sum, val) => sum + val, 0);
        } else {
          // Tomar solo el estado seleccionado
          cantidad = groupedData[selectedYear][month]?.[selectedEstado] || 0;
        }

        return { name: month, cantidad };
      })
      : [];

  return (
    <div>
      {/* Contenedor para los selectores */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Selector de Año */}
        <div className="flex items-center space-x-2">
          <label>Año: </label>
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Selector de Estado */}
        <div className="flex items-center space-x-2">
          <label>Estado: </label>
          <select
            onChange={(e) => setSelectedEstado(e.target.value)}
            value={selectedEstado}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>


      {/* Gráfica */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartExample;
