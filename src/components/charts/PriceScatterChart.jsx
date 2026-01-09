import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ZAxis,
  Legend,
  ReferenceLine
} from 'recharts';
import { priceVsHostListings, cityColors } from '@/data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-1">
          Détails
        </p>
        <p className="text-sm text-muted-foreground">
          Logements hôte: <span className="text-foreground font-medium">{payload[0].payload.hostListings}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Prix: <span className="text-foreground font-medium">{payload[0].payload.price.toFixed(0)}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const PriceScatterChart = ({ selectedCity = 'all' }) => {
  const showCity = (city) => selectedCity === 'all' || selectedCity === city;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3}
        />
        <XAxis 
          type="number" 
          dataKey="hostListings" 
          name="Logements" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          label={{ 
            value: 'Nombre de logements de l\'hôte', 
            position: 'bottom', 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 12
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
        <ReferenceLine 
          y={120} 
          stroke="hsl(var(--muted-foreground))" 
          strokeDasharray="5 5" 
          opacity={0.5}
        />
        {showCity('Paris') && (
          <Scatter 
            name="Paris" 
            data={priceVsHostListings.Paris} 
            fill={cityColors.paris.main}
            opacity={0.6}
          />
        )}
        {showCity('Bordeaux') && (
          <Scatter 
            name="Bordeaux" 
            data={priceVsHostListings.Bordeaux} 
            fill={cityColors.bordeaux.main}
            opacity={0.6}
          />
        )}
        {showCity('Lyon') && (
          <Scatter 
            name="Lyon" 
            data={priceVsHostListings.Lyon} 
            fill={cityColors.lyon.main}
            opacity={0.6}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PriceScatterChart;
