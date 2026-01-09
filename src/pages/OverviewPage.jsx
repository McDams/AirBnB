import { motion } from 'framer-motion';
import { Building2, Euro, TrendingUp, BarChart3, MapPin, Home } from 'lucide-react';
import { KPICard } from '@/components/cards/KPICard';
import { ChartCard } from '@/components/cards/ChartCard';
import { TotalListingsChart } from '@/components/charts/TotalListingsChart';
import { PriceDistributionChart } from '@/components/charts/PriceDistributionChart';
import { RoomTypeChart } from '@/components/charts/RoomTypeChart';
import { PriceStatsTable } from '@/components/tables/PriceStatsTable';
import { useMockData } from '@/data/useMockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const OverviewPage = ({ selectedCity }) => {
  const { data } = useMockData();
  const { summaryKPIs = {}, totalListings = [], priceStats = [] } = data || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Calculate city-specific KPIs if filtered
  const getFilteredKPIs = () => {
    if (selectedCity === 'all') {
      return {
        totalListings: summaryKPIs.totalListings,
        avgPrice: summaryKPIs.averagePrice,
        cities: summaryKPIs.totalCities
      };
    }
    
    const cityData = totalListings.find(c => c.city === selectedCity);
    const priceData = priceStats.find(c => c.city === selectedCity);
    
    return {
      totalListings: cityData?.total || 0,
      avgPrice: priceData?.mean || 0,
      cities: 1
    };
  };

  const kpis = getFilteredKPIs();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Annonces"
          value={kpis.totalListings.toLocaleString('fr-FR')}
          subtitle={selectedCity === 'all' ? "sur 3 villes" : selectedCity}
          trend="up"
          trendValue="+12.5%"
          icon={Building2}
          delay={0}
        />
        <KPICard
          title="Prix Moyen"
          value={`${kpis.avgPrice.toFixed(0)}€`}
          subtitle="par nuit"
          trend="up"
          trendValue="+5.2%"
          icon={Euro}
          delay={0.1}
        />
        <KPICard
          title="Villes Analysées"
          value={kpis.cities}
          subtitle="Paris, Bordeaux, Lyon"
          icon={MapPin}
          delay={0.2}
        />
        <KPICard
          title="Score R² Moyen"
          value={`${(summaryKPIs.avgR2Score * 100).toFixed(1)}%`}
          subtitle="modèle ML"
          trend="up"
          trendValue="+2.1%"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* City-specific KPIs */}
      {selectedCity === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {totalListings.map((city, index) => (
            <KPICard
              key={city.city}
              title={city.city}
              value={city.total.toLocaleString('fr-FR')}
              subtitle="annonces"
              icon={Home}
              cityClass={city.city.toLowerCase()}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>
      )}

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Nombre total d'annonces par ville"
          subtitle="Répartition des listings AirBnB"
          delay={0.5}
        >
          <TotalListingsChart />
        </ChartCard>

        <ChartCard
          title="Distribution des prix"
          subtitle="Histogramme des prix par tranche"
          delay={0.6}
        >
          <PriceDistributionChart selectedCity={selectedCity} />
        </ChartCard>
      </div>

      {/* Room Types & Price Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Types de logement"
          subtitle="Répartition par catégorie"
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
              <RoomTypeChart city="Paris" />
            </TabsContent>
            <TabsContent value="Bordeaux">
              <RoomTypeChart city="Bordeaux" />
            </TabsContent>
            <TabsContent value="Lyon">
              <RoomTypeChart city="Lyon" />
            </TabsContent>
          </Tabs>
        </ChartCard>

        <ChartCard
          title="Statistiques des prix"
          subtitle="Moyenne, médiane, min et max par ville"
          delay={0.8}
        >
          <PriceStatsTable />
        </ChartCard>
      </div>
    </motion.div>
  );
};

export default OverviewPage;
