import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { outlierCleaningData } from '@/data/mockData';
import { ArrowRight, TrendingDown } from 'lucide-react';

export const OutlierCleaningTable = () => {
  const getCityDot = (city) => {
    const color = city === 'Paris' ? 'bg-paris' : city === 'Bordeaux' ? 'bg-bordeaux' : 'bg-lyon';
    return <div className={`w-3 h-3 rounded-full ${color}`} />;
  };

  const calculateReduction = (before, after) => {
    const reduction = ((before - after) / before * 100).toFixed(1);
    return reduction;
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
            <TableHead className="text-muted-foreground font-semibold text-center">Annonces avant</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-center">Annonces après</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-center">Réduction</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Moyenne avant</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Moyenne après</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(outlierCleaningData).map(([city, data], index) => (
            <TableRow 
              key={city}
              className="border-b border-border/20 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  {getCityDot(city)}
                  <span className="text-foreground">{city}</span>
                </div>
              </TableCell>
              <TableCell className="text-center text-muted-foreground">
                {data.before.count.toLocaleString('fr-FR')}
              </TableCell>
              <TableCell className="text-center text-foreground font-medium">
                {data.after.count.toLocaleString('fr-FR')}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -{calculateReduction(data.before.count, data.after.count)}%
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {data.before.mean.toFixed(2)}€
              </TableCell>
              <TableCell className="text-right text-foreground font-semibold">
                {data.after.mean.toFixed(2)}€
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default OutlierCleaningTable;
