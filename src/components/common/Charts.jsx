import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const SimpleBarChart = ({ data, height = 280 }) => {
  // Only show every 2 hours on the X-axis for the 'today' view to keep labels clean
  const isHourly = data?.length > 0 && /^\d{2}:\d{2}$/.test(data[0].label);
  const is30Days = data?.length === 30;

  let customTicks;
  if (is30Days) {
    // Show every 5 days, and ensure the very last day is included
    const ticks = data.filter((_, i) => i % 5 === 0 || i === data.length - 1).map(d => d.label);
    customTicks = [...new Set(ticks)];
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="label" 
            type="category"
            interval={isHourly ? 0 : "preserveStartEnd"}
            padding={{ left: 10, right: 10 }}
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            dy={10}
            ticks={customTicks}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 2, strokeDasharray: '3 3' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Line 
            type="monotone" 
            dataKey="users" 
            name="Users" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} 
          />
          <Line 
            type="monotone" 
            dataKey="applications" 
            name="Applications" 
            stroke="#4ade80" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
            activeDot={{ r: 6, stroke: '#4ade80', strokeWidth: 2, fill: '#fff' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
