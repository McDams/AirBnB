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
import { topNeighbourhoods, cityColors } from '@/data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          Prix moyen: <span className="text-foreground font-medium">{payload[0].value}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const TopNeighbourhoodsChart = ({ city = 'Paris' }) => {
  const data = topNeighbourhoods[city] || topNeighbourhoods.Paris;
  
  const getColor = () => {
    switch (city) {
      case 'Paris': return cityColors.paris.main;
      case 'Bordeaux': return cityColors.bordeaux.main;
      case 'Lyon': return cityColors.lyon.main;
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={data} 
        layout="vertical"
        margin={{ top: 10, right: 80, left: 10, bottom: 10 }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3}
          horizontal={false}
        />
        <XAxis 
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickFormatter={(value) => `${value}€`}
        />
        <YAxis 
          type="category"
          dataKey="neighbourhood"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
        <Bar 
          dataKey="meanPrice" 
          fill={getColor()}
          radius={[0, 6, 6, 0]}
          maxBarSize={25}
        >
          <LabelList 
            dataKey="meanPrice" 
            position="right" 
            fill="hsl(var(--foreground))"
            fontSize={11}
            fontWeight={500}
            formatter={(value) => `${value}€`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopNeighbourhoodsChart;
