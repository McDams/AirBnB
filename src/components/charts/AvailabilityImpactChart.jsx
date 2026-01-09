import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
  ZAxis
} from 'recharts';
import { useMockData } from '@/data/useMockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-1">
          Disponibilité
        </p>
        <p className="text-sm text-muted-foreground">
          Jours: <span className="text-foreground font-medium">{payload[0].payload.availability}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Prix: <span className="text-foreground font-medium">{payload[0].payload.price.toFixed(0)}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AvailabilityImpactChart = ({ selectedCity = 'all' }) => {
  const { data } = useMockData();
  const availabilityImpact = data?.availabilityImpact || {};
  const cityColors = data?.cityColors || {};

  const showCity = (city) => selectedCity === 'all' || selectedCity === city;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3}
        />
        <XAxis 
          type="number" 
          dataKey="availability" 
          name="Disponibilité" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          domain={[0, 365]}
          label={{ 
            value: 'Disponibilité (jours/365)', 
            position: 'bottom', 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 12,
            offset: 10
          }}
        />
        <YAxis 
          type="number" 
          dataKey="price" 
          name="Prix" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          label={{ 
            value: 'Prix (€)', 
            angle: -90, 
            position: 'insideLeft', 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 12
          }}
        />
        <ZAxis range={[40, 80]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
        />
        {showCity('Paris') && (
          <Scatter 
            name="Paris" 
            data={availabilityImpact.Paris} 
            fill={cityColors?.paris?.main || '#3b82f6'}
            opacity={0.6}
          />
        )}
        {showCity('Bordeaux') && (
          <Scatter 
            name="Bordeaux" 
            data={availabilityImpact.Bordeaux} 
            fill={cityColors?.bordeaux?.main || '#ec4899'}
            opacity={0.6}
          />
        )}
        {showCity('Lyon') && (
          <Scatter 
            name="Lyon" 
            data={availabilityImpact.Lyon} 
            fill={cityColors?.lyon?.main || '#f59e0b'}
            opacity={0.6}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default AvailabilityImpactChart;
