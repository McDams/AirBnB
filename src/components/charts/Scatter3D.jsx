import { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { data3D, cityColors } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 border border-border/50 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-2">Détails</p>
        <p className="text-sm text-muted-foreground">
          Disponibilité: <span className="text-foreground font-medium">{data.x}j</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Avis/mois: <span className="text-foreground font-medium">{data.y.toFixed(2)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Prix: <span className="text-foreground font-medium">{data.z.toFixed(0)}€</span>
        </p>
      </div>
    );
  }
  return null;
};

export const Scatter3D = ({ selectedCity = 'all' }) => {
  const [activeView, setActiveView] = useState('price-avail');
  const showCity = (city) => selectedCity === 'all' || selectedCity === city;

  // Transform data for different view combinations
  const getViewData = (cityData, view) => {
    return cityData.map(point => {
      switch(view) {
        case 'price-avail':
          return { x: point.x, y: point.z, original: point };
        case 'price-reviews':
          return { x: point.y, y: point.z, original: point };
        case 'avail-reviews':
          return { x: point.x, y: point.y, original: point };
        default:
          return point;
      }
    });
  };

  const getAxisLabels = () => {
    switch(activeView) {
      case 'price-avail':
        return { x: 'Disponibilité (jours)', y: 'Prix (€)' };
      case 'price-reviews':
        return { x: 'Avis par mois', y: 'Prix (€)' };
      case 'avail-reviews':
        return { x: 'Disponibilité (jours)', y: 'Avis par mois' };
      default:
        return { x: 'X', y: 'Y' };
    }
  };

  const labels = getAxisLabels();

  const CustomTooltipView = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload.original || payload[0].payload;
      return (
        <div className="glass-card p-3 border border-border/50 shadow-lg">
          <p className="font-display font-semibold text-foreground mb-2">Détails</p>
          <p className="text-sm text-muted-foreground">
            Disponibilité: <span className="text-foreground font-medium">{data.x}j</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Avis/mois: <span className="text-foreground font-medium">{data.y?.toFixed(2) || 'N/A'}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Prix: <span className="text-foreground font-medium">{data.z?.toFixed(0) || 'N/A'}€</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* View Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge 
          variant={activeView === 'price-avail' ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => setActiveView('price-avail')}
        >
          Prix vs Disponibilité
        </Badge>
        <Badge 
          variant={activeView === 'price-reviews' ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => setActiveView('price-reviews')}
        >
          Prix vs Avis/mois
        </Badge>
        <Badge 
          variant={activeView === 'avail-reviews' ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => setActiveView('avail-reviews')}
        >
          Disponibilité vs Avis
        </Badge>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3}
          />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={labels.x}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            label={{ 
              value: labels.x, 
              position: 'bottom', 
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
              offset: 20
            }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name={labels.y}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            label={{ 
              value: labels.y, 
              angle: -90, 
              position: 'insideLeft', 
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12
            }}
          />
          <ZAxis range={[30, 80]} />
          <Tooltip content={<CustomTooltipView />} cursor={{ strokeDasharray: '3 3' }} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
          />
          {showCity('Paris') && (
            <Scatter 
              name="Paris" 
              data={getViewData(data3D.Paris, activeView)} 
              fill={cityColors.paris.main}
              opacity={0.6}
            />
          )}
          {showCity('Bordeaux') && (
            <Scatter 
              name="Bordeaux" 
              data={getViewData(data3D.Bordeaux, activeView)} 
              fill={cityColors.bordeaux.main}
              opacity={0.6}
            />
          )}
          {showCity('Lyon') && (
            <Scatter 
              name="Lyon" 
              data={getViewData(data3D.Lyon, activeView)} 
              fill={cityColors.lyon.main}
              opacity={0.6}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: cityColors.paris.main }} />
          <span className="text-sm text-foreground">Paris</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: cityColors.bordeaux.main }} />
          <span className="text-sm text-foreground">Bordeaux</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: cityColors.lyon.main }} />
          <span className="text-sm text-foreground">Lyon</span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          💡 Cliquez sur les badges ci-dessus pour explorer différentes dimensions des données
        </p>
      </div>
    </div>
  );
};

export default Scatter3D;
