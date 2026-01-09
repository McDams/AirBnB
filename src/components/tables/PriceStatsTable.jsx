import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMockData } from '@/data/useMockData';

export const PriceStatsTable = () => {
  const { data } = useMockData();
  const priceStats = data?.priceStats || [];

  const getCityDot = (city) => {
    const color = city === 'Paris' ? 'bg-paris' : city === 'Bordeaux' ? 'bg-bordeaux' : 'bg-lyon';
    return <div className={`w-3 h-3 rounded-full ${color}`} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/30 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-semibold">Ville</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Prix moyen</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Prix médian</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Prix min</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Prix max</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceStats.map((stat, index) => (
            <TableRow 
              key={stat.city}
              className="border-b border-border/20 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {getCityDot(stat.city)}
                  <span className="text-foreground">{stat.city}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {stat.mean.toFixed(2)}€
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {stat.median.toFixed(2)}€
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {stat.min.toFixed(2)}€
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {stat.max.toLocaleString('fr-FR')}€
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default PriceStatsTable;
