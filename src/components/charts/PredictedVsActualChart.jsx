import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ZAxis
} from 'recharts';
import { predictedVsActual, cityColors } from '@/data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-1">
          Prédiction
        </p>
        <p className="text-sm text-muted-foreground">
          Prix réel: <span className="text-foreground font-medium">{payload[0].payload.actual.toFixed(0)}€</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Prix prédit: <span className="text-foreground font-medium">{payload[0].payload.predicted.toFixed(0)}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const PredictedVsActualChart = ({ selectedCity = 'all' }) => {
  const showCity = (city) => selectedCity === 'all' || selectedCity === city;

  // Reference line data for perfect prediction
  const perfectLine = [
    { actual: 0, predicted: 0 },
    { actual: 300, predicted: 300 }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--border))" 
          opacity={0.3}
        />
        <XAxis 
          type="number" 
          dataKey="actual" 
          name="Prix réel" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          domain={[0, 'dataMax + 20']}
          label={{ 
            value: 'Prix réel (€)', 
            position: 'bottom', 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 12,
            offset: 10
          }}
        />
        <YAxis 
          type="number" 
          dataKey="predicted" 
          name="Prix prédit" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          domain={[0, 'dataMax + 20']}
          label={{ 
            value: 'Prix prédit (€)', 
            angle: -90, 
            position: 'insideLeft', 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 12
          }}
        />
        <ZAxis range={[50, 100]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
        />
        {/* Perfect prediction reference line */}
        <ReferenceLine 
          segment={[{ x: 0, y: 0 }, { x: 300, y: 300 }]}
          stroke="hsl(var(--muted-foreground))" 
          strokeDasharray="5 5"
          opacity={0.5}
          label={{ 
            value: 'Prédiction parfaite', 
            position: 'insideBottomRight',
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 10
          }}
        />
        {showCity('Paris') && (
          <Scatter 
            name="Paris" 
            data={predictedVsActual.Paris} 
            fill={cityColors.paris.main}
            opacity={0.7}
          />
        )}
        {showCity('Bordeaux') && (
          <Scatter 
            name="Bordeaux" 
            data={predictedVsActual.Bordeaux} 
            fill={cityColors.bordeaux.main}
            opacity={0.7}
          />
        )}
        {showCity('Lyon') && (
          <Scatter 
            name="Lyon" 
            data={predictedVsActual.Lyon} 
            fill={cityColors.lyon.main}
            opacity={0.7}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PredictedVsActualChart;
