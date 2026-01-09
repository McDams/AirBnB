import { motion } from 'framer-motion';
import { Users, Home, Building, TrendingUp } from 'lucide-react';
import { KPICard } from '@/components/cards/KPICard';
import { ChartCard } from '@/components/cards/ChartCard';
import { HostsAnalysisChart } from '@/components/charts/HostsAnalysisChart';
import { PriceScatterChart } from '@/components/charts/PriceScatterChart';
import { useMockData } from '@/data/useMockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const HostsPage = ({ selectedCity }) => {
  const { data } = useMockData();
  const { hostsAnalysis = {} } = data || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Calculate host stats
  const getHostStats = () => {
    if (selectedCity === 'all') {
      let singleTotal = 0, multiTotal = 0;
      Object.values(hostsAnalysis).forEach(city => {
        singleTotal += city[0].count;
        multiTotal += city[1].count;
      });
      return {
        single: singleTotal,
        multi: multiTotal,
        singlePct: ((singleTotal / (singleTotal + multiTotal)) * 100).toFixed(1),
        multiPct: ((multiTotal / (singleTotal + multiTotal)) * 100).toFixed(1)
      };
    }
    
    const data = hostsAnalysis[selectedCity];
    if (!data) return { single: 0, multi: 0, singlePct: '0', multiPct: '0' };
    
    return {
      single: data[0].count,
      multi: data[1].count,
      singlePct: data[0].percentage.toFixed(1),
      multiPct: data[1].percentage.toFixed(1)
    };
  };

  const stats = getHostStats();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Host KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Hôtes (1 logement)"
          value={stats.single.toLocaleString('fr-FR')}
          subtitle={`${stats.singlePct}% du total`}
          icon={Home}
          delay={0}
        />
        <KPICard
          title="Hôtes Multi-logements"
          value={stats.multi.toLocaleString('fr-FR')}
          subtitle={`${stats.multiPct}% du total`}
          icon={Building}
          delay={0.1}
        />
        <KPICard
          title="Total Hôtes"
          value={(stats.single + stats.multi).toLocaleString('fr-FR')}
          subtitle="tous types confondus"
          icon={Users}
          delay={0.2}
        />
        <KPICard
          title="Ratio Pro/Particulier"
          value={`1:${(stats.single / stats.multi).toFixed(1)}`}
          subtitle="multi vs single"
          trend="up"
          trendValue="+3.2%"
          icon={TrendingUp}
          delay={0.3}
        />
      </div>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Host Type Distribution */}
        <ChartCard
          title="Répartition hôtes: 1 logement vs Multi-logements"
          subtitle="Analyse par ville"
          delay={0.4}
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
              <HostsAnalysisChart city="Paris" />
            </TabsContent>
            <TabsContent value="Bordeaux">
              <HostsAnalysisChart city="Bordeaux" />
            </TabsContent>
            <TabsContent value="Lyon">
              <HostsAnalysisChart city="Lyon" />
            </TabsContent>
          </Tabs>
        </ChartCard>

        {/* Insight Card */}
        <ChartCard
          title="Insights Hôtes"
          subtitle="Observations clés"
          delay={0.5}
        >
          <div className="space-y-4">
            <div className="glass-card p-4 border border-paris/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-paris/10 text-paris border-paris/20">Paris</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">34.6%</span> des annonces sont gérées par des hôtes multi-logements, 
                suggérant une forte présence professionnelle.
              </p>
            </div>
            
            <div className="glass-card p-4 border border-bordeaux/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-bordeaux/10 text-bordeaux border-bordeaux/20">Bordeaux</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">72%</span> des hôtes n'ont qu'un seul logement,
                indiquant un marché plus orienté particuliers.
              </p>
            </div>
            
            <div className="glass-card p-4 border border-lyon/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-lyon/10 text-lyon border-lyon/20">Lyon</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Profil similaire à Bordeaux avec <span className="text-foreground font-semibold">70%</span> d'hôtes particuliers,
                reflétant une dynamique régionale comparable.
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Price vs Host Listings Scatter */}
      <ChartCard
        title="Prix vs Nombre de logements de l'hôte"
        subtitle="Impact des hôtes professionnels sur les prix"
        delay={0.6}
      >
        <PriceScatterChart selectedCity={selectedCity} />
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Observation:</span> Les hôtes gérant plusieurs logements 
            tendent à pratiquer des prix légèrement plus élevés, possiblement dû à une gestion plus professionnelle 
            et des services additionnels.
          </p>
        </div>
      </ChartCard>
    </motion.div>
  );
};

export default HostsPage;
