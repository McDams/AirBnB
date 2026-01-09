import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { useMockData } from '@/data/useMockData';

const ROOM_COLORS = [
  'hsl(173, 58%, 45%)', // Primary teal
  'hsl(220, 76%, 55%)', // Paris blue
  'hsl(350, 65%, 50%)', // Bordeaux
  'hsl(38, 92%, 50%)',  // Warning/amber
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value.toLocaleString('fr-FR')} annonces ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const RoomTypeChart = ({ city = 'Paris' }) => {
  const { data } = useMockData();
  const roomTypeDistribution = data?.roomTypeDistribution || {};

  const dataset = roomTypeDistribution[city] || roomTypeDistribution.Paris || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataset}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          innerRadius={40}
          dataKey="count"
          nameKey="type"
          paddingAngle={2}
        >
          {dataset.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={ROOM_COLORS[index % ROOM_COLORS.length]}
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value) => (
            <span className="text-foreground text-sm">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RoomTypeChart;
