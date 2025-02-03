import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Enero', ventas: 4000 },
  { name: 'Febrero', ventas: 3000 },
  { name: 'Marzo', ventas: 2000 },
];

const AreaChartExample = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
);

export default AreaChartExample;
