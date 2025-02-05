import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from "react";



const MyChart = ({ clientes }) => {


const activos = clientes.filter(cliente => !cliente.esInactivo).length;
const inactivos = clientes.filter(cliente => cliente.esInactivo).length;

const data = [
  { name: 'Activos', cantidad: activos },
  { name: 'Inactivos', cantidad: inactivos },
];;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
