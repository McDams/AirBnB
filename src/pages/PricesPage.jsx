import { motion } from 'framer-motion';
import { Euro, TrendingUp, TrendingDown, MapPin, BarChart3 } from 'lucide-react';
import { KPICard } from '@/components/cards/KPICard';
import { ChartCard } from '@/components/cards/ChartCard';
import { PriceDistributionChart } from '@/components/charts/PriceDistributionChart';
import { TopNeighbourhoodsChart } from '@/components/charts/TopNeighbourhoodsChart';
import { PriceStatsTable } from '@/components/tables/PriceStatsTable';
import { OutlierCleaningTable } from '@/components/tables/OutlierCleaningTable';
import { priceStats, boxplotData } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  ComposedChart,
  Scatter
} from 'recharts';
import { cityColors } from '@/data/mockData';

// Custom Boxplot Chart
const BoxplotChart = () => {
  const data = Object.entries(boxplotData).map(([city, values]) => ({
    city,
    min: values.min,
    q1: values.q1,
    median: values.median,
    q3: values.q3,
    max: values.max,
    range: [values.q1, values.q3],
    color: city === 'Paris' ? cityColors.paris.main : 
           city === 'Bordeaux' ? cityColors.bordeaux.main : 
           cityColors.lyon.main
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = boxplotData[label];
      return (
        <div className="glass-card p-3 border border-border/50 shadow-lg">
          <p className="font-display font-semibold text-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">Min: <span className="text-foreground">{d.min}€</span></p>
            <p className="text-muted-foreground">Q1: <span className="text-foreground">{d.q1}€</span></p>
            <p className="text-muted-foreground">Médiane: <span className="text-foreground font-semibold">{d.median}€</span></p>
            <p className="text-muted-foreground">Q3: <span className="text-foreground">{d.q3}€</span></p>
            <p className="text-muted-foreground">Max: <span className="text-foreground">{d.max}€</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          tickFormatter={(value) => `${value}€`}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {/* Min to Q1 bar */}
        <Bar dataKey="q1" stackId="box" fill="transparent" />
        
        {/* IQR Box (Q1 to Q3) */}
        <Bar dataKey="median" radius={[4, 4, 4, 4]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} opacity={0.7} />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const PricesPage = ({ selectedCity }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Get filtered price stats
  const getFilteredStats = () => {
    if (selectedCity === 'all') {
      const avgMean = priceStats.reduce((acc, s) => acc + s.mean, 0) / priceStats.length;
      const avgMedian = priceStats.reduce((acc, s) => acc + s.median, 0) / priceStats.length;
      const minPrice = Math.min(...priceStats.map(s => s.min));
      const maxPrice = Math.max(...priceStats.map(s => s.max));
      return { mean: avgMean, median: avgMedian, min: minPrice, max: maxPrice };
    }
    return priceStats.find(s => s.city === selectedCity) || priceStats[0];
  };

  const stats = getFilteredStats();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Price KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Prix Moyen"
          value={`${stats.mean.toFixed(0)}€`}
          subtitle="par nuit"
          trend="up"
          trendValue="+5.2%"
          icon={Euro}
          delay={0}
        />
        <KPICard
          title="Prix Médian"
          value={`${stats.median.toFixed(0)}€`}
          subtitle="par nuit"
          icon={BarChart3}
          delay={0.1}
        />
        <KPICard
          title="Prix Minimum"
          value={`${stats.min.toFixed(0)}€`}
          subtitle="par nuit"
          trend="down"
          trendValue="-2.1%"
          icon={TrendingDown}
          delay={0.2}
        />
        <KPICard
          title="Prix Maximum"
          value={`${stats.max.toLocaleString('fr-FR')}€`}
          subtitle="par nuit"
          trend="up"
          trendValue="+8.7%"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Price Distribution */}
      <ChartCard
        title="Distribution des prix par ville"
        subtitle="Histogramme comparatif des tranches de prix"
        delay={0.4}
      >
        <PriceDistributionChart selectedCity={selectedCity} />
      </ChartCard>

      {/* Boxplot & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Boxplot des prix"
          subtitle="Distribution statistique et détection des outliers"
          delay={0.5}
        >
          <BoxplotChart />
        </ChartCard>

        <ChartCard
          title="Statistiques détaillées"
          subtitle="Comparaison des métriques de prix"
          delay={0.6}
        >
          <PriceStatsTable />
        </ChartCard>
      </div>

      {/* Top Neighbourhoods */}
      <ChartCard
        title="Top 10 quartiers les plus chers"
        subtitle="Prix moyen par quartier"
        delay={0.7}
      >
        <Tabs defaultValue="Paris" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="Paris" className="data-[state=active]:bg-paris/20 data-[state=active]:text-paris">
              Paris
            </TabsTrigger>
            <TabsTrigger value="Bordeaux" className="data-[state=active]:bg-bordeaux/20 data-[state=active]:text-bordeaux">
              Bordeaux
            </TabsTrigger>
            <TabsTrigger value="Lyon" className="data-[state=active]:bg-lyon/20 data-[state=active]:text-lyon">
              Lyon
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Paris">
            <TopNeighbourhoodsChart city="Paris" />
          </TabsContent>
          <TabsContent value="Bordeaux">
            <TopNeighbourhoodsChart city="Bordeaux" />
          </TabsContent>
          <TabsContent value="Lyon">
            <TopNeighbourhoodsChart city="Lyon" />
          </TabsContent>
        </Tabs>
      </ChartCard>

      {/* Outlier Cleaning */}
      <ChartCard
        title="Nettoyage des valeurs aberrantes (IQR)"
        subtitle="Impact du nettoyage sur les statistiques"
        delay={0.8}
      >
        <OutlierCleaningTable />
      </ChartCard>
    </motion.div>
  );
};

export default PricesPage;
