import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

interface ChartsProps {
  atividadeData: any[];
  globalData: any[];
}

export const Charts: React.FC<ChartsProps> = ({ atividadeData, globalData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Horas por Atividade</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={atividadeData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="horasVendidas" fill="#22c55e" name="Horas Vendidas" />
            <Bar dataKey="horasPlanejadas" fill="#f97316" name="Horas Planejadas" />
            <Bar dataKey="horasConsumidas" fill="#3b82f6" name="Horas Consumidas" />
            <Bar dataKey="horasImprodutivas" fill="#ef4444" name="Horas Improdutivas" />
            <Bar dataKey="saldoHoras" fill="#6b7280" name="Saldo" />
            <Line
              type="monotone"
              dataKey="variacao"
              stroke="#8b5cf6"
              name="Variação (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Total Global de Horas</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={globalData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="horasVendidas" fill="#22c55e" name="Horas Vendidas" />
            <Bar dataKey="horasPlanejadas" fill="#f97316" name="Horas Planejadas" />
            <Bar dataKey="horasConsumidas" fill="#3b82f6" name="Horas Consumidas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};