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
  LabelList
} from 'recharts';
import { formatHours } from '../utils/format';
import { ActivityCategory } from '../types';

interface ChartsProps {
  atividadeData: any[];
  globalData: any[];
}

const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  'Visita Técnica',
  'Parametrização',
  'PTAF',
  'TAF',
  'TAC',
  'Técnico Campo'
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-3 border rounded shadow">
      <p className="font-semibold">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}: {formatHours(entry.value)}
        </p>
      ))}
    </div>
  );
};

const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x + props.width / 2}
      y={y - 6}
      textAnchor="middle"
      fill="#666666"
      fontSize={10}
    >
      {formatHours(value)}
    </text>
  );
};

export const Charts: React.FC<ChartsProps> = ({ atividadeData, globalData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Controle de Horas</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={atividadeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              yAxisId="left"
              label={{ value: 'Horas', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => formatHours(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: 'Variação (%)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="Vendido" fill="#22c55e" name="Vendido">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Bar yAxisId="left" dataKey="Planejado" fill="#f97316" name="Planejado">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Bar yAxisId="left" dataKey="Consumido" fill="#3b82f6" name="Consumido">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Bar yAxisId="left" dataKey="Improdutivo" fill="#ef4444" name="Improdutivo">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Variação PlanXCons"
              stroke="#8b5cf6"
              name="Variação PlanXCons"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Total Global de Horas</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={globalData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatHours(value)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="horasVendidas" fill="#22c55e" name="Horas Vendidas">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Bar dataKey="horasPlanejadas" fill="#f97316" name="Horas Planejadas">
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Bar dataKey="horasConsumidas" fill="#3b82f6" name="Horas Consumidas">
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};