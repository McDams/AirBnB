import { motion } from 'framer-motion';
import { MapPin, Calendar, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Header = ({ selectedCity, setSelectedCity }) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card border-b border-border/30 px-6 py-4 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between">
        {/* Left: Title & Date */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Tableau de bord AirBnB
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{currentDate}</span>
          </div>
        </div>

        {/* Center: City Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtre ville:</span>
          </div>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[180px] glass-card border-border/50">
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Toutes les villes
                </div>
              </SelectItem>
              <SelectItem value="Paris">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-paris" />
                  Paris
                </div>
              </SelectItem>
              <SelectItem value="Bordeaux">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-bordeaux" />
                  Bordeaux
                </div>
              </SelectItem>
              <SelectItem value="Lyon">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-lyon" />
                  Lyon
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Données à jour
          </Badge>
          <Button variant="outline" size="icon" className="glass-card border-border/50">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="glass-card border-border/50">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
