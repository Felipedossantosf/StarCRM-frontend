import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChartExample = ({ asignaciones, usuarios, clientes }) => {
  // Crear un mapa para obtener username a partir de userId
  const userMap = usuarios.reduce((acc, user) => {
    acc[user.userId] = user.username;
    return acc;
  }, {});

  // Identificar clientes asignados (clientes que aparecen en asignaciones)
  const clientesAsignados = new Set(asignaciones.map(asignacion => asignacion.cliente_id));

  // Identificar clientes libres (clientes con estado "Libre" que NO están asignados)
  const totalClientesLibres = clientes.filter(cliente => cliente.estado === "Libre" && !clientesAsignados.has(cliente.id)).length;

  // Agrupar asignaciones por usuario
  const groupedData = asignaciones.reduce((acc, asignacion) => {
    const userId = asignacion.comun_id;
    const username = userMap[userId] || `Usuario ${userId}`;

    acc[username] = (acc[username] || 0) + 1;
    return acc;
  }, {});

  // Agregar la categoría "Clientes Libres"
  if (totalClientesLibres > 0) {
    groupedData["Clientes Libres"] = totalClientesLibres;
  }

  // Convertir objeto a array para Recharts
  const data = Object.keys(groupedData).map((name) => ({
    name,
    value: groupedData[name],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"]; // Colores para los segmentos

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartExample;
