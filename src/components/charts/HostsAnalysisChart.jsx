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
import { hostsAnalysis, cityColors } from '@/data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value.toLocaleString('fr-FR')} annonces ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export const HostsAnalysisChart = ({ city = 'Paris' }) => {
  const data = hostsAnalysis[city] || hostsAnalysis.Paris;
  
  const colors = {
    Paris: [cityColors.paris.main, cityColors.paris.glow],
    Bordeaux: [cityColors.bordeaux.main, cityColors.bordeaux.glow],
    Lyon: [cityColors.lyon.main, cityColors.lyon.glow],
  };

  const cityColorSet = colors[city] || colors.Paris;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart 
        data={data} 
        layout="vertical"
        margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
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
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <YAxis 
          type="category"
          dataKey="type"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
          width={120}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
        <Bar 
          dataKey="count" 
          radius={[0, 8, 8, 0]}
          maxBarSize={40}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cityColorSet[index % 2]} />
          ))}
          <LabelList 
            dataKey="count" 
            position="right" 
            fill="hsl(var(--foreground))"
            fontSize={12}
            fontWeight={600}
            formatter={(value) => value.toLocaleString('fr-FR')}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HostsAnalysisChart;
