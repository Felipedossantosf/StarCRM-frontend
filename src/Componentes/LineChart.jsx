import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Enero', ventas: 4000 },
  { name: 'Febrero', ventas: 3000 },
  { name: 'Marzo', ventas: 2000 },
];

const LineChartExample = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default LineChartExample;
