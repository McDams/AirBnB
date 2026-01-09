import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Activity, Sparkles } from 'lucide-react';
import { KPICard } from '@/components/cards/KPICard';
import { ChartCard } from '@/components/cards/ChartCard';
import { MLResultsChart } from '@/components/charts/MLResultsChart';
import { PredictedVsActualChart } from '@/components/charts/PredictedVsActualChart';
import { AvailabilityImpactChart } from '@/components/charts/AvailabilityImpactChart';
import { Scatter3D } from '@/components/charts/Scatter3D';
import { mlModelResults } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const MLPage = ({ selectedCity }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Calculate ML stats
  const avgR2 = mlModelResults.reduce((acc, m) => acc + m.r2, 0) / mlModelResults.length;
  const avgRMSE = mlModelResults.reduce((acc, m) => acc + m.rmse, 0) / mlModelResults.length;
  const bestModel = mlModelResults.reduce((best, m) => m.r2 > best.r2 ? m : best, mlModelResults[0]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ML KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Score R² Moyen"
          value={`${(avgR2 * 100).toFixed(1)}%`}
          subtitle="variance expliquée"
          trend="up"
          trendValue="+2.1%"
          icon={Target}
          delay={0}
        />
        <KPICard
          title="RMSE Moyen"
          value={`${avgRMSE.toFixed(1)}€`}
          subtitle="erreur moyenne"
          trend="down"
          trendValue="-3.4€"
          icon={Activity}
          delay={0.1}
        />
        <KPICard
          title="Meilleur Modèle"
          value={bestModel.city}
          subtitle={`R² = ${(bestModel.r2 * 100).toFixed(1)}%`}
          icon={Sparkles}
          delay={0.2}
        />
        <KPICard
          title="Variables Utilisées"
          value="6"
          subtitle="features prédictives"
          icon={Brain}
          delay={0.3}
        />
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Performance des modèles (R²)"
          subtitle="Score de régression par ville"
          delay={0.4}
        >
          <MLResultsChart />
          
          {/* Model details */}
          <div className="mt-4 space-y-3">
            {mlModelResults.map((model) => (
              <div key={model.city} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    model.city === 'Paris' ? 'bg-paris' : 
                    model.city === 'Bordeaux' ? 'bg-bordeaux' : 'bg-lyon'
                  }`} />
                  <span className="text-sm font-medium text-foreground">{model.city}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Progress value={model.r2 * 100} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground w-16 text-right">
                    RMSE: {model.rmse}€
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Model Variables */}
        <ChartCard
          title="Variables du modèle"
          subtitle="Features utilisées pour la prédiction"
          delay={0.5}
        >
          <div className="space-y-3">
            {[
              { name: 'calculated_host_listings_count', importance: 78, desc: 'Nombre de logements de l\'hôte' },
              { name: 'number_of_reviews', importance: 65, desc: 'Nombre total d\'avis' },
              { name: 'number_of_reviews_ltm', importance: 58, desc: 'Avis 12 derniers mois' },
              { name: 'reviews_per_month', importance: 52, desc: 'Avis par mois' },
              { name: 'availability_365', importance: 45, desc: 'Disponibilité annuelle' },
              { name: 'room_type', importance: 85, desc: 'Type de logement' },
            ].map((variable, index) => (
              <motion.div
                key={variable.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="glass-card p-3 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded text-primary font-mono">
                    {variable.name}
                  </code>
                  <Badge variant="outline" className="text-xs">
                    {variable.importance}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{variable.desc}</p>
                <Progress value={variable.importance} className="h-1 mt-2" />
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Predicted vs Actual */}
      <ChartCard
        title="Prix réel vs Prix prédit"
        subtitle="Comparaison des prédictions du modèle"
        delay={0.6}
      >
        <PredictedVsActualChart selectedCity={selectedCity} />
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Interprétation:</span> Les points proches de la ligne diagonale 
            indiquent des prédictions précises. La dispersion montre la variance résiduelle du modèle.
            Un R² de ~30% suggère que d'autres facteurs non mesurés influencent le prix.
          </p>
        </div>
      </ChartCard>

      {/* Impact Analysis */}
      <ChartCard
        title="Impact de la disponibilité sur le prix"
        subtitle="Régression linéaire: Prix ~ availability_365"
        delay={0.7}
      >
        <AvailabilityImpactChart selectedCity={selectedCity} />
      </ChartCard>

      {/* 3D Visualization */}
      <ChartCard
        title="Visualisation 3D: Prix vs Disponibilité vs Activité"
        subtitle="Exploration interactive des données"
        delay={0.8}
      >
        <Scatter3D selectedCity={selectedCity} />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="glass-card p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Axe X</p>
            <p className="text-sm font-medium text-foreground">Disponibilité (jours)</p>
          </div>
          <div className="glass-card p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Axe Y</p>
            <p className="text-sm font-medium text-foreground">Avis par mois</p>
          </div>
          <div className="glass-card p-3 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Axe Z</p>
            <p className="text-sm font-medium text-foreground">Prix (€)</p>
          </div>
        </div>
      </ChartCard>
    </motion.div>
  );
};

export default MLPage;
