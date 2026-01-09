import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useMockData } from '@/data/useMockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-2">
          Prix: {label}€
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-medium">{entry.value.toLocaleString('fr-FR')}</span> annonces
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PriceDistributionChart = ({ selectedCity = 'all' }) => {
  const { data } = useMockData();
  const priceDistribution = data?.priceDistribution || { Paris: [], Bordeaux: [], Lyon: [] };
  const cityColors = data?.cityColors || {};

  const paris = priceDistribution.Paris || [];
  const bordeaux = priceDistribution.Bordeaux || [];
  const lyon = priceDistribution.Lyon || [];

  // Combine data for all cities
  const combinedData = paris.map((item, index) => ({
    range: item.range,
    Paris: item.count,
    Bordeaux: bordeaux[index]?.count || 0,
    Lyon: lyon[index]?.count || 0,
  }));

  const showCity = (city) => selectedCity === 'all' || selectedCity === city;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3}
          vertical={false}
        />
        <XAxis 
          dataKey="range" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
        />
        {showCity('Paris') && (
          <Bar 
            dataKey="Paris" 
            fill={cityColors?.paris?.main || '#3b82f6'} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
        {showCity('Bordeaux') && (
          <Bar 
            dataKey="Bordeaux" 
            fill={cityColors?.bordeaux?.main || '#ec4899'} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
        {showCity('Lyon') && (
          <Bar 
            dataKey="Lyon" 
            fill={cityColors?.lyon?.main || '#f59e0b'} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceDistributionChart;
