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
import { priceDistribution, cityColors } from '@/data/mockData';

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
  // Combine data for all cities
  const combinedData = priceDistribution.Paris.map((item, index) => ({
    range: item.range,
    Paris: priceDistribution.Paris[index].count,
    Bordeaux: priceDistribution.Bordeaux[index].count,
    Lyon: priceDistribution.Lyon[index].count,
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
            fill={cityColors.paris.main} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
        {showCity('Bordeaux') && (
          <Bar 
            dataKey="Bordeaux" 
            fill={cityColors.bordeaux.main} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
        {showCity('Lyon') && (
          <Bar 
            dataKey="Lyon" 
            fill={cityColors.lyon.main} 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceDistributionChart;
