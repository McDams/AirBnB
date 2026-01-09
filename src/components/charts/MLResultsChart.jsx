import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { useMockData } from '@/data/useMockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          R² Score: <span className="text-foreground font-medium">{(payload[0].value * 100).toFixed(1)}%</span>
        </p>
        <p className="text-sm text-muted-foreground">
          RMSE: <span className="text-foreground font-medium">{payload[0].payload.rmse}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const MLResultsChart = () => {
  const { data } = useMockData();
  const mlModelResults = data?.mlModelResults || [];
  const cityColors = data?.cityColors || {};

  const getBarColor = (city) => {
    switch (city) {
      case 'Paris': return cityColors.paris?.main;
      case 'Bordeaux': return cityColors.bordeaux?.main;
      case 'Lyon': return cityColors.lyon?.main;
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mlModelResults} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3} 
          vertical={false}
        />
        <XAxis 
          dataKey="city" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          domain={[0, 0.5]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
        <Bar 
          dataKey="r2" 
          radius={[8, 8, 0, 0]}
          maxBarSize={80}
        >
          {mlModelResults.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.city)} />
          ))}
          <LabelList 
            dataKey="r2" 
            position="top" 
            fill="hsl(var(--foreground))"
            fontSize={12}
            fontWeight={600}
            formatter={(value) => `${(value * 100).toFixed(1)}%`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MLResultsChart;
