import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { x: 1, y: 4000 },
  { x: 2, y: 3000 },
  { x: 3, y: 2000 },
  { x: 4, y: 2780 },
];

const ScatterChartExample = () => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart>
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="X" />
      <YAxis type="number" dataKey="y" name="Y" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  </ResponsiveContainer>
);

export default ScatterChartExample;
