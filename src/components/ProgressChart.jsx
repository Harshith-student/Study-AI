import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data }) => {
  const COLORS = ['#3fb950', '#8b949e', '#f85149'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      {data.length === 0 ? (
        <div className="flex items-center justify-center" style={{ height: '100%' }}>
          <p className="text-muted">No data available for chart</p>
        </div>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProgressChart;
