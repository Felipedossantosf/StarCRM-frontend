import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Enero', ventas: 4000 },
  { name: 'Febrero', ventas: 3000 },
  { name: 'Marzo', ventas: 2000 },
];

const MyChart = () => (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ventas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MyChart;
